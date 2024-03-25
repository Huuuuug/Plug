import type { Options, ResolvedOptions } from "../types";

export function resolveOptions(userOptions: Options): ResolvedOptions {
  const defaultOptions: ResolvedOptions = {
    markdownItSetup: () => {},
    wrapperClasses: "markdown-body",
  };

  const options = {
    ...defaultOptions,
    ...userOptions,
  };

  return options as ResolvedOptions;
}
