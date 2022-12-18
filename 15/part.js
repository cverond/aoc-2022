import { readLines, oMap, createMap, drawMapOfSymbols } from '../utils.js';

	// the real map is really big, so avoid rendering in
	// an unefficient js structure

const lines = readLines('./data.txt');

// const lines = `
// Sensor at x=2, y=18: closest beacon is at x=-2, y=15
// Sensor at x=9, y=16: closest beacon is at x=10, y=16
// Sensor at x=13, y=2: closest beacon is at x=15, y=3
// Sensor at x=12, y=14: closest beacon is at x=10, y=16
// Sensor at x=10, y=20: closest beacon is at x=10, y=16
// Sensor at x=14, y=17: closest beacon is at x=10, y=16
// Sensor at x=8, y=7: closest beacon is at x=2, y=10
// Sensor at x=2, y=0: closest beacon is at x=2, y=10
// Sensor at x=0, y=11: closest beacon is at x=2, y=10
// Sensor at x=20, y=14: closest beacon is at x=25, y=17
// Sensor at x=17, y=20: closest beacon is at x=21, y=22
// Sensor at x=16, y=7: closest beacon is at x=15, y=3
// Sensor at x=14, y=3: closest beacon is at x=15, y=3
// Sensor at x=20, y=1: closest beacon is at x=15, y=3
// `.trim().split('\n');

// In a Manhattan geometry the distance between two points is the sum of the absolute differences of their Cartesian coordinates.

const md = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const re = /^Sensor at x=(?<x>[\d-]+), y=(?<y>[\d-]+): closest beacon is at x=(?<bx>[\d-]+), y=(?<by>[\d-]+)$/;

const sensors = lines.map(l => {

	const m = l.match(re).groups;
	const { x, y, bx, by } = oMap(m, v => Number(v));

		// add distance from between sensor and beacon

	return { x, y, bx, by, d: md(x, y, bx, by) };
});

	// given high numbers, we have to change strategy: for every sensor
	// find in the given line the points covered expressed as intervals,
	// merge the overlapping ones

const computeFreeIntervalsForRow = (sensors, ry) => {

	const il = sensors.map(({ x, y, d }) => {

		const delta = d - Math.abs(y - ry);

		return [x - delta, x + delta];
	});

		// filter out not intersecting intervals

	return il.filter(([from, to]) => from <= to);
};

const mergeOverlappingIntervals = intervals => {

		// sort by starting

	intervals.sort((a, b) => a[0] - b[0]);

	const stack = [ intervals.shift() ];

	while (intervals.length > 0) {

		const top = stack[ stack.length - 1 ], interval = intervals.shift();
		if (top[1] >= interval[0]) {

				// overlap -> update interval on top of stack
				// if greater of interval on top

			top[1] = Math.max(top[1], interval[1]);

		} else
			stack.push(interval);
	}

	return stack;
};

const countFreePositionsFromIntervals = intervals => {

	return intervals.reduce(
		(a, [from, to]) => a + Math.abs(to - from) + 1,
		0
	);
};

const countBeaconsInRow = (sensors, row) => {

		// the same beacon can be repeated

	const candidates = sensors.filter(s => s.by === row).map(s => `${s.bx}-${s.by}`);

	return (new Set(candidates)).size;
};

const row = 2_000_000;

const bir = countBeaconsInRow(sensors, row);

const il = computeFreeIntervalsForRow(sensors, row);

const merged = mergeOverlappingIntervals(il);

const free = countFreePositionsFromIntervals(merged);

console.log(`Answer 1 is: ${ free - bir }`);

	// for part 2 we can brute-force

const max = 4_000_000;
for (let row = 0; row < max; row++) {

	const merged = mergeOverlappingIntervals(
		computeFreeIntervalsForRow(sensors, row)
	);

		// we are looking for two intervals with a 'hole'
		// in between of size 1 whose x coordinate is
		// between 0 and max

	if (merged.length > 1) {

		for (let i = 1; i < merged.length; i++) {

			if (
				merged[i-1][1] === merged[i][0] - 2
				&& merged[i][0] - 1 >= 0
				&& merged[i][0] - 1 <= max
			) {

				console.log(`Answer 2 is: ${ (merged[i][0] - 1) * max + row }`);
				break;
			}
		}
	}
}
