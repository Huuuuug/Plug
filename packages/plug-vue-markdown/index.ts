import { createMarkdown } from "./core/markdown";
import type { Plugin } from "vite";
import type { Options } from "./types";
import { resolveOptions } from "./core/options";

export default function MarkdownPlugin(userOptions: Options = {}): Plugin {
  const options = resolveOptions(userOptions);
  const markdownToVue = createMarkdown(options);
  return {
    name: "vite:markdown",
    enforce: "pre",
    async transform(code, id) {
      const vueRE = /\.vue$/;
      const markdownRE = /\.md$/;
      if (!markdownRE.test(id)) return code;

      try {
        return (await markdownToVue)(id, code);
      } catch (error) {
        console.log(error);
      }
    },
  };
}
