import type MarkdownIt from "markdown-it";

export interface Options {
  /**
   * Class names for wrapper div
   *
   * @default 'markdown-body'
   */
  wrapperClasses?:
    | string
    | ((id: string, code: string) => string | string[] | undefined | null);

  /**
   * A function providing the Markdown It instance gets the ability to apply custom
   * settings/plugins
   */
  markdownItSetup?: (MarkdownIt: MarkdownIt) => void | Promise<void>;
}

export interface ResolvedOptions extends Required<Options> {}
