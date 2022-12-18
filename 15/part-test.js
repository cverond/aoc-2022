import { readLines, oMap, createMap, drawMapOfSymbols } from '../utils.js';

// const lines = readLines('./data.txt');

const lines = `
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3
`.trim().split('\n');

const re = /^Sensor at x=(?<x>\d+), y=(?<y>\d+): closest beacon is at x=(?<bx>[\d-]+), y=(?<by>[\d-]+)$/;

const sensors = lines.map(l => {

	const m = l.match(re).groups;

	return oMap(m, v => Number(v));
});

let
	sx = sensors.map(s => [s.x, s.bx]).flat(),
	xmin = Math.min(...sx),
	xmax = Math.max(...sx),
	sy = sensors.map(s => [ s.y, s.by ]).flat(),
	ymin = Math.min(...sy),
	ymax = Math.max(...sy)
;

console.log(xmin, xmax, ymin, ymax)

const map = createMap(xmin, xmax, ymin, ymax, '.');

// In a Manhattan geometry the distance between two points is the sum of the absolute differences of their Cartesian coordinates.

const md = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const drawSensors = (map, sensors) => {

	sensors.forEach(s => {

		map[s.y][s.x] = 'S';
		map[s.by][s.bx] = 'B';
	});
};

const drawBeaconCoverage = (map, sensor) => {

	const d = md(sensor.x, sensor.y, sensor.bx, sensor.by);

	for (let x = xmin; x <= xmax; x++)
		for (let y = ymin; y <= ymax; y++) {

			if (md(sensor.x, sensor.y, x, y) <= d && map[y][x] !== 'B')
				map[y][x] = '#';
		}
};

drawSensors(map, sensors);
drawMapOfSymbols(map);

sensors.forEach(s => drawBeaconCoverage(map, s));

drawMapOfSymbols(map);

	// count '#' symbols - cannot use .map or .reduce
	// due to negative indexes

let n = 0;
for (let x = xmin; x <= xmax; x++)
	if (map[10][x] === '#')
		n++;

console.log(`Answer 1 is: ${ n }`);
