// var express = require('express')
// var bodyParser = require('body-parser')

// var app = express()

// app.use(function(req, res, next){
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	next();
// })
// app.use(bodyParser())

// var messages = [
// 	{ message: "Message one" },
// 	{ message: "Message two" }
// ]

// app.get('/', function(req, res){
// 	res.json(200, messages)	
// })

// app.post('/', function(req, res){
// 	var message = req.body;
// 	messages.push(message);
// 	res.json(201, messages);
// })

// app.listen(3000, function(){
// 	console.log('Listening...');
// })

var http = require('http');
var util = require('util');
var port = 3000;
var messages = [
	{ message: "I'm not telling", timestamp: getTimeStamp() },
	{ message: "Adorbs!!", timestamp: getTimeStamp() }
];

function getTimeStamp () {
	return new Date();
}

function formMessage (message){
	message.timestamp = getTimeStamp();
	return message;
}

onRequest = function(request, response){
	if(request.method == 'GET'){
		response.writeHead(200, {
			'Connection': 'close',
			'Content-Type': 'application/JSON',
			'Access-Control-Allow-Origin': '*'
		});
		response.end(JSON.stringify(messages));
	}

	if (request.method == 'POST') {
		var postData = '';
		request.on('data', function(chunk) {
			postData += chunk.toString();
		});
		request.on('end', function() {
			console.log("Got POST data:");
			console.log(JSON.parse(postData));
			messages.push(formMessage(JSON.parse(postData)));
			console.log(messages);
			response.writeHead(200, {
				'Connection': 'close',
				'Content-Type': 'application/JSON',
				'Access-Control-Allow-Origin': '*'
			});
			response.end(JSON.stringify(messages));
		});
	}

	if (request.method == 'OPTIONS') {
		response.writeHead(200, {
			'Connection': 'close',
    	'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      });
    response.end("{}");
	}
};

var server = http.createServer(onRequest);
server.listen(port);
console.log("Listening on port: " + port);


