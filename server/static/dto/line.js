'use strict';


export class Line {
	constructor(pointA, pointB, width = 1, time = null) {
		this.pointA = pointA;
		this.pointB = pointB;
		this.time = time;
	}
}
