import { readLines } from "../utils.js";


const lines = readLines('./data.txt');


const hasAnInclusion = (a, b) => {

	return (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]);
};

const parsed = lines.map(
	l => l.split(',')
		.map(p => p.split('-').map(v => parseInt(v, 10)))
);

const answer1 = parsed.reduce((a, i) => {

	return hasAnInclusion(i[0], i[1]) ? ++a : a;
}, 0);

console.log(`Answer 1 is: ${answer1}`);

const dontOverlap = (a, b) => {

	return b[1] < a[0] || b[0] > a[1];
};

const answer2 = parsed.reduce((a, i) => {

		// double negation is evil, but ...

	return ! dontOverlap(i[0], i[1]) ? ++a : a;
}, 0);

console.log(`Answer 2 is: ${answer2}`);
