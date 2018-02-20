'use strict';
import {clearCanvas} from '../canvas/canvas.js';
import {basicRenderer} from './basicRenderer.js';


function drawLoop() {
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
