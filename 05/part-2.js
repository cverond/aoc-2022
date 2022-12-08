import { readFile, arrayChunks } from "../utils.js";


const [stacks, moves] = readFile('./data.txt').split('\n\n').map(b => b.split('\n'));

console.log(stacks)

const numberOfStacks = Math.ceil(stacks.pop().length / 4);

console.log(`Number of stacks: ${numberOfStacks}`);

const deck = stacks.reduce((a, l) => {

	for (let i = 0; i < numberOfStacks; i++) {

		if (! a[i])
			a[i] = [];

		const crate = l.charAt(i * 4 + 1);

		if (crate.trim() !== '')
			a[i].unshift(crate);
	}

	return a;

}, []);

moves.reduce((deck, move) => {

	const [_, n, from, to] = move.split(/[^0-9]+/).map(v => Number(v));

	deck[to - 1] = deck[to - 1].concat(deck[from - 1].splice(- n, n));

	return deck;

}, deck);

const answer1 = deck.map(s => s.pop()).join('');

console.log(`Answer 2 is: ${answer1}`);
