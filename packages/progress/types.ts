export interface Options {
  /**
   * Class names for wrapper div
   *
   * @default 100
   */
  total?: number;
  /**
   * The format of the progress bar
   */
  format?: string;
  /**
   * The src directory of the build files
   */
  srcDir?: string;
  /**
   * current completed index
   */
  curr?: number | undefined;
  /**
   * head character defaulting to complete character
   */
  head?: string | undefined;
  /**
   * The displayed width of the progress bar defaulting to total.
   * @default 40
   */
  width?: number | undefined;
  /**
   * minimum time between updates in milliseconds defaulting to 16
   */
  renderThrottle?: number | undefined;
  /**
   * Completion character defaulting to "\u2591".
   */
  complete?: string | undefined;
  /**
   * Incomplete character defaulting to "\u2588".
   */
  incomplete?: string | undefined;
  /**
   * Option to clear the bar on completion defaulting to false.
   */
  clear?: boolean | undefined;
  /**
   * Optional function to call when the progress bar completes.
   */
  callback?: Function | undefined;
  /**
   * The output stream defaulting to stderr.
   */
  stream?: NodeJS.WriteStream | undefined;
}
