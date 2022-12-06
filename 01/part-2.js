import { readFile } from "../utils.js";


const file = readFile('./data.txt');

const groups = file.split(/\n\n/);

const single = groups
	.map(block => block.split(/\n/))
	.map(
		bi => bi
			.map(n => parseInt(n, 10))
			.reduce((a, i) => a + i, 0)
	)
;

const sorted = single.sort((a, b) => b - a);

const sum = sorted.slice(0, 3).reduce((a, i) => a + i, 0);

console.log(`Answer is: ${sum}`);