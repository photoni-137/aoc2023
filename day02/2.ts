import { Color, colors, DiceSet, Game, parseGames } from "./1.ts";
import { sumOver } from "../lib/math.ts";

const max = (color: Color) => ({ sets }: Game) =>
  Math.max(...sets.map((set) => set[color]));

const power = (set: DiceSet) =>
  colors.reduce((product, color) => product * set[color], 1);

const minSet = (game: Game): DiceSet =>
  colors.reduce((set, color) => ({
    ...set,
    [color]: max(color)(game),
  }), {} as DiceSet);

const minPower = (game: Game) => power(minSet(game));

const games = await parseGames();
const powers = games.map(minPower);
console.log(sumOver(powers));
