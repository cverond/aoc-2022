import { readFileSync } from 'fs';


export const readFile = (fn) => {

	return readFileSync(fn, 'utf-8');
};

export const readLines = (fn) => {

	return readFile(fn).split(/\n/);
};


export const arraySum = (a) => a.reduce((a, b) => a + b, 0);

export const arrayChunks = (a, size) => {

	const res = [];
	while (a.length > 0)
		res.push(a.splice(0, size));

	return res;
}
