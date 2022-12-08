import { readLines, arraySum } from '../utils.js';

const commands = readLines('./data.txt');

const createNewNode = (parent = null) => ({ p: parent, d: {}, f: {} });

const printNode = (node, l = 0) => {

	for (let f in node.f)
		console.log(`${ '  |'.repeat(l) } [F] ${f}`)

	for (let d in node.d) {

		const dir = node.d[d], nFiles = Object.keys(dir.f).length;

		console.log(`${ '  |'.repeat(l) } [D] ${d} (${ nFiles } files)`)
		printNode(node.d[d], ++l);
	}
};

const nodeSize = (node) => {

	let size = arraySum(Object.values(node.f));

	for (let d in node.d)
		size += nodeSize(node.d[d]);

	return size;
};

const harvestSizes = (node, path = '/', rs = []) => {

	let size = arraySum(Object.values(node.f));

	for (let d in node.d)
		size += harvestSizes(node.d[d], `${path}${d}/`, rs);

	rs.push({ path, size });

	return size;
};

const root = createNewNode();
let curNode = root;

for (let command of commands) {

	let m;
	if ((m = command.match(/^\$\s+(\w+)(?:\s+(.*))?$/)) !== null) {

		const [_, cmd, path] = m;

		switch (cmd) {

			case 'cd':

					if (path === '/')
						break;

					if (path === '..')
						curNode = curNode.p;
					else {

						if (! curNode.d[path])
							curNode.d[path] = createNewNode(curNode);

						curNode = curNode.d[path];
					}

				break;

			case 'ls':
				break;

			default:
				throw `Unknown command '${cmd}'`;
		}

		// console.log(`${cmd} -> ${path}`);

	} else if ((m = command.match(/^(\d+)\s+(.*)$/)) !== null) {

		const [_, size, file] = m;

		curNode.f[file] = Number(size);

		// console.log(` .  ${file} -> ${Number(size)}`);

	} else if ((m = command.match(/^dir\s+(.*)$/)) !== null) {

		const [_, dir] = m;

		// console.log(` .  DIR -> ${dir}`);

	} else
		throw `Error parsing '${command}'`;
}

const filledSpace = nodeSize(root)

const sizes = [];
harvestSizes(root, '/', sizes);

const answer = arraySum(
	sizes
		.filter(
			item => item.size <= 100_000
		)
		.map(
			i => i.size
		)
);

console.log(`Answer 1 is: ${answer}`);

const totalDiskSpace = 70_000_000;
const availableSpace = totalDiskSpace - filledSpace;
const neededSpace = 30_000_000;
const needToFree = neededSpace - availableSpace;

console.log();
console.log(`  Total fs size: ${ totalDiskSpace }`);
console.log(`    Filled size: ${ filledSpace }`);
console.log(`Available space: ${availableSpace}`);
console.log(`   Need to free: ${needToFree}`);

const deleteCandidates = sizes
	.filter(
		item => item.size >= needToFree
	)
	.sort((a, b) => a.size - b.size)
;

console.log(`         delete: ${deleteCandidates[0].path}`);
console.log();

console.log(`Answer 2 is: ${deleteCandidates[0].size}`);
