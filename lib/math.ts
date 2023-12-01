export const sumOver = (numbers: number[]) =>
  numbers.reduce((sum, n) => sum + n, 0);

export const isProperNumber = (n: number) => !Number.isNaN(n);
