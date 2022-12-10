import { d, readLines } from '../utils.js';

const moves = readLines('./data.txt')
	.map(l => l.split(' '))
	.map(m => [ m[0], Number(m[1])])
;

const H = { x: 0, y: 0};
const T = { x: 0, y: 0};

const visited = new Set();

const follow = (H, T) => {

	let dx = Math.abs(H.x - T.x), dy = Math.abs(H.y - T.y);

		// uses '1' for steps, is a problem constrain and not generic

	if (dx > 1) {

		T.x += H.x > T.x ? 1 : -1;
		if (dy > 0) {

			T.y += H.y > T.y ? 1 : -1;
			dy--;
		}
	}

	if (dy > 1) {

		T.y += H.y > T.y ? 1 : -1;
		if (dx > 0)
			T.x += H.x > T.x ? 1 : -1;
	}
};

const doMove = move => {

	switch (move) {

		case 'U': H.y++; break;
		case 'D': H.y--; break;
		case 'L': H.x--; break;
		case 'R': H.x++; break;
	}

	follow(H, T);

	visited.add(`${T.x}-${T.y}`);
};

for (let move of moves)
	for (let cnt = 0; cnt < move[1]; cnt++)
		doMove(move[0]);

console.log(`Answer 1 is: ${ visited.size }`);

	// reset for part 2

H.x = 0;
H.y = 0;

visited.clear();

	// can put H in nodes[0] but I'm lazy ...

const nodes = [];
for (let i = 1; i <= 9; i++)
	nodes[i] = { x: 0, y: 0 };

const draw = () => {

	console.log(nodes.map(n => n && `${n.x}-${n.y}`).join(' '))

	for (let y = 6; y >= 0; y--) {

		const l = [];
		for (let x = 0; x < 6; x++) {

			if (H.x === x && H.y === y) {

				l.push('H');

			} else {

				const i = nodes.findIndex(n => n && n.x === x && n.y === y);

				l.push(i === -1 ? '.' : i);
			}
		}

		console.log(l.join(''));
	}

	console.log();
};

const shouldDraw = false;

const doMoveLongTail = move => {

	switch (move) {

		case 'U': H.y++; break;
		case 'D': H.y--; break;
		case 'L': H.x--; break;
		case 'R': H.x++; break;
	}

	follow(H, nodes[1]);

	for (let i = 2; i <= 9; i++)
		follow(nodes[i - 1], nodes[i]);

	shouldDraw && draw();

	visited.add(`${nodes[9].x}-${nodes[9].y}`);
};

shouldDraw && draw();

for (let move of moves)
	for (let cnt = 0; cnt < move[1]; cnt++)
		doMoveLongTail(move[0]);

console.log(`Answer 2 is: ${ visited.size }`);
