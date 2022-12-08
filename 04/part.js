import { readLines, arraySum } from '../utils.js';

const lines = readLines('./data.txt');

const hasAnInclusion = (a, b) => {

	return (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]);
};

const parsed = lines.map(
	l => l
		.split(',')
		.map(
			p => p
				.split('-')
				.map(v => Number(v))
		)
);

const answer1 = parsed.filter(i => hasAnInclusion(i[0], i[1])).length;

console.log(`Answer 1 is: ${answer1}`);

const dontOverlap = (a, b) => b[1] < a[0] || b[0] > a[1];

	// double negation is evil, but ...

const answer2 = parsed.filter( i => ! dontOverlap(i[0], i[1])).length;

console.log(`Answer 2 is: ${answer2}`);
