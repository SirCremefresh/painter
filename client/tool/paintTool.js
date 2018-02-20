'use strict';

import {Tool} from './tool.js';
import {Element} from '../dto/element.js'
import {Line} from '../dto/line.js';
import {Point} from '../dto/point.js';
import Utilities from '../utilities.js';


export class PaintTool extends Tool {
	constructor() {
		super();
		this.color = '#000';
		this.width = 20;
		this.currentElement = null;
		this.lastClickTimeStamp = null;
	}

	handleMouseUp(e) {
		this.currentElement = null;
		this.lastClickTimeStamp = null;
	}

	handleMouseOut() {
		this.currentElement = null;
		this.lastClickTimeStamp = null;
	}

	handleMouseDown(e) {
		const element = new Element(this.color, this.width, 'basic');
		addElement(element);
		this.currentElement = element;
	}

	handleMove(e) {
		if (this.currentElement === null) {
			return;
		}
		if (this.currentElement.basePoint === null) {
			this.currentElement.basePoint = new Point(e.x, e.y);
			this.lastClickTimeStamp = e.timeStamp;
		} else {
			let pointA;
			if (this.currentElement.lines.length === 0) {
				pointA = new Point(0, 0);
			} else {
				const lastPoint = this.currentElement.lines[this.currentElement.lines.length - 1].pointB;
				pointA = new Point(lastPoint.x, lastPoint.y);
			}
			const pointB = Element.getRelativePointToElement(new Point(e.x, e.y), this.currentElement);
			const line = new Line(pointA, pointB, this.lastClickTimeStamp - e.timeStamp);
			this.lastClickTimeStamp = e.timeStamp;
			this.currentElement.lines.push(line);
			editElement(this.currentElement);
		}
	}
}