import { readFile, arraySum } from '../utils.js';

const file = readFile('./data.txt');

const groups = file.split(/\n\n/);

const single = groups
	.map(block => block.split(/\n/))
	.map(
		bi => arraySum(bi.map(n => Number(n)))
	)
;

const max = Math.max(...single);

console.log(`Answer 1 is: ${max}`);