import fs from "fs";

function getCalibrationCode(input: string) {
  const replacements = new Map([
    ["one", "o1e"], ["two", "t2o"], ["three", "t3e"],
    ["four", "f4r"], ["five", "f5e"], ["six", "s6x"],
    ["seven", "s7n"], ["eight", "e8t"], ["nine", "n9e"],
  ]);
  const re = new RegExp(`(?=(${Array.from(replacements.keys()).join('|')}))`, 'g');

  return input
    .split("\n")
    .map((line) => {
      const { 0: first, length: l, [l - 1]: last } = line
        .replace(re, (_, m) => replacements.get(m) ?? '')
        .match(/\d/g) as RegExpMatchArray;
      return Number(`${first}${last}`);
    })
    .reduce((acc, n) => acc + n, 0);
}

fs.readFile(`${__dirname}/input.txt`, "utf8", (err, data) => {
  if (err) throw err;
  const calibrationCode = getCalibrationCode(data);
  console.log(calibrationCode); //?
});

