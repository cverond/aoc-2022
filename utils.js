import { readFileSync } from 'fs';


export const readFile = (fn) => {

	return readFileSync(fn, 'utf-8').trim();
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

export const d = (...ol) => ol.forEach(o => console.log(JSON.stringify(o, null, 2)));

export const numberPad = (n, places) => `${n}`.padStart(places, ' ');

export const oMap = (obj, fn) =>
	Object.fromEntries(
		Object.entries(obj).map(
			([k, v], i) => [k, fn(v, k, i)]
		)
	)
;

	// every symbol should be 1 char

export const drawMapOfSymbols = (map) => {

	const
		iy = Object.keys(map).map(n => Number(n)),
		ymin = Math.min(...iy),
		ymax = Math.max(...iy),
		ix = Object.keys(map[ymin]).map(n => Number(n)),
		xmin = Math.min(...ix),
		xmax = Math.max(...ix)
	;

	const
		xpad = `${xmax}`.length,
		ypad = `${ymax}`.length
	;

	const h = [];
	for (let x = xmin; x <= xmax; x++)
		h.push(numberPad(x, xpad));

	for (let i = 0; i < xpad; i++)
		console.log(' '.repeat(xpad), h.map(c => c[i]).join(''));

	for (let y = ymin; y <= ymax; y++) {

		const row = [];
		for (let x = xmin; x <= xmax; x++)
			row.push(map[y][x]);

		console.log(numberPad(y, ypad), row.join(''));
	}
};
