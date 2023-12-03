import { sumOver } from "../lib/math.ts";
import { getNonEmptyLines } from "../lib/parsing.ts";
import { first, last } from "../lib/arrays.ts";
import { regexUnion } from "../lib/regex.ts";

const digitWords = {
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

const isDigitWord = (s: string): s is DigitWord =>
  Object.keys(digitWords).includes(s);

type DigitWord = keyof typeof digitWords;

const digitRegex = regexUnion(...(Object.keys(digitWords)), "\\d");

const toNumber = (s: string) => isDigitWord(s) ? digitWords[s] : Number(s);

const getDigits = (s: string) => {
  const matches = s.match(digitRegex);
  if (!matches) {
    throw new Error(`found no digits in "${s}"`);
  }
  if (s.match(/twone/)) {
    console.log(matches);
  }
  return matches.map((match) => toNumber(match));
};

const getCalibrationValue = (line: string) => {
  const digits = getDigits(line);
  const value = 10 * first(digits) + last(digits);
  if (value < 11 || value > 99 || line.match(/twone/)) {
    console.log(line, value);
  }
  return value;
};

const sumCalibrationValues = async () => {
  const lines = await getNonEmptyLines("input.txt");
  const calibrationValues = lines.map((line) => getCalibrationValue(line));
  // for (let i = 0; i < 1000; i++) {
  //   console.log(lines[i], calibrationValues[i]);
  // }
  return sumOver(calibrationValues);
};

// let sum = 0;
// [
//   "two1nine",
//   "eightwothree",
//   "abcone2threexyz",
//   "xtwone3four",
//   "4nineeightseven2",
//   "zoneight234",
//   "7pqrstsixteen",
// ].forEach((line) => {
//   console.log(
//     line,
//     getCalibrationValue(line),
//   );
//   sum += getCalibrationValue(line);
// });
// console.log(sum);

console.log(
  "2: Sum of actual calibration values:",
  await sumCalibrationValues(),
);
