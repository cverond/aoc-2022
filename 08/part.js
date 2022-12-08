import { readLines } from '../utils.js';

const mapOfTrees = readLines('./data.txt').map(l => [...l].map(c => Number(c)));

const mapWidth = mapOfTrees[0].length;
const mapHeight = mapOfTrees.length;

// // 232 -> 255 -- black -> white

const mapColor = (() => {

	const w = 255 - 232;

	return i => 232 + Math.floor(i * w / 9);
})();

const stringColor = (s, fg, bg) => `\x1b[48;5;${ bg };38;5;${ fg }m${ s }\x1b[0m`;

const treeHeight = (row, col) => mapOfTrees[row][col];

const isTreeVisibleFromTop = (height, row, col) => {

	for (let r = 0; r < row; r++) {

		if (treeHeight(r, col) >= height)
			return false;
	}

	return true;
};

const isTreeVisibleFromBottom = (height, row, col) => {

	for (let r = row + 1; r < mapHeight; r++) {

		if (treeHeight(r, col) >= height)
			return false;
	}

	return true;
};

const isTreeVisibleFromLeft = (height, row, col) => {

	for (let c = 0; c < col; c++) {

		if (treeHeight(row, c) >= height)
			return false;
	}

	return true;
};

const isTreeVisibleFromRight = (height, row, col) => {

	for (let c = col + 1; c < mapWidth; c++) {

		if (treeHeight(row, c) >= height)
			return false;
	}

	return true;
};

const isTreeVisible = (height, row, col) => {

	return isTreeVisibleFromTop(height, row, col)
		|| isTreeVisibleFromBottom(height, row, col)
		|| isTreeVisibleFromLeft(height, row, col)
		|| isTreeVisibleFromRight(height, row, col)
	;
};

let nVisible = 0;
for (let r = 0; r < mapHeight; r++) {

	const out = [];
	for (let c = 0; c < mapWidth; c++) {

		const th = treeHeight(r, c), visible = isTreeVisible(th, r, c);

		visible && nVisible++;

		out.push(

			visible
				? stringColor('*', 160, mapColor(th))
				: stringColor(' ', 0, mapColor(th))
		);
	}

	console.log(out.join(''));
}

console.log(`Answer 1 is: ${ nVisible }`);

const scenicScoreFromTop = (height, row, col) => {

	let cnt = 0;
	for (let r = row - 1; r >= 0; r--) {

		cnt++;
		if (treeHeight(r, col) >= height)
			return cnt;
	}

	return cnt;
};

const scenicScoreFromBottom = (height, row, col) => {

	let cnt = 0;
	for (let r = row + 1; r < mapHeight; r++) {

		cnt++;
		if (treeHeight(r, col) >= height)
			return cnt;
	}

	return cnt;
};

const scenicScoreFromLeft = (height, row, col) => {

	let cnt = 0;
	for (let c = col - 1; c >= 0; c--) {

		cnt++;
		if (treeHeight(row, c) >= height)
			return cnt;
	}

	return cnt;
};

const scenicScoreFromRight = (height, row, col) => {

	let cnt = 0;
	for (let c = col + 1; c < mapWidth; c++) {

		cnt++;
		if (treeHeight(row, c) >= height)
			return cnt;
	}

	return cnt;
};

const scenicScore = (height, row, col) => {

	return scenicScoreFromTop(height, row, col)
		* scenicScoreFromBottom(height, row, col)
		* scenicScoreFromLeft(height, row, col)
		* scenicScoreFromRight(height, row, col)
	;
};

let bestScenicScore = 0;
for (let r = 0; r < mapHeight; r++) {

	for (let c = 0; c < mapWidth; c++) {

		const th = treeHeight(r, c), ss = scenicScore(th, r, c);

		bestScenicScore = Math.max(bestScenicScore, ss);
	}
}

console.log(`Answer 2 is: ${ bestScenicScore }`);