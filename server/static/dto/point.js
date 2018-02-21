'use strict';

import Utilities from '../utilities.js'
import {addCanvasOffsetToPoint} from '../canvas/canvas.js';

export class Point {
	constructor(x, y, makeCanvasRelative = true) {
		this.x = x;
		this.y = y;
		if(makeCanvasRelative) {
			addCanvasOffsetToPoint(this)
		}
	}

	static isPointBetweenSquare(corner1, corner2, point, padding = 0) {
		const {bottomLeft, topRight} = Utilities.getFourCorners(corner1, corner2);
		return (
			bottomLeft.y + padding >= point.y &&
			bottomLeft.x - padding <= point.x &&
			topRight.y - padding <= point.y &&
			topRight.x + padding >= point.x
		)
	}

	static getFourCorners(pointA, pointB, padding = 0) {
		let maxX, maxY, minX, minY;

		if (pointA.x > pointB.x) {
			maxX = pointA.x;
			minX = pointB.x
		} else {
			maxX = pointB.x;
			minX = pointA.x;
		}

		if (pointA.y > pointB.y) {
			maxY = pointA.y;
			minY = pointB.y
		} else {
			maxY = pointB.y;
			minY = pointA.y;
		}

		minX -= padding;
		minY -= padding;
		maxX += padding;
		maxY += padding;

		return {
			maxX, maxY, minX, minY,
			topLeft: new Point(minX, minY),
			topRight: new Point(maxX, minY),
			bottomLeft: new Point(minX, maxY),
			bottomRight: new Point(maxX, maxY)
		}
	}

	static getDeltaPoint(point1, point2) {
		return new Point(
			point1.x - point2.x,
			point1.y - point2.y,
			false
		);
	}

	static movePointWhitDeltaPoint(point, deltaPoint) {
		return new Point(
			point.x + deltaPoint.x,
			point.y + deltaPoint.y,
			false
		);
	}
}
