'use strict';
import {ctx} from '../canvas/canvas.js';

export function basicRenderer(element) {
	if (element.lines.length === 0) {
		return;
	}

	// draw background
	if (element.fillColor !== null) {
		ctx.beginPath();
		ctx.moveTo(element.lines[0].pointA.x + element.basePoint.x, element.lines[0].pointA.y + element.basePoint.y);
		for (const line of element.lines) {
			ctx.lineTo(line.pointB.x + element.basePoint.x, line.pointB.y + element.basePoint.y);
		}

		ctx.fillStyle = element.fillColor;
		ctx.globalAlpha = element.fillColorAlpha;
		ctx.fill();
	}

	// draw line
	if (element.color !== null) {
		ctx.beginPath();
		ctx.moveTo(element.lines[0].pointA.x + element.basePoint.x, element.lines[0].pointA.y + element.basePoint.y);
		for (const line of element.lines) {
			ctx.lineTo(line.pointB.x + element.basePoint.x, line.pointB.y + element.basePoint.y);
		}

		ctx.lineJoin = ctx.lineCap = 'round';
		ctx.strokeStyle = element.color;
		ctx.lineWidth = element.width;
		ctx.globalAlpha = element.colorAlpha;
		ctx.stroke();
	}

	// draw border
	if (element.borderColor !== null) {
		console.error('you need to implement draw border :( i am to lazzy');
	}
}
