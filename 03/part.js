import { readLines, arraySum, arrayChunks } from '../utils.js';

const lines = readLines('./data.txt');

const chMap = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	// not optimal solution

const findCommonPriority = (a, b, c = null) => {

	const bs = new Set(b), cs = c === null ? null : new Set(c);

	for (const i of [...a])
		if (bs.has(i) && (c === null || cs.has(i)))
			return chMap.indexOf(i);
};

const common = lines.map(l => {

	const a = l.substr(0, l.length / 2), b = l.substr(l.length / 2);

	return findCommonPriority(a, b);
});

const answer1 = arraySum(common);

console.log(`Answer 1 is: ${answer1}`);

const chunks = arrayChunks(lines, 3);

const answer2 = arraySum(
	chunks.map(ch => findCommonPriority(ch[0], ch[1], ch[2]))
);

console.log(`Answer 2 is: ${answer2}`);
