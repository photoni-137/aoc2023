import { getNonEmptyLines } from "../lib/parsing.ts";

export const specialChar = /[^.\d]/;
export const isDigit = (char: string) => /\d/.test(char);

export interface Coordinate {
  x: number;
  y: number;
}

export interface Number {
  value: number;
  coordinate: Coordinate;
  length: number;
}

export const findNumbers = (rows: string[][]): Number[] =>
  rows.reduce(
    (numbers, row, y) => [...numbers, ...findNumbersInRow(row, y)],
    [] as Number[],
  );

const findNumbersInRow = (row: string[], y: number): Number[] => {
  const numbers: Number[] = [];
  for (let x = 0; x < row.length; x++) {
    const char = row[x];
    if (isDigit(char)) {
      const number = parseNumber(row, { x, y });
      x += number.length - 1;
      numbers.push(number);
    }
  }
  return numbers;
};

export const parseNumber = (
  row: string[],
  coordinate: Coordinate,
): Number => {
  const { x } = coordinate;
  const digits: string[] = [];
  for (let i = x; isDigit(row[i]) && i < row.length; i++) {
    const char = row[i];
    digits.push(char);
  }

  return {
    coordinate,
    value: parseInt(digits.join("")),
    length: digits.length,
  };
};

export const neighbors = (
  rows: string[][],
  { coordinate: { x, y }, length }: Number,
): string[] => {
  const numberLeft = x;
  const numberRight = x + length - 1;

  const left = Math.max(numberLeft - 1, 0);
  const right = Math.min(numberRight + 1, rows[y].length - 1);

  const above = rows[y - 1]?.slice(left, right + 1) ?? [];
  const below = rows[y + 1]?.slice(left, right + 1) ?? [];

  const neighbors: string[] = [...above, ...below];
  if (numberLeft > 0) {
    neighbors.push(rows[y][left]);
  }
  if (numberRight < rows[y].length) {
    neighbors.push(rows[y][right]);
  }

  return neighbors;
};

export const isPartNumber = (rows: string[][], number: Number): boolean =>
  neighbors(rows, number).some((char) => specialChar.test(char));

export const findPartNumbers = async (filename: string, debug?: boolean) => {
  const lines = await getNonEmptyLines(filename);
  const charMatrix = lines.map((line) => line.split(""));
  const numbers = findNumbers(charMatrix);

  if (debug) {
    numbers.forEach((number) => {
      console.log(number.value);
      console.log(neighbors(charMatrix, number));
    });
  }

  return numbers.filter((number) => isPartNumber(charMatrix, number));
};
