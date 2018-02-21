'use strict';
import {ctx, beginPath, moveTo, lineTo, setFillStyle, setGlobalAlpha, fill, setLineCap, setLineJoin, setLineWidth, setStrokeStyle, stroke} from '../canvas/canvas.js';

export function basicRenderer(element) {
	if (element.lines.length === 0) {
		return;
	}

	// draw background
	if (element.fillColor !== null) {
		beginPath();
		moveTo(element.lines[0].pointA.x + element.basePoint.x, element.lines[0].pointA.y + element.basePoint.y);
		for (const line of element.lines) {
			lineTo(line.pointB.x + element.basePoint.x, line.pointB.y + element.basePoint.y);
		}

		setFillStyle(element.fillColor);
		setGlobalAlpha(element.fillColorAlpha);
		fill();
	}

	// draw line
	if (element.color !== null) {
		beginPath();
		moveTo(element.lines[0].pointA.x + element.basePoint.x, element.lines[0].pointA.y + element.basePoint.y);
		for (const line of element.lines) {
			lineTo(line.pointB.x + element.basePoint.x, line.pointB.y + element.basePoint.y);
		}

		setLineCap('round');
		setLineJoin('round');
		setStrokeStyle(element.color);
		setLineWidth(element.width);
		setGlobalAlpha(element.colorAlpha);
		stroke();
	}

	// draw border
	if (element.borderColor !== null) {
		console.error('you need to implement draw border :( i am to lazzy');
	}
}
