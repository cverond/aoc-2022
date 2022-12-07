import { parentPort } from "worker_threads";
import { readFile } from "../utils.js";

const file = readFile('./data.txt');

const lines = file.split(/\n/);

const shapeUsed = {
	X: 1,
	Y: 2,
	Z: 3
};

const turnOutcame = {
	AX: 3,
	AY: 6,
	AZ: 0,

	BX: 0,
	BY: 3,
	BZ: 6,

	CX: 6,
	CY: 0,
	CZ: 3,
};

const score1 = lines.reduce((a, l) => {

	const [adversary, me] = l.split(' ');

	return a + shapeUsed[me] + turnOutcame[ adversary + me ];
}, 0);

console.log(`Answer 1 is: ${score1}`);

const outcame = {
	X: 0,
	Y: 3,
	Z: 6
};

const ruleOutcame = {
	AX: 3,
	AY: 1,
	AZ: 2,
	BX: 1,
	BY: 2,
	BZ: 3,
	CX: 2,
	CY: 3,
	CZ: 1,
};

const score2 = lines.reduce((a, l) => {

	const [adversary, me] = l.split(' ');

	return a + outcame[me] + ruleOutcame[ adversary + me ];
}, 0);

console.log(`Answer 2 is: ${score2}`);

