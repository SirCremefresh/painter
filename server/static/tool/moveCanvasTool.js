'use strict';

import {Tool} from './tool.js';
import {Point} from '../dto/point.js';
import {moveCanvasWithDelta, scaleTo} from '../canvas/canvas.js';


export class MoveCanvasTool extends Tool {
	constructor() {
		super();
		this.lastMousePosition = null;
	}

	handleMouseUp(e) {
		this.lastMousePosition = null;
	}

	handleMouseOut() {
		this.lastMousePosition = null;
	}

	handleMouseDown(e) {
		this.lastMousePosition = new Point(e.x, e.y, false);
	}

	handleMouseWheel(e) {
		scaleTo({x:e.x,y:e.y}, e.deltaY / 1000)
	}

	handleMove(e) {
		if (this.lastMousePosition === null) {
			return;
		}
		const newMousePosition =  new Point(e.x, e.y, false);
		const deltaPoint = Point.getDeltaPoint(newMousePosition, this.lastMousePosition);
		this.lastMousePosition = newMousePosition;
		moveCanvasWithDelta(deltaPoint);
	}
}