import { readLines, numberPad, createMap, drawMapOfSymbols } from '../utils.js';

const lines = readLines('./data.txt');

// const lines = `
// 498,4 -> 498,6 -> 496,6
// 503,4 -> 502,4 -> 502,9 -> 494,9
// `.trim().split('\n');

const paths = lines
	.map(
		l =>
			l.split(' -> ').map(
				i => i.split(',')
					.map(n => Number(n))
			)
	)
;

const sand = [500, 0];

let
	xmin = Math.min( ...paths.map(path => Math.min( ...path.map(i => i[0]) )), sand[0]) - 1,
	xmax = Math.max( ...paths.map(path => Math.max( ...path.map(i => i[0]) )), sand[0]) + 1,

	ymin = Math.min( ...paths.map(path => Math.min( ...path.map(i => i[1]) )), sand[1]),
	ymax = Math.max( ...paths.map(path => Math.max( ...path.map(i => i[1]) )), sand[1])
;

console.log(xmin, xmax, ymin, ymax)

const drawLine = (p1, p2) => {

	if (p1[0] === p2[0]) {

		if (p1[1] < p2[1]) {

			for (let y = p1[1]; y <= p2[1]; y++)
				map[y][ p1[0] ] = '#';
		} else
			for (let y = p2[1]; y <= p1[1]; y++)
				map[y][ p1[0] ] = '#';

	} else {

		if (p1[0] < p2[0]) {

			for (let x = p1[0]; x <= p2[0]; x++)
				map[ p1[1] ][ x ] = '#';
		} else
			for (let x = p2[0]; x <= p1[0]; x++)
				map[ p1[1] ][ x ] = '#';

	}
};

const drawPath = (path) => {

	let p1 = path.shift();
	for (let p of path) {

		drawLine(p1, p);

		p1 = p;
	}
};

const map = createMap(xmin, xmax, ymin, ymax, '.');

for (let path of paths)
	drawPath(path);

map[ sand[1] ][ sand[0] ] = '+';

// drawMapOfSymbols(map);

const delay = time => new Promise(resolve => setTimeout(resolve, time));

console.log('\x1b[2J');

const run = async () => {

	let n = 0;
	outer: while (++n) {

		let s = [ ...sand ];
		while (true) {

			if (s[1] + 1 > ymax)
				break outer;

			if (map[ s[1] + 1 ][ s[0] ] === '.') {

				s[1]++;

			} else if (map[ s[1] + 1 ][ s[0] - 1 ] === '.') {

				s[1]++;
				s[0]--;

			} else if (map[ s[1] + 1 ][ s[0] + 1 ] === '.') {

				s[1]++;
				s[0]++;

			} else {

				map[ s[1] ][ s[0] ] = 'o';
				break;
			}
		}

		console.log('\x1b[H');
		drawMapOfSymbols(map);

		await delay(30);
	}

	return n;
}

// drawMapOfSymbols(map);

const n = run();

console.log(`Answer 1 is: ${ n - 1 }`);