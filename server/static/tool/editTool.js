'use strict';

import {Tool} from './tool.js';
import {Point} from '../dto/point.js';
import Utilities from '../utilities.js';
import {Element} from '../dto/element.js';
import {privateElements, deletePrivateElementWithUuId} from '../elementsStore.js';
import {Line} from '../dto/line.js';


export class EditTool extends Tool {
	constructor() {
		super();
		this.setDefaultStats();
	}

	setDefaultStats() {
		this.selectedElement = null;
		this.relativeElementClickPosition = null;
		this.isDragging = false;
		if (this.selectedElementBorder !== null && this.selectedElementBorder !== undefined) {
			deletePrivateElementWithUuId(this.selectedElementBorder.uuid);
		}
		this.selectedElementBorder = null;
	}

	handleMouseUp(e) {
		this.relativeElementClickPosition = null;
		this.isDragging = false;
	}

	handleMouseOut() {
	}

	handleMouseDown(e) {
		const point = new Point(e.x, e.y);

		if (this.selectedElement !== null) {
			const relativePoint = Utilities.getRelativePointToElement(point, this.selectedElement);
			const {topLeft, bottomRight} = Utilities.getCorners(this.selectedElement, 20);
			if (Utilities.isPointBetweenSquare(topLeft, bottomRight, relativePoint)) {
				this.isDragging = true;
				this.relativeElementClickPosition = relativePoint;
				return;
			}
		}


		const element = Utilities.getElementWithPoint(point, 10);
		if (element === null) {
			this.setDefaultStats();
		} else {
			this.selectedElement = element;
			this.isDragging = true;
			this.relativeElementClickPosition = Utilities.getRelativePointToElement(point, this.selectedElement);

			this.updateSelectedElementBorder();
		}
	}

	handleMove(e) {
		if (this.isDragging === false) {
			return;
		}
		const point = Utilities.getRelativePointToElement(new Point(e.x, e.y), this.selectedElement);

		const deltaPoint = Utilities.getDeltaPoint(point, this.relativeElementClickPosition);
		this.selectedElement.basePoint = Utilities.movePointWhitDeltaPoint(this.selectedElement.basePoint, deltaPoint);
		this.updateSelectedElementBorder();
	}

	updateSelectedElementBorder() {
		if (this.selectedElement === null) {
			return;
		}
		if (this.selectedElementBorder === null) {
			this.selectedElementBorder = new Element('#7574ff', 2);
			privateElements.push(this.selectedElementBorder);
		}
		const {topLeft, topRight, bottomRight, bottomLeft} = Utilities.getCorners(this.selectedElement, 20);
		console.log(topLeft, topRight, bottomRight, bottomLeft);
		this.selectedElementBorder.basePoint = this.selectedElement.basePoint;
		this.selectedElementBorder.lines = [
			new Line(topLeft, topRight),
			new Line(topRight, bottomRight),
			new Line(bottomRight, bottomLeft),
			new Line(bottomLeft, topLeft)
		];
	}
}