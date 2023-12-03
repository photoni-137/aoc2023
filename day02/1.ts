import { getNonEmptyLines } from "../lib/parsing.ts";
import { sumOver } from "../lib/math.ts";

export enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

export type Set = Record<Color, number>;

export type Game = {
  id: number;
  sets: Set[];
};

const gameRegex = /^Game (?<id>\d+): (?<sets>.*)$/;
const colorRegex = (color: Color) =>
  new RegExp(`\\b(?<count>\\d+) ${color}\\b`);

const maxNumber = {
  [Color.Red]: 12,
  [Color.Green]: 13,
  [Color.Blue]: 14,
} satisfies Record<Color, number>;

const parseCount = (color: Color) => (setString: string): number => {
  const groups = setString.match(colorRegex(color))?.groups;
  return groups ? Number(groups.count) : 0;
};

const parseSet = (setString: string): Set =>
  Object.values(Color).reduce(
    (set, color) => ({
      ...set,
      [color]: parseCount(color)(setString),
    }),
    {} as Set,
  );

const parseSets = (setsString: string) => setsString.split(";").map(parseSet);

export const parseGame = (line: string): Game => {
  const groups = line.match(gameRegex)?.groups;
  if (!groups) {
    throw new Error(`cannot parse "${line}" as valid game`);
  }
  return {
    id: Number(groups.id),
    sets: parseSets(groups.sets),
  };
};

const isValidSet = (set: Set) =>
  Object.entries(set).every(([color, number]) =>
    number <= maxNumber[color as Color]
  );

const isValidGame = (game: Game) => game.sets.every(isValidSet);

const lines = await getNonEmptyLines("input.txt");
const games = lines.map(parseGame);
const validGameIds = games.filter(isValidGame).map((game) => game.id);
console.log(sumOver(validGameIds));
