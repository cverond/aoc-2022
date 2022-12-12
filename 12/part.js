import { readLines } from '../utils.js';

	// stupid trick to use Sets ...

const toString = (row, col) => `${row}/${col}`;
const fromString = s => s.split('/').map(Number);

const asciiOfA = 'a'.charCodeAt(0);

let start, end;
const map = readLines('./data.txt')
	.map((l, row) => [...l].map((h, col) => {

		if (h === 'S') {

			start = toString(row, col);

			return 0; // a

		} else if (h === 'E') {

			end = toString(row, col);

			return 25; // z

		} else
			return h.charCodeAt(0) - asciiOfA;
	}))
;

const mWidth = map[0].length, mHeight = map.length;

console.log(`Map is ${mWidth} x ${mHeight}`);

	// simple BFS that counts needed steps to reach
	// the target

const BFS = startPoint => {

		// keep track of explored points

	const explored = (new Set()).add(startPoint);

		// should substitute queue at every loop due to Set semantic

	let queue = (new Set()).add(startPoint);

		// add point to both sets if not visited yet

	const add = (queue, point) => {

		if (! explored.has(point)) {

			explored.add(point);
			queue.add(point);
		}
	};

	let loops = 0;
	while (++loops) {

		const nextQueue = new Set();

		for (const point of queue) {

			const [row, col] = fromString(point);
			const h = map[row][col];

			if (col > 0) {

				const hh = map[row][col - 1];
				if (hh <= h + 1)
					add(nextQueue, toString(row, col - 1));
			}

			if (col + 1 < mWidth) {

				const hh = map[row][col + 1];
				if (hh <= h + 1)
					add(nextQueue, toString(row, col + 1));
			}

			if (row > 0) {

				const hh = map[row - 1][col];
				if (hh <= h + 1)
					add(nextQueue, toString(row - 1, col));
			}

			if (row + 1 < mHeight) {

				const hh = map[row + 1][col];
				if (hh <= h + 1)
					add(nextQueue, toString(row + 1, col));
			}
		}

			// have we reached end point?

		if (nextQueue.has(end))
			return loops;

			// guard

		if (nextQueue.size === 0)
			throw `New set doesn't contain any point`;

		queue = nextQueue;
	}
};

const a1 = BFS(start);

console.log(`Answer 1 is: ${ a1 }`);

	// simple brute-force

let shortest = Infinity;
for (let row in map)
	for (let col in row)
		if (map[row][col] === 0)
			shortest = Math.min(shortest, BFS(toString(row, col)));

console.log(`Answer 2 is: ${ shortest }`);