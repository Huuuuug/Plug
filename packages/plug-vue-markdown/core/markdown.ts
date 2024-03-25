import MarkdownIt from "markdown-it";
import { toArray } from "./utils";
import type { ResolvedOptions } from "../types";
import type { TransformResult } from "vite";

export async function createMarkdown(options: ResolvedOptions) {
  const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  await options.markdownItSetup(markdown);

  return (id: string, raw: string): TransformResult => {
    const { wrapperClasses } = options;

    let html = markdown.render(raw);

    const wrapperClassesResolved = toArray(
      typeof wrapperClasses === "function"
        ? wrapperClasses(id, raw)
        : wrapperClasses
    )
      .filter(Boolean)
      .join(" ");

    if (wrapperClassesResolved)
      html = `<div class="${wrapperClassesResolved}">${html}</div>`;
    else html = `<div>${html}</html>`;

    const code = `<template>${html}</template>`;

    return {
      code,
      map: { mappings: "" } as any,
    };
  };
}
