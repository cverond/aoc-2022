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

const max = Math.max(...single);

console.log(`Answer is: ${max}`);