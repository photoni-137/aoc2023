import { sumOver } from "../lib/math.ts";
import { findPartNumbers } from "./lib.ts";

const partNumbers = await findPartNumbers("input.txt");

console.log(
  sumOver(partNumbers.map((number) => number.value)),
);
