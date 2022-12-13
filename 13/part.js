import { readFile } from '../utils.js';

const signal = readFile('./data.txt')
	.split('\n\n')
	.map(
		b => b.split('\n')
			.map(p => JSON.parse(p))
	)
;

const IN_ORDER = -1, OUT_OF_ORDER = 1, CONTINUE = 0;
const decode = s => s === IN_ORDER ? 'IN ORDER' : s === OUT_OF_ORDER ? 'OUT OF ORDER' : 'CONTINUE';

const talk = false;

const compare = (left, right, l = 0) => {

	const pad = '  '.repeat(l);

	talk &&  console.log(`${pad} Compare ${ JSON.stringify(left) } vs ${ JSON.stringify(right) }`);

	const leftIsNumber = typeof left === 'number', rightIsNumber = typeof right === 'number';

	if (leftIsNumber && rightIsNumber) {

		return Math.sign(left - right);

	} else if (leftIsNumber && ! rightIsNumber) {

		return compare([left], right, l + 1);

	} else if (! leftIsNumber && rightIsNumber) {

		return compare(left, [right], l + 1);

	} else {

		for (let i = 0; i < Math.min(left.length, right.length); i++)
			switch (compare(left[i], right[i], l + 1)) {
				case IN_ORDER: return IN_ORDER;
				case OUT_OF_ORDER: return OUT_OF_ORDER;
				// case CONTINUE:
			}

		return Math.sign(left.length - right.length);
	}
};

const a = signal.reduce((sum, b, i) => {

	talk && console.log(`\n== Pair ${i + 1} ==`);

	const r = compare(b[0], b[1]);

 	talk && console.log(`-> ${ decode(r) }`);

	return r === IN_ORDER ? sum + i + 1 : sum;
}, 0);

console.log(`Answer 1 is: ${ a }`);

	// reorganize input data for part 2 and add divider packets

const d1 = [[2]], d2 = [[6]];

const allPackets = [ ...signal.flat(), d1, d2 ].sort(compare);

const a2 = (allPackets.indexOf(d1) + 1) * (allPackets.indexOf(d2) + 1);

console.log(`Answer 2 is: ${ a2 }`);
