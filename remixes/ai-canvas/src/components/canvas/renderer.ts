/**
 * The hero's infinite canvas, drawn with WebGL2.
 *
 * Why not DOM: forty pieces moving every frame, forever, with a motion blur
 * that follows their velocity. As DOM that is forty `filter: blur()` layers
 * re-rasterised sixty times a second; here each piece is one textured quad,
 * and the blur is twelve taps along the velocity inside its fragment shader.
 *
 * What the shader does per piece:
 *  - clips it to a rounded rectangle (an SDF, so the smear has soft ends);
 *  - smears it along the velocity vector — the motion blur;
 *  - blurs it in on arrival with the mip bias, which is a real blur for free;
 *  - dims and softens it as it passes behind the headline (the "focus"), so
 *    the words stay readable however the canvas has drifted;
 *  - washes it to paper as the hero hands over to the white page.
 *
 * The dot grid is one full-screen triangle, its dots stretched along the same
 * velocity so the background and the pieces blur as one surface.
 */

const QUAD_VS = `#version 300 es
in vec2 a_pos;
uniform vec2 u_res;
uniform vec4 u_rect;
uniform vec2 u_pad;
out vec2 v_local;
void main() {
  vec2 p = u_rect.xy - u_pad + a_pos * (u_rect.zw + 2.0 * u_pad);
  v_local = p - u_rect.xy;
  vec2 clip = (p / u_res) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}`

const QUAD_FS = `#version 300 es
precision highp float;
in vec2 v_local;
uniform sampler2D u_tex;
uniform vec4 u_rect;
uniform vec2 u_res;
uniform vec2 u_blur;
uniform int u_taps;
uniform float u_alpha;
uniform float u_bias;
uniform float u_radius;
uniform float u_wash;
uniform float u_focus;
uniform vec3 u_washColor;
out vec4 o;

float coverage(vec2 p, vec2 size, float r) {
  vec2 q = abs(p - size * 0.5) - size * 0.5 + r;
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  return clamp(0.5 - d, 0.0, 1.0);
}

void main() {
  vec2 fc = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  // The clearing behind the headline: just the words' own footprint, as in
  // the reference, where tiles sit bright right up to the type.
  vec2 d = (fc - u_res * 0.5) / (u_res * vec2(0.23, 0.25));
  float clear = smoothstep(0.62, 1.0, length(d));
  float bias = u_bias + (1.0 - clear) * 2.5 * u_focus;

  vec4 acc = vec4(0.0);
  for (int i = 0; i < 16; i++) {
    if (i >= u_taps) break;
    float t = u_taps > 1 ? float(i) / float(u_taps - 1) - 0.5 : 0.0;
    vec2 p = v_local + u_blur * t;
    float m = coverage(p, u_rect.zw, u_radius);
    vec4 c = texture(u_tex, clamp(p / u_rect.zw, 0.0, 1.0), bias);
    acc += c * m;
  }
  acc /= float(u_taps);
  acc *= u_alpha * mix(1.0, mix(0.14, 1.0, clear), u_focus);
  acc.rgb = mix(acc.rgb, u_washColor * acc.a, u_wash);
  o = acc;
}`

const GRID_VS = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos * 4.0 - 1.0, 0.0, 1.0); }`

const GRID_FS = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform vec2 u_offset;
uniform vec2 u_blur;
uniform float u_spacing;
uniform float u_dot;
uniform float u_alpha;
uniform vec3 u_color;
out vec4 o;
void main() {
  vec2 fc = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 p = mod(fc + u_offset, u_spacing) - u_spacing * 0.5;
  // Distance to the segment the dot sweeps in one frame: a dot at rest is a
  // dot, a dot in motion is a streak with the same total light.
  vec2 a = -u_blur * 0.5;
  vec2 b = u_blur * 0.5;
  vec2 ab = b - a;
  float h = clamp(dot(p - a, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
  float dist = length(p - a - ab * h);
  float energy = u_dot / (u_dot + length(u_blur) * 0.5);
  float c = clamp(u_dot - dist + 0.5, 0.0, 1.0) * u_alpha * energy;
  o = vec4(u_color * c, c);
}`

export interface Piece {
  /** Device-pixel rectangle, top-left origin. */
  x: number
  y: number
  w: number
  h: number
  radius: number
  alpha: number
  bias: number
  texture: WebGLTexture
}

export interface FrameState {
  background: [number, number, number]
  wash: number
  washColor: [number, number, number]
  focus: number
  /** Smear vector in device pixels. */
  blur: [number, number]
  grid: { alpha: number; spacing: number; dot: number; offset: [number, number]; color: [number, number, number] }
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "shader")
  return shader
}

