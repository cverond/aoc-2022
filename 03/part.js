import { readLines, arraySum, arrayChunks } from "../utils.js";


const lines = readLines('./data.txt');

const chMap = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	// non ottimizzata ma efficace, nel caso di due set ripetere il secondo

const findCommonPriority = (a, b, c) => {

	const bs = new Set(b), cs = new Set(c);

	for (const i of [...a])
		if (bs.has(i) && cs.has(i))
			return chMap.indexOf(i);
};

const common = lines.map(l => {

	const a = l.substr(0, l.length / 2), b = l.substr(l.length / 2);

	return findCommonPriority(a, b, b);
});

const answer1 = arraySum(common);

console.log(`Answer 1 is: ${answer1}`);

const chunks = arrayChunks(lines, 3);

const answer2 = arraySum(
	chunks.map(ch => findCommonPriority(ch[0], ch[1], ch[2]))
);

console.log(`Answer 2 is: ${answer2}`);
