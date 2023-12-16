import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { partNumberSum } from "./parseBySymbol.ts";

Deno.test("actual sum", async () => {
  const sum = await partNumberSum("input.txt");
  assertEquals(sum, 553079);
});
