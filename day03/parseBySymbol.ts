import { getCharArray } from "../lib/parsing.ts";
import { sumOver } from "../lib/math.ts";

const isDigit = (char: string) => /\d/.test(char);
const isSymbol = (char: string) => /[^.\d]/.test(char);

interface Coordinate {
  x: number;
  y: number;
}

const sameCoordinate = (c1: Coordinate, c2: Coordinate) =>
  c1.x === c2.x && c1.y === c2.y;

interface Number {
  value: number;
  start: Coordinate;
}

const sameNumber = (n1: Number, n2: Number) => {
  const sameStart = sameCoordinate(n1.start, n2.start);
  if (sameStart && n1.value !== n2.value) {
    throw new Error(
      `different values at same coordinate: ${n1.value} and ${n2.value} at ${
        JSON.stringify(n1.start)
      }`,
    );
  }
  return sameStart;
};

interface Symbol {
  value: string;
  coordinate: Coordinate;
  numberNeighbors: Number[];
}

const newSymbol = (value: string, coordinate: Coordinate): Symbol => ({
  value,
  coordinate,
  numberNeighbors: [],
});

const findSymbols = (rows: string[][]): Symbol[] =>
  rows.reduce(
    (symbols, row, y) =>
      row.reduce(
        (symbols, char, x) =>
          isSymbol(char) ? [...symbols, newSymbol(char, { x, y })] : symbols,
        symbols,
      ),
    [] as Symbol[],
  );

const neighborCoordinates = (
  rows: string[][],
  { x, y }: Coordinate,
): Coordinate[] => {
  const range = 1;

  const left = Math.max(x - range, 0);
  const right = Math.min(x + range, rows[y].length - 1);
  const up = Math.max(y - range, 0);
  const down = Math.min(y + range, rows.length - 1);

  const coordinates = [];
  for (let y = up; y <= down; y++) {
    for (let x = left; x <= right; x++) {
      coordinates.push({ x, y });
    }
  }
  return coordinates;
};

const parseNumberAroundDigit = (
  rows: string[][],
  { x, y }: Coordinate,
): Number => {
  const row = rows[y];
  let start = x;
  let end = start;

  while (isDigit(row[start - 1])) {
    start--;
  }
  while (isDigit(row[end + 1])) {
    end++;
  }

  return {
    value: parseInt(row.slice(start, end + 1).join("")),
    start: { x: start, y },
  };
};

const isKnownNumber = (knownNumbers: Number[], newNumber: Number) =>
  knownNumbers.some((knownNumber) => sameNumber(knownNumber, newNumber));

const uniqueNumberNeighbors = (rows: string[][], coordinate: Coordinate) =>
  neighborCoordinates(rows, coordinate).filter(({ x, y }) =>
    isDigit(rows[y][x])
  ).map((digit) => parseNumberAroundDigit(rows, digit)).reduce(
    (unique, newNumber) =>
      isKnownNumber(unique, newNumber) ? unique : [...unique, newNumber],
    [] as Number[],
  );

const fillNumberNeighbors = (rows: string[][], symbol: Symbol): Symbol => {
  symbol.numberNeighbors = uniqueNumberNeighbors(rows, symbol.coordinate);
  return symbol;
};

const parseSymbols = (rows: string[][]) => {
  const symbols = findSymbols(rows);
  return symbols.map((symbol) => fillNumberNeighbors(rows, symbol));
};

const findPartNumbers = (symbols: Symbol[]) =>
  symbols.reduce(
    (unique, symbol) =>
      symbol.numberNeighbors.reduce(
        (unique, number) =>
          isKnownNumber(unique, number) ? unique : [...unique, number],
        unique,
      ),
    [] as Number[],
  );

export const partNumberSum = async (filename: string) => {
  const chars = await getCharArray(filename);
  const symbols = parseSymbols(chars);
  const partNumbers = findPartNumbers(symbols);
  return sumOver(partNumbers.map((partNumber) => partNumber.value));
};

const isGear = (symbol: Symbol) =>
  symbol.value === "*" && symbol.numberNeighbors.length === 2;

const gearRatio = (gear: Symbol) => {
  if (!isGear(gear)) {
    throw new Error(`not a gear: ${JSON.stringify(gear)}`);
  }
  const [n1, n2] = gear.numberNeighbors;
  return n1.value * n2.value;
};

export const gearRatioSum = async (filename: string) => {
  const chars = await getCharArray(filename);
  const symbols = parseSymbols(chars);
  const gears = symbols.filter(isGear);
  return sumOver(gears.map(gearRatio));
};
