import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { gearRatioSum, partNumberSum } from "./parseBySymbol.ts";

Deno.test("actual part number sum", async () => {
  const sum = await partNumberSum("input.txt");
  assertEquals(sum, 553079);
});

Deno.test("example gear ration sum", async () => {
  const sum = await gearRatioSum("example.txt");
  assertEquals(sum, 467835);
});
