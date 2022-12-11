import { readFile } from '../utils.js';

const monkeyDefinitions = readFile('./data.txt').split('\n\n');

class Monkey {

	constructor(def, manageStress, talk) {

		def = def.split('\n');

		this.n = Number(
			def[0]
				.match(/^Monkey (\d):$/)[1]
		);

		this.items = def[1]
			.match(/^  Starting items: (.*)$/)[1]
			.split(', ')
			.map(n => BigInt(n))
		;

		this.operation = def[2]
			.match(/^  Operation: new = (?<op1>[\w\d]+) (?<op>[+*]) (?<op2>[\w\d]+)$/).groups

		this.divisibleBy = BigInt(
			def[3]
				.match(/^  Test: divisible by (\d+)$/)[1]
		);

		this.ifTrue = Number(
			def[4]
				.match(/^    If true: throw to monkey (\d+)$/)[1]
		);

		this.ifFalse = Number(
			def[5]
				.match(/^    If false: throw to monkey (\d+)$/)[1]
		);

		this.manageStress = manageStress;
		this.talk = talk;

		this.inspected = 0;
	}

	getItems() { return this.items; }
	getInspected() { return this.inspected; }
	getDivisibleBy() { return this.divisibleBy; }

	receiveItem(item) { this.items.push(item); }

	doTurn(monkeys, commonDivisor) {

		this.items
			.forEach(worry => {

				this.talk && console.log(`${this.n}: item ${worry}`)

				let newWorry = this.doOperation(worry);

				this.talk && console.log(`${this.n}: operation ${newWorry}`)

				if (this.manageStress)
					newWorry = BigInt(Math.floor(Number(newWorry) / 3));

				this.talk && console.log(`${this.n}: bored ${newWorry}`)

				const dstMonkey = this.doTest(newWorry) ? this.ifTrue : this.ifFalse

				this.talk && console.log(`${this.n}: throw ${dstMonkey}`)

				monkeys[dstMonkey].receiveItem(newWorry % commonDivisor);

				this.talk && console.log();
			})
		;

		this.inspected += this.items.length;

		this.talk && console.log('---');

		this.items = [];
	}

	doOperation(value) {

		const op2 = this.operation.op2 === 'old' ? value : BigInt(this.operation.op2);

		switch (this.operation.op) {

			case '+': return value + op2;
			case '*': return value * op2;
			default: throw 'Error operation';
		}
	}

	doTest(value) {

		return value % this.divisibleBy == 0;
	}
}

const talk = false;

[
	{ rounds: 20, manageStress: true },
	{ rounds: 10_000, manageStress: false },

].forEach((conf, i) => {

	const monkeys = monkeyDefinitions.map(def => new Monkey(def, conf.manageStress, talk));

		// added for part 2

	const commonDivisor = monkeys.reduce((prod, m) => prod * m.getDivisibleBy(), 1n);

	for (let round = 1; round <= conf.rounds; round++)
		monkeys.forEach(m => m.doTurn(monkeys, commonDivisor));

	monkeys.sort((a, b) => b.getInspected() - a.getInspected());

	const activity = monkeys[0].getInspected() * monkeys[1].getInspected();

	console.log(`Answer ${ i + 1 } is: ${ activity }`);
});

