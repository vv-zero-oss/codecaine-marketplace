/**
 * The values a prop is allowed to take, read from the project's own types.
 *
 * `variant="ghost"` is a string at runtime and a closed set in the source:
 *
 * ```ts
 * const buttonVariants = cva(base, { variants: { variant: { default: …, ghost: … } } })
 * type Props = React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>
 * ```
 *
 * Nothing in the running page knows the other four names. The type does, and
 * TypeScript will resolve it — `VariantProps` is a mapped type over the config
 * object, so the checker expands it to `"default" | "primary" | "outline" |
 * "ghost" | "link"` without the project writing that union out anywhere. So
 * this asks the checker at dev-server start and hands the answer to the page,
 * where the SDK reports it beside the prop and the editor's panel draws a
 * dropdown instead of a text field.
 *
 * ```ts
 * // vite.config.ts
 * import { canvasPropOptions } from "@canvas/react/vite";
 * export default defineConfig({ plugins: [react(), canvasPropOptions()] });
 * ```
 *
 * Optional, like everything else here. Without it the fields are text fields,
 * which is what a project with no types — or no plugin — gets.
 *
 * ## What it does not do
 *
 * It does not typecheck the project, and it never fails a build: a program
 * that cannot be built, a TypeScript that is not installed, a component whose
 * props do not resolve, all mean "no options for that" rather than an error.
 * Somebody's dev server is not the place to find out that their types are
 * wrong.
 *
 * It reads only *string literal unions*. A prop typed `string` has no set to
 * offer, and a prop typed `number` or `Date` is not a dropdown. Booleans
 * already have their own control.
 */

import path from "node:path";

/** component name → prop name → the values that prop may take. */
export type PropOptions = Record<string, Record<string, string[]>>;

/** What one prop may offer. Past this it is a set nobody scrolls through, and
 *  the panel would be better off with the text field. */
const MAX_OPTIONS = 24;

/** Longest value kept: past this it is not a variant name. */
const MAX_OPTION_LENGTH = 64;

/** How many components one answer describes. */
const MAX_COMPONENTS = 400;

interface Plugin {
  name: string;
  apply?: "serve" | "build";
  configResolved?: (config: { root: string }) => void;
  transformIndexHtml?: unknown;
  handleHotUpdate?: (context: { file: string }) => void;
}

/**
 * Read the project's component prop types, and put them in the page.
 *
 * Dev only: the whole SDK is, and a production page with this in it would be
 * shipping a map of every variant name in the design system to anybody who
 * asked.
 */
export function canvasPropOptions(): Plugin {
  let root = process.cwd();
  let cache: PropOptions | null = null;

  async function build(): Promise<PropOptions> {
    if (cache) return cache;
    try {
      cache = await extractPropOptions(root);
    } catch {
      // A project without TypeScript, a program that will not build, a version
      // of the compiler whose API moved: none of them are worth a broken dev
      // server, and all of them mean the panel keeps its text fields.
      cache = {};
    }
    return cache;
  }

  return {
    name: "canvas-prop-options",
    apply: "serve",

    configResolved(config) {
      root = config.root;
    },

    // Invalidated wholesale rather than per file: the types of one component
    // depend on the files it imports, and working out which is a dependency
    // graph this does not need to have. The rebuild happens on the next page
    // load, which is also when the answer is next read.
    handleHotUpdate(context) {
      if (/\.(ts|tsx)$/.test(context.file)) cache = null;
    },

    transformIndexHtml: {
      order: "pre" as const,
      async handler(html: string) {
        const options = await build();
        if (Object.keys(options).length === 0) return html;
        return {
          html,
          tags: [
            {
              tag: "script",
              // Before the app, so the SDK can read it the moment it starts —
              // and injected rather than imported, so the project's own code
              // does not have to know this exists.
              injectTo: "head-prepend" as const,
              children: `window.__canvasPropOptions=${JSON.stringify(options)}`,
            },
          ],
        };
      },
    },
  };
}

/**
 * Every component in `root`, and the props of each that are a closed set.
 *
 * Exported for the tests, which run it against a fixture directory rather than
 * mocking a type checker — the whole value of this is what the checker knows,
 * and a mock of it would only test the shape of my own assumptions.
 */
export async function extractPropOptions(root: string): Promise<PropOptions> {
  const ts = (await import("typescript")).default ?? (await import("typescript"));
  const { globSync } = await import("node:fs");

  const files = globSync("src/**/*.{ts,tsx}", { cwd: root }).map((file: string) =>
    path.join(root, file)
  );
  if (files.length === 0) return {};

  const program = ts.createProgram(files, {
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    baseUrl: root,
    // What a Vite React project's own tsconfig says, and the one alias worth
    // assuming: a component that cannot be resolved contributes nothing rather
    // than failing the walk.
    paths: { "@/*": ["src/*"] },
  });
  const checker = program.getTypeChecker();

  /** The string-literal members of a union, or null for anything else — a
   *  `string`, a number, an object. Only a closed set is a dropdown. */
  function literalsOf(type: import("typescript").Type): string[] | null {
    const parts = type.isUnion() ? type.types : [type];
    const values: string[] = [];
    for (const part of parts) {
      if (part.flags & ts.TypeFlags.Undefined) continue;
      if (part.flags & ts.TypeFlags.Null) continue;
      if (!part.isStringLiteral()) return null;
      if (part.value.length > MAX_OPTION_LENGTH) return null;
      values.push(part.value);
      if (values.length > MAX_OPTIONS) return null;
    }
    return values.length ? values : null;
  }

  const found: PropOptions = {};

  for (const file of program.getSourceFiles()) {
    if (file.isDeclarationFile) continue;
    if (!file.fileName.startsWith(root)) continue;
    if (Object.keys(found).length >= MAX_COMPONENTS) break;

    ts.forEachChild(file, (node) => {
      // `function Button(...)` and `const Button = (...) => …`, which is how
      // a component is written. A name that does not start with a capital is
      // not one, by the convention React itself enforces.
      let name: string | null = null;
      let symbol: import("typescript").Symbol | undefined;

      if (ts.isFunctionDeclaration(node) && node.name) {
        name = node.name.text;
        symbol = checker.getSymbolAtLocation(node.name);
      } else if (ts.isVariableStatement(node)) {
        const declaration = node.declarationList.declarations[0];
        if (declaration && ts.isIdentifier(declaration.name)) {
          name = declaration.name.text;
          symbol = checker.getSymbolAtLocation(declaration.name);
        }
      }
      if (!name || !symbol || !/^[A-Z]/.test(name)) return;

      const [signature] = checker.getTypeOfSymbolAtLocation(symbol, node).getCallSignatures();
      const parameter = signature?.getParameters()[0];
      if (!parameter) return;

      const props = checker.getTypeOfSymbolAtLocation(parameter, node);
      const options: Record<string, string[]> = {};

      for (const prop of props.getProperties()) {
        // The unions React brings with `ComponentProps<"a">` — `enterKeyHint`,
        // `popover`, `translate` — are the DOM's vocabulary, not this
        // component's, and a panel listing them is a panel nobody can read.
        const declaredIn = prop.getDeclarations()?.[0]?.getSourceFile().fileName ?? "";
        if (declaredIn.includes("@types/react")) continue;

        const values = literalsOf(checker.getTypeOfSymbolAtLocation(prop, node));
        if (values) options[prop.getName()] = values;
      }

      if (Object.keys(options).length) found[name] = options;
    });
  }

  return found;
}
