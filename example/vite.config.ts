import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import MarkdownItShiki from "@shikijs/markdown-it";
import { rendererRich, transformerTwoslash } from "@shikijs/twoslash";

import Tempalte from "@plug/vite-vue-markdown";
import Progress from "@plug/vite-progress-bar";

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Tempalte({
      wrapperClasses: () => {
        return "prose";
      },
      async markdownItSetup(md) {
        md.use(
          await MarkdownItShiki({
            themes: {
              dark: "vitesse-dark",
              light: "vitesse-light",
            },
            defaultColor: false,
            cssVariablePrefix: "--s-",
            transformers: [
              transformerTwoslash({
                explicitTrigger: true,
                renderer: rendererRich(),
              }),
            ],
          })
        );
      },
    }),
    Progress({
      total: 200,
      width: 60,
      complete: "=",
      incomplete: "",
    }),
  ],
});
