import colors from "picocolors";
import progress from "progress";
import { isFileExists, getCacheData, setCacheData } from "./core/cache";
import { flattenReadFile } from "./core/utils";
import type { Options } from "./types";
import type { Plugin } from "vite";
import type { ProgressBarOptions } from "progress";

export default function viteProcessBar(userOptions: Options = {}): Plugin {
  const { cacheTransformCount, cacheChunkCount } = getCacheData();

  let outDir: string;
  const stream = userOptions.stream || process.stderr;
  let bar: progress;
  let transformCount = 0;
  let chunkCount = 0;
  let transformed = 0;
  let fileCount = 0;
  let lastPercent = 0;
  let percent = 0;
  let errInfo: Error | undefined;

  function runCachedData() {
    if (transformCount === 1) {
      stream.write("\n");

      bar.tick({
        transformTotal: cacheTransformCount,
        transformCur: transformCount,
        chunkTotal: cacheChunkCount,
        chunkCur: 0,
      });
    }
    transformed++;
    percent = lastPercent = +(
      transformed /
      (cacheTransformCount + cacheChunkCount)
    ).toFixed(4);
  }

  return {
    name: "vite:progress-bar",
    enforce: "pre",
    apply: "build",
    config(config, { command }) {
      if (command === "build") {
        outDir = config.build?.outDir || "dist";

        const options: Options = {
          width: 40,
          complete: "\u2588",
          incomplete: "\u2591",
          ...userOptions,
        };
        options.total = options.total || 100;

        const transforming = isFileExists
          ? `${colors.magenta("Transforms:")}:transformCur/:transformTotal | `
          : "";
        const chunks = isFileExists
          ? `${colors.magenta("Chunks:")} :chunkCur/:chunkTotal | `
          : "";
        const barText = `${colors.cyan(`[:bar]`)}`;

        const barFormat =
          options.format ||
          `${colors.green(
            "Building"
          )} ${barText} :percent | ${transforming}${chunks}Time: :elapseds`;

        delete options.format;
        bar = new progress(barFormat, options as ProgressBarOptions);

        // not cache: Loop files in src directory
        if (!isFileExists) {
          const entries = flattenReadFile(options.srcDir || "src");
          const reg = /\.(vue|ts|js|jsx|tsx|css|scss||sass|styl|less|md)$/gi;
          entries.forEach((item) => reg.test(item.name) && fileCount++);
        }
      }
    },
    transform(code, id) {
      transformCount++;

      // not cache
      if (!isFileExists) {
        const reg = /node_modules/gi;

        if (!reg.test(id) && percent < 0.25) {
          transformed++;
          percent = +(transformed / (fileCount * 2)).toFixed(2);
          percent < 0.8 && (lastPercent = percent);
        }

        if (percent >= 0.25 && lastPercent <= 0.65) {
          lastPercent = +(lastPercent + 0.001).toFixed(4);
        }
      }

      // go cache
      if (isFileExists) runCachedData();

      bar.update(lastPercent, {
        transformTotal: cacheTransformCount,
        transformCur: transformCount,
        chunkTotal: cacheChunkCount,
        chunkCur: 0,
      });

      return {
        code,
        map: null,
      };
    },
    renderChunk() {
      chunkCount++;
      if (lastPercent <= 0.95)
        isFileExists
          ? runCachedData()
          : (lastPercent = +(lastPercent + 0.005).toFixed(4));

      bar.update(lastPercent, {
        transformTotal: cacheTransformCount,
        transformCur: transformCount,
        chunkTotal: cacheChunkCount,
        chunkCur: 0,
      });

      return null;
    },
    buildEnd(err) {
      errInfo = err;
    },

    // build completed
    closeBundle() {
      if (!errInfo) {
        // close progress
        bar.update(1);
        bar.terminate();

        // set cache data
        setCacheData({
          cacheTransformCount: transformCount,
          cacheChunkCount: chunkCount,
        });
        // out successful message
        stream.write(
          `${colors.cyan(
            colors.bold(`Build successful. Please see ${outDir} directory`)
          )}`
        );
        stream.write("\n");
        stream.write("\n");
      } else {
        // out failed message
        stream.write("\n");
        stream.write(
          `${colors.red(
            colors.bold(`Build failed. Please check the error message`)
          )}`
        );
        stream.write("\n");
        stream.write("\n");
      }
    },
  };
}