function program(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs))
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs))
  gl.bindAttribLocation(p, 0, "a_pos")
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? "link")
  const uniforms = new Map<string, WebGLUniformLocation | null>()
  return {
    p,
    u: (name: string) => {
      if (!uniforms.has(name)) uniforms.set(name, gl.getUniformLocation(p, name))
      return uniforms.get(name)!
    },
  }
}

export class CanvasRenderer {
  readonly gl: WebGL2RenderingContext
  private quad
  private grid
  private vao: WebGLVertexArrayObject
  private aniso: number
  private anisoExt: EXT_texture_filter_anisotropic | null
  private textures: WebGLTexture[] = []

  constructor(readonly canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, antialias: false, alpha: false })
    if (!gl) throw new Error("webgl2")
    this.gl = gl
    this.quad = program(gl, QUAD_VS, QUAD_FS)
    this.grid = program(gl, GRID_VS, GRID_FS)
    this.vao = gl.createVertexArray()!
    gl.bindVertexArray(this.vao)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    this.anisoExt = gl.getExtension("EXT_texture_filter_anisotropic")
    this.aniso = this.anisoExt ? Math.min(8, gl.getParameter(this.anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT)) : 0
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  }

  upload(source: TexImageSource): WebGLTexture {
    const gl = this.gl
    const texture = gl.createTexture()!
    this.textures.push(texture)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
    gl.generateMipmap(gl.TEXTURE_2D)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    if (this.anisoExt && this.aniso) gl.texParameterf(gl.TEXTURE_2D, this.anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, this.aniso)
    return texture
  }

  resize(width: number, height: number) {
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width
      this.canvas.height = height
    }
  }

  draw(pieces: Piece[], state: FrameState) {
    const gl = this.gl
    const { width, height } = this.canvas
    gl.viewport(0, 0, width, height)
    const [r, g, b] = state.background
    gl.clearColor(r, g, b, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.bindVertexArray(this.vao)

    if (state.grid.alpha > 0.001) {
      const { p, u } = this.grid
      gl.useProgram(p)
      gl.uniform2f(u("u_res"), width, height)
      gl.uniform2f(u("u_offset"), state.grid.offset[0], state.grid.offset[1])
      gl.uniform2f(u("u_blur"), state.blur[0], state.blur[1])
      gl.uniform1f(u("u_spacing"), state.grid.spacing)
      gl.uniform1f(u("u_dot"), state.grid.dot)
      gl.uniform1f(u("u_alpha"), state.grid.alpha)
      gl.uniform3f(u("u_color"), ...state.grid.color)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const { p, u } = this.quad
    gl.useProgram(p)
    gl.uniform2f(u("u_res"), width, height)
    gl.uniform1f(u("u_wash"), state.wash)
    gl.uniform3f(u("u_washColor"), ...state.washColor)
    gl.uniform1f(u("u_focus"), state.focus)
    const [bx, by] = state.blur
    const length = Math.hypot(bx, by)
    gl.uniform2f(u("u_blur"), bx, by)
    gl.uniform2f(u("u_pad"), Math.abs(bx) / 2 + 1, Math.abs(by) / 2 + 1)
    gl.uniform1i(u("u_taps"), length < 1 ? 1 : Math.min(16, Math.max(4, Math.ceil(length / 3))))
    gl.activeTexture(gl.TEXTURE0)
    gl.uniform1i(u("u_tex"), 0)
    for (const piece of pieces) {
      if (piece.alpha <= 0.001) continue
      gl.bindTexture(gl.TEXTURE_2D, piece.texture)
      gl.uniform4f(u("u_rect"), piece.x, piece.y, piece.w, piece.h)
      gl.uniform1f(u("u_radius"), piece.radius)
      gl.uniform1f(u("u_alpha"), piece.alpha)
      gl.uniform1f(u("u_bias"), piece.bias)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
  }

  /** Frees what this renderer made. The context itself belongs to the
   *  canvas element and outlives us — StrictMode mounts twice on the same
   *  canvas, and a lost context cannot be had back. */
  destroy() {
    const gl = this.gl
    for (const texture of this.textures) gl.deleteTexture(texture)
    this.textures.length = 0
    gl.deleteProgram(this.quad.p)
    gl.deleteProgram(this.grid.p)
    gl.deleteVertexArray(this.vao)
  }
}

/** `#0d0d0d` → `[0.05, 0.05, 0.05]`. */
export function rgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}
