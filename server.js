var http = require('http');
var port = 3000;
var messages = [
	{ message: "I'm not telling" },
	{ message: "Adorbs!!" }
];

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
			messages.push(JSON.parse(postData));
			console.log(messages);
		});
		response.writeHead(200, {
			'Connection': 'close'
		});
		response.end("Push succesful!");
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


