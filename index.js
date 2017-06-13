var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

app
 .use(express.static('public'));

http.createServer(app).listen(3000);
//https.createServer(options, app).listen(443);
