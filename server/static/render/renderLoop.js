'use strict';
import {clearCanvas} from '../canvas/canvas.js';
import {basicRenderer} from './basicRenderer.js';

let lastMs = 0;
function drawLoop(ms) {

	console.log(Math.round((1000 - (ms - lastMs)) * (60 / 1000)));
	lastMs = ms;
	clearCanvas();
	for (const element of elements) {
		renderElement(element);
	}
	for (const privateElement of privateElements) {
		renderElement(privateElement);
	}
	requestAnimationFrame(drawLoop);
}

function renderElement(element) {
	switch (element.type) {
		case 'basic':
			basicRenderer(element);
			break;
	}
}

// Start things off
export function startLoop() {
	requestAnimationFrame(drawLoop);
}
