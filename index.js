const stringify = (el) => JSON.stringify(el);

const handleActions = (list) => {
	let newList = [];
	list.forEach((item) => {
		let interval = [item.start, item.end];
		if (item.action === "REMOVED") {
			newList = newList.filter((el) => stringify(el) !== stringify(interval));
		} else if (item.action === "DELETED") {
			// TODO: handle deleting if interval block
		} else {
			newList.push(interval);
		}
	});
	return newList;
};

const mergeIntervals = (intervals, distance) => {
	// Check if intervals is an array of object
	if (!Array.isArray(intervals[0])) {
		intervals = handleActions(intervals);
	}

	intervals.sort((a, b) => a[0] - b[0]);

	let merged = [];
	let prevStart = intervals[0][0];
	let prevEnd = intervals[0][1];

	for (let i = 0; i < intervals.length; i++) {
		const interval = intervals[i];

		let currStart = interval[0];
		let currEnd = interval[1];

		if (currStart - prevEnd <= distance) {
			prevEnd = Math.max(prevEnd, currEnd);
		} else {
			merged.push([prevStart, prevEnd]);
			prevStart = currStart;
			prevEnd = currEnd;
		}
	}
	merged.push([prevStart, prevEnd]);
	return merged;
};

const list = [
	{ sequence: 1, start: 1, end: 20, action: "ADDED" },
	{ sequence: 2, start: 55, end: 58, action: "ADDED" },
	{ sequence: 3, start: 60, end: 89, action: "ADDED" },
	{ sequence: 4, start: 15, end: 31, action: "ADDED" },
	{ sequence: 5, start: 10, end: 15, action: "ADDED" },
	{ sequence: 6, start: 1, end: 20, action: "REMOVED" },
];

const list2 = [
	{ sequence: 1, start: 1, end: 6, action: "ADDED" },
	{ sequence: 2, start: 5, end: 7, action: "ADDED" },
	{ sequence: 3, start: 2, end: 3, action: "DELETED" },
];

const output = mergeIntervals(list, 7);

console.log(output);
