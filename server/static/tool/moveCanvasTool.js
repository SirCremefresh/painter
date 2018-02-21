'use strict';

import {Tool} from './tool.js';
import {Element} from '../dto/element.js'
import {Line} from '../dto/line.js';
import {Point} from '../dto/point.js';
import Utilities from '../utilities.js';
import {moveCanvasWithDelta, canvasScaleDelta} from '../canvas/canvas.js';


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
		canvasScaleDelta(e.deltaY / 1000)
	}

	handleMove(e) {
		if (this.lastMousePosition === null) {
			return;
		}
		const newMousePosition =  new Point(e.x, e.y, false);
		const deltaPoint = Point.getDeltaPoint(newMousePosition, this.lastMousePosition);
		this.lastMousePosition = newMousePosition;
		moveCanvasWithDelta(deltaPoint);
		console.log(deltaPoint.x);
	}
}