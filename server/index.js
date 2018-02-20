'use strict';

const restify = require('restify');
const url = require('url');
const uuidV4 = require('uuid/v4');
const WebSocketServer = require('websocket').server;
const http = require('http');


const SERVER_PORT = 8080;
const WEBSOCKET_SERVER_PROTOCOL = 'fancy-painter-protocol';

const users = [];
const elements = [];

const server = http.createServer(function (request, response) {
});

server.listen(SERVER_PORT, function () {
	console.log((new Date()) + ' Server is listening on port 8080');
});

const wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false
});


function originIsAllowed(origin) {
	// allow all origins for testing
	return true;
}

wsServer.on('request', function (request) {
	if (!originIsAllowed(request.origin)) {
		// Make sure we only accept requests from an allowed origin
		request.reject();
		console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
		return;
	}
	if (request.requestedProtocols.indexOf(WEBSOCKET_SERVER_PROTOCOL) === -1) {
		// Make sure we only accept requests from an allowed origin
		request.reject();
		console.log((new Date()) + ' Connection rejected wrong protocol: ' + request.requestedProtocols);
		return;
	}


	const connection = request.accept(WEBSOCKET_SERVER_PROTOCOL, request.origin);
	const uuid = uuidV4();
	const user = {
		connection: connection,
		uuid: uuid
	};
	users.push(user);
	console.log((new Date()) + ' Connection accepted for user: ' + uuid + ' with address ' + connection.remoteAddress);
	send(connection, {
		type: 'INITIAL',
		uuid: uuid,
		elements: elements
	});

	connection.on('message', function (message) {
		if (message.type === 'utf8') {
			const data = JSON.parse(message.utf8Data);
			switch (data.type) {
				case 'ADD':
					elements.push(data.element);
					sendToOthers(connection, {
						type: 'ADD',
						element: data.element
					});
					break;
				case 'CHANGE':
					for (let i = 0; i < elements.length; i++) {
						if (elements[i].uuid === data.element.uuid) {
							elements[i] = data.element;
							elements.push(data.element);
							sendToOthers(connection, {
								type: 'CHANGE',
								element: data.element
							});
							return;
						}
					}

			}
			// connection.sendUTF(message.utf8Data + 'dida');
		}
	});

	connection.on('close', function (reasonCode, description) {
		users.splice(users.indexOf(user), 1);
		console.log((new Date()) + ' User: ' + uuid + ' disconnected.');
	});
});


function send(conn, obj) {
	conn.sendUTF(JSON.stringify(obj));
}

function sendToOthers(conn, obj) {
	for (const user of users) {
		if (user.connection !== conn) {
			send(user.connection, obj);
		} else {
			console.log('same');
		}
	}
}
