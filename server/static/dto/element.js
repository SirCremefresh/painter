'use strict';

import uuid from '../uuid.js';
import Utilities from '../utilities.js'
import {Point} from './point.js';

export class Element {
	constructor(color = '#000000', width = 1, type = 'basic', fillColor = null, basePoint = null) {
		this.basePoint = basePoint;
		this.type = type;
		this.lines = [];
		this.uuid = uuid();


		this.width = width;
		this.color = color;
		this.colorAlpha = 1;

		this.borderColor = null;
		this.borderWidth = 2;
		this.borderColorAlpha = 1;
		this.padding = 0;

		this.fillColor = fillColor;
		this.fillColorAlpha = 1;
	}

	static getRelativePointToElement(point, element) {
		return new Point(point.x - element.basePoint.x, point.y - element.basePoint.y, false)
	}

	static getElementWithPoint(point, padding) {
		for (const element of elements) {
			if (Utilities.hasElementPoint(element, point, padding) !== null) {
				return element
			}
		}
		return null;
	}

	static hasElementPoint(element, point, padding = 0) {
		point = Element.getRelativePointToElement(point, element);
		for (const line of element.lines) {
			const pointA = line.pointA;
			const pointB = line.pointB;

			if (Point.isPointBetweenSquare(pointA, pointB, point, element.width + padding + 5)) {


				const gradient = (pointB.y - pointA.y) / (pointB.x - pointA.x);

				if (
					gradient === Infinity || gradient === -Infinity ||
					gradient === 0
				) {
					return element;
				}

				const yOffset = pointA.y - (gradient * pointA.x);

				const calculatedY = gradient * point.x + yOffset;
				const calculatedX = (point.y - yOffset) / gradient;
				if (
					Utilities.isNear(point.y, calculatedY, padding + element.width) &&
					Utilities.isNear(point.x, calculatedX, padding + element.width)
				) {
					return element;
				}
			}
		}
		return null;
	}

	static moveElement(element, deltaPoint) {
		element.basePoint = Point.movePointWhitDeltaPoint(element.basePoint, deltaPoint);
	}

	static getCorners(element, padding = 0) {
		let maxX = -1, maxY = -1, minX = Infinity, minY = Infinity;

		for (const line of element.lines) {
			maxX = Utilities.getMax(line.pointA.x, maxX);
			maxY = Utilities.getMax(line.pointA.y, maxY);

			minX = Utilities.getMin(line.pointA.x, minX);
			minY = Utilities.getMin(line.pointA.y, minY);

			maxX = Utilities.getMax(line.pointB.x, maxX);
			maxY = Utilities.getMax(line.pointB.y, maxY);

			minX = Utilities.getMin(line.pointB.x, minX);
			minY = Utilities.getMin(line.pointB.y, minY);
		}
		return Point.getFourCorners(new Point(minX, minY), new Point(maxX, maxY), padding)

	}

}
