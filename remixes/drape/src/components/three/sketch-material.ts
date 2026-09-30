import * as THREE from "three"

/**
 * A photo drawn as a pencil sketch everywhere except inside a screen-space
 * box, where it is the photo itself.
 *
 * - Sketch: a colour dodge of the luminance against its own blur (the soft
 *   shading of a pencil), plus Sobel edges (the contour line). Written as ink
 *   with alpha, so the paper behind the canvas — the page — shows through.
 * - Real: the photograph, its studio lifted towards white and then
 *   multiplied by the paper colour, so the backdrop melts into the page.
 *
 * `uBox` is in canvas pixels (x0, y0, x1, y1, from the bottom left, as
 * `gl_FragCoord` counts), which is what lets the DOM selection box and the
 * reveal line up exactly while the planes tilt in 3D.
 */
export function createSketchMaterial(texture: THREE.Texture) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uMap: { value: texture },
      uTexel: { value: new THREE.Vector2(1 / 800, 1 / 1200) },
      uBox: { value: new THREE.Vector4(0, 0, 0, 0) },
      uInk: { value: new THREE.Color("#1b1612") },
      uPaper: { value: new THREE.Color("#eee8df") },
      uWeight: { value: 1 },
      uOpacity: { value: 1 },
      uReady: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uMap;
      uniform vec2 uTexel;
      uniform vec4 uBox;
      uniform vec3 uInk;
      uniform vec3 uPaper;
      uniform float uWeight;
      uniform float uOpacity;
      uniform float uReady;
      varying vec2 vUv;

      float lum(vec2 uv) {
        return dot(texture2D(uMap, uv).rgb, vec3(0.299, 0.587, 0.114));
      }

      void main() {
        vec3 photo = texture2D(uMap, vUv).rgb;
        float l = dot(photo, vec3(0.299, 0.587, 0.114));

        // Blur for the dodge: two rings of eight taps.
        float blur = l;
        float taps = 1.0;
        for (int ring = 1; ring <= 2; ring++) {
          float r = float(ring) * 2.5;
          for (int i = 0; i < 8; i++) {
            float a = float(i) * 0.7853982 + float(ring) * 0.39;
            blur += lum(vUv + vec2(cos(a), sin(a)) * uTexel * r);
            taps += 1.0;
          }
        }
        blur /= taps;
        float dodge = clamp(l / max(blur, 0.02), 0.0, 1.0);

        // Sobel for the contour.
        vec2 t = uTexel * 1.25;
        float tl = lum(vUv + vec2(-t.x,  t.y));
        float tc = lum(vUv + vec2( 0.0,  t.y));
        float tr = lum(vUv + vec2( t.x,  t.y));
        float ml = lum(vUv + vec2(-t.x,  0.0));
        float mr = lum(vUv + vec2( t.x,  0.0));
        float bl = lum(vUv + vec2(-t.x, -t.y));
        float bc = lum(vUv + vec2( 0.0, -t.y));
        float br = lum(vUv + vec2( t.x, -t.y));
        float gx = tr + 2.0 * mr + br - tl - 2.0 * ml - bl;
        float gy = tl + 2.0 * tc + tr - bl - 2.0 * bc - br;
        float edge = smoothstep(0.1, 0.42, length(vec2(gx, gy)));

        float line = max(1.0 - pow(dodge, 6.0 * uWeight), edge * 0.9);
        line = clamp(line * 1.08, 0.0, 1.0);

        // Soften the plane's outer edge so no hard rectangle shows.
        vec2 fade = smoothstep(vec2(0.0), vec2(0.04), vUv) * smoothstep(vec2(0.0), vec2(0.04), 1.0 - vUv);
        float frame = fade.x * fade.y;

        vec2 p = gl_FragCoord.xy;
        float inside = step(uBox.x, p.x) * step(p.x, uBox.z) * step(uBox.y, p.y) * step(p.y, uBox.w);

        vec3 lifted = clamp((photo - 0.02) / 0.88, 0.0, 1.0);
        vec4 real = vec4(lifted * uPaper, 1.0);
        vec4 drawn = vec4(uInk, line * frame * 0.92);

        vec4 color = mix(drawn, real, inside);
        color.a *= uOpacity * uReady;
        gl_FragColor = color;
      }
    `,
  })
}
