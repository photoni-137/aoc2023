import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { sumOver } from "../lib/math.ts";
import { findPartNumbers } from "./lib.ts";

const filename = "test.txt";

const partNumbers = await findPartNumbers(filename, true);

Deno.test("sum", () => {
  const partNumberValues = partNumbers.map((partNumber) => partNumber.value);
  assertEquals(sumOver(partNumberValues), 4361);
});
