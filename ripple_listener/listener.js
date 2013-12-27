/* Requires ENV configuration:
 
export RIPPLE_ADDRESS
export ZMQ_PUB_SOCKET

*/

var zmq = require('zmq'),
		WebSocket = require('ws'),
		Payment = require('./payment');
var publisher = zmq.socket('push');
var websocketUrl = 'wss://s1.ripple.com';
var rippleAddress = process.env.RIPPLE_ADDRESS;

publisher.bindSync('tcp://127.0.0.1:5252');

function onOpen() {
  console.log('connection opened');
  this.send('{"command":"subscribe","id":0,"accounts":["'+rippleAddress+'"]}');
  console.log('listening for activity for account: '+ rippleAddress);
}

function onMessage(data, flags) {
  var response = JSON.parse(data);
	console.log(response);
  if (response.type == 'transaction') {
		publisher.send(data);
		var payment = new Payment(response);
		console.log(payment);
  }
}

function onClose() {
  console.log('connection closed')
  delete this;
  connectWebsocket(websocketUrl);
}

function connectWebsocket(url) {
  console.log('connecting to '+url);
  try {
    var ws = new WebSocket(url);
    ws.on('open', onOpen);
    ws.on('message', onMessage);
    ws.on('close', onClose);
  } catch(e) {
    console.log('error connecting', e);
    console.log('trying again...');
    connectWebsocket(url);
  }
}

connectWebsocket(websocketUrl);
