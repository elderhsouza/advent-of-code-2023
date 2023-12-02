import fs from "fs";

type Colors = "red" | "green" | "blue";
interface GetPossibleGamesArgs {
  input: string;
  maxCubes: Record<Colors, number>;
}

function getPossibleGamesPartOne(args: GetPossibleGamesArgs) {
  let sum = 0;

  for (const [id, line] of args.input.split("\n").entries()) {
    let isImpossible = false;

    const sets = line.match(
      /(\d+\s(?:red|green|blue)(?:,\s)*)+/g
    ) as RegExpMatchArray;

    for (const hand of sets.map((set) => set.split(","))) {
      if (isImpossible) break;

      for (const cubes of hand) {
        const { 1: quantity, 2: color } = cubes.match(
          /(\d+)\s(\w+)/
        ) as RegExpMatchArray;

        if (Number(quantity) > args.maxCubes[color as Colors]) {
          isImpossible = true;
          break;
        }
      }
    }

    if (isImpossible === false) {
      sum = sum + (id + 1);
    }
  }

  return sum;
} // 3099

fs.readFile(`${__dirname}/input.txt`, "utf8", (err, data) => {
  if (err) throw err;
  console.log(
    getPossibleGamesPartOne({
      input: data,
      maxCubes: { red: 12, green: 13, blue: 14 },
    })
  );
});
