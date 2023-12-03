export const first = <T>(array: T[]): T => array[0];

export const last = <T>(array: T[]): T => array[array.length - 1];

export const dropUndefinedValues = <T>(array: (T | undefined)[]): T[] =>
  array.filter((element): element is T => element !== undefined);
