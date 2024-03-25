import type { Nullable, Arrayable } from "./types";
/**
 * Convert `Arrayable<T>` to `Array<T>`
 *
 * @category Array
 */
export function toArray<T>(array?: Nullable<Arrayable<T>>): Array<T> {
  array = array ?? [];
  return Array.isArray(array) ? array : [array];
}
