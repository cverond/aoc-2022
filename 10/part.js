import { numberPad, readLines } from '../utils.js';

const instructions = readLines('./data.txt').map(l => {

	const [inst, op] = l.split(' ');

	return [inst, op === undefined ? null : Number(op) ];
});

const cpu = { cycle: 1, x: 1 };
let signalStrength = 0;

const shouldMeasureSignalStrength = cycle => cycle === 20 || (cycle - 20) % 40 === 0;

const crt = [];

const printScreen = () => {

	crt.forEach(l => {

		console.log(`Cycle ${ numberPad(l.start, 5) } -> ${ l.buffer } <- Cycle ${ numberPad(l.end, 5) }`);
	});
};

let scanLine = [ '#' ]; // off by one ...

const nextCycle = () => {

	const x = cpu.cycle % 40;
	const drawPixel = x >= cpu.x - 1 && x <= cpu.x + 1;

	if (cpu.cycle % 40 === 0) {

		crt.push({ buffer: scanLine.join(''), start: cpu.cycle - 40, end: cpu.cycle });
		scanLine = [];
	}

	scanLine.push(drawPixel ? '#' : '.');

	cpu.cycle++;

	if (shouldMeasureSignalStrength(cpu.cycle))
		signalStrength += cpu.cycle * cpu.x;
};

instructions.forEach(i => {

	switch (i[0]) {

		case 'addx':

				nextCycle();

				cpu.x += i[1];

				nextCycle();

			break;

		case 'noop':

				nextCycle();

			break;
	}
});

console.log(`Answer 1 is: ${ signalStrength }`);

printScreen();
