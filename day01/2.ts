import { sumOver } from "../lib/math.ts";
import { getNonEmptyLines } from "../lib/parsing.ts";
import { dropUndefinedValues, first, last } from "../lib/arrays.ts";

const digitWords = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "zero": 0,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
} satisfies Record<string, number>;

type DigitWord = keyof typeof digitWords;

const digitPatterns = Object.keys(digitWords) as DigitWord[];

const toNumber = (s: DigitWord) => digitWords[s];

const substrings = (s: string) => {
  const substrings: string[] = [];
  for (let i = 0; i < s.length; i++) {
    substrings[i] = s.slice(i);
  }
  return substrings;
};

const startingDigit = (s: string): number | undefined => {
  const pattern = digitPatterns.find((pattern) => s.startsWith(pattern));
  return pattern ? toNumber(pattern) : undefined;
};

const getDigits = (s: string) => {
  const digits = substrings(s).map((substring) => startingDigit(substring));
  return dropUndefinedValues(digits);
};

const getCalibrationValue = (line: string) => {
  const digits = getDigits(line);
  return 10 * first(digits) + last(digits);
};

const sumCalibrationValues = async () => {
  const lines = await getNonEmptyLines("input.txt");
  const calibrationValues = lines.map((line) => getCalibrationValue(line));
  return sumOver(calibrationValues);
};

console.log(
  "2: Sum of actual calibration values:",
  await sumCalibrationValues(),
);
