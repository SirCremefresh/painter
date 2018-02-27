'use strict';

import {Tool} from './tool.js';
import {Point} from '../dto/point.js';
import {Element} from '../dto/element.js';
import {moveCanvasWithDelta, scaleTo} from '../canvas/canvas.js';


export class MoveCanvasTool extends Tool {
	constructor() {
		super();
		this.lastMousePosition = null;
		this.selectedElement = null;
	}

	handleMouseUp(e) {
		this.lastMousePosition = null;
	}

	handleMouseOut() {
		this.lastMousePosition = null;
	}

	handleMouseDown(e) {
		this.lastMousePosition = new Point(e.x, e.y, false);
		const point = new Point(e.x, e.y, false);
		if (this.selectedElement !== null) {
			const {topLeft, bottomRight} = Element.getCorners(this.selectedElement);
			if (!Point.isPointBetweenSquare(topLeft, bottomRight, point, 20)) {
				this.selectedElement = null;
			}
		}
		for (const element of elements) {
			if (Element.hasElementPoint(element, point, 20)) {
				this.selectedElement = element;
				return;
			}
		}
		this.selectedElement = null;
	}

	handleMouseWheel(e) {
		scaleTo({x: e.x, y: e.y}, e.deltaY / 1000)
	}

	handleMove(e) {
		if (this.lastMousePosition === null) {
			return;
		}
		const newMousePosition = new Point(e.x, e.y, false);
		const deltaPoint = Point.getDeltaPoint(newMousePosition, this.lastMousePosition);
		this.lastMousePosition = newMousePosition;
		if (this.selectedElement !== null) {
			Element.moveElement(this.selectedElement, deltaPoint);
			editElement(this.selectedElement);
		} else {
			moveCanvasWithDelta(deltaPoint);
		}
	}
}