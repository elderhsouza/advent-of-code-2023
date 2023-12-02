"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// open input file and read it line by line using node.js
const fs_1 = __importDefault(require("fs"));
// read input file
fs_1.default.readFile('/home/ehs/dev/ehs/advent-of-code-2023/day-1/input.txt', 'utf8', (err, data) => {
    if (err)
        throw err;
    console.log(data);
});
// const input = fs.readFileSync(__dirname + '/input.txt', 'utf8'); //?
// console.log(input);
