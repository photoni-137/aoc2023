import { isProperNumber, sumOver } from "../lib/math.ts";
import { getNonEmptyLines } from "../lib/parsing.ts";
import { first, last } from "../lib/arrays.ts";

const getDigits = (s: string) =>
  s.split("").map((char) => Number(char)).filter((n) => isProperNumber(n));

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
  "1: Sum of naive calibration values:",
  await sumCalibrationValues(),
);
