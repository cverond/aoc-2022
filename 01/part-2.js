import { readFile, arraySum } from '../utils.js';

const file = readFile('./data.txt');

const groups = file.split(/\n\n/);

const single = groups
	.map(block => block.split(/\n/))
	.map(
		bi => arraySum(bi.map(n => Number(n)))
	)
;

const sum = arraySum(
	single
		.sort((a, b) => b - a)
		.slice(0, 3)
);

console.log(`Answer 2 is: ${sum}`);
