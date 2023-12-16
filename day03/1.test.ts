import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { partNumberSum } from "./parseBySymbol.ts";

Deno.test("test sum", async () => {
  const sum = await partNumberSum("test.txt");
  assertEquals(sum, 4361);
});
