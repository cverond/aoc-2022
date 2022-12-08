import { readFile } from '../utils.js';

const stream = [ ...readFile('./data.txt') ];

class Buffer {

	constructor(size) {

		this.size = size;
		this.a = [];
	}

	add(item) {

		if (this.isFull())
			this.a.shift();

		this.a.push(item);
	}

	items() { return this.a; }

	isFull() { return this.a.length >= this.size; }

		// unoptimal but effective

	hasRepetingItems() {

		const s = new Set(this.a);

		return s.size !== this.a.length;
	}
}

const buffer1 = new Buffer(4);

for (let i in stream) {

	buffer1.add(stream[i]);
	if (buffer1.isFull() && ! buffer1.hasRepetingItems()) {

		console.log(`Answer 1 is: ${ +i + 1 }`);
		break;
	}
}

const buffer2 = new Buffer(14);

for (let i in stream) {

	buffer2.add(stream[i]);
	if (buffer2.isFull() && ! buffer2.hasRepetingItems()) {

		console.log(`Answer 2 is: ${ +i + 1 }`);
		break;
	}
}

