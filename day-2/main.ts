import fs from "fs";

type CubeColors = "red" | "green" | "blue";
interface GetPossibleGamesArgs {
  input: string;
  maxCubes: Record<CubeColors, number>;
}

function getPossibleGamesPartOne(args: GetPossibleGamesArgs) {
  let sum = 0;

  for (const [id, game] of args.input.split("\n").entries()) {
    let isImpossible = false;

    const sets = game.match(
      /(\d+\s(?:red|green|blue)(?:,\s)*)+/g
    ) as RegExpMatchArray;

    for (const hand of sets.map((set) => set.split(","))) {
      if (isImpossible) break;

      for (const cubes of hand) {
        const { 1: quantity, 2: color } = cubes.match(
          /(\d+)\s(\w+)/
        ) as RegExpMatchArray;

        if (Number(quantity) > args.maxCubes[color as CubeColors]) {
          isImpossible = true;
          break;
        }
      }
    }

    if (isImpossible === false) {
      sum = sum + (id + 1);
    }
  }

  return sum; // test: 8 | full: 3099
}

function getPossibleGamesPartTwo(args: GetPossibleGamesArgs) {
  let sum = 0;

  for (const game of args.input.split("\n")) {
    const cache: Record<CubeColors, number[]> = { red: [], green: [], blue: [] };

    const sets = game.match(
      /(\d+\s(?:red|green|blue)(?:,\s)*)+/g
    ) as RegExpMatchArray;

    for (const hand of sets.map((set) => set.split(","))) {
      for (const cubes of hand) {
        const { 1: quantity, 2: color } = cubes.match(
          /(\d+)\s(\w+)/
        ) as RegExpMatchArray;

        cache[color as CubeColors].push(Number(quantity));
      }
    }
    sum += Math.max(...cache.red) * Math.max(...cache.green) * (Math.max(...cache.blue));
  }
  return sum; // test: 2286 | full: 72970
}

fs.readFile(`${__dirname}/input.txt`, "utf8", (err, data) => {
  if (err) throw err;

  console.log(
    getPossibleGamesPartOne({
      input: data,
      maxCubes: { red: 12, green: 13, blue: 14 },
    })
  );

  console.log(
    getPossibleGamesPartTwo({
      input: data,
      maxCubes: { red: 12, green: 13, blue: 14 },
    })
  );
});
