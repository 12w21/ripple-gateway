var express = require('express');
var nconf = require('./config/nconf.js');
var fs = require('fs');
var https = require('https');
var http = require('http');

var SequelizeAdapter = require(nconf.get('RIPPLE_DATAMODEL_ADAPTER'));
var GatewayExpress = require(nconf.get('RIPPLE_EXPRESS_GATEWAY'));
var passport = require('./config/passport.js');
var adapter = new SequelizeAdapter();

app = new GatewayExpress(express(), passport, adapter);

if (nconf.get('SSL')) {
  app = https.createServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt')
  }, app);
}

app.listen(nconf.get('PORT'), nconf.get('HOST'));

console.log('Serving '+ (nconf.get('SSL') ? 'HTTPS' : 'HTTP') +' on', (nconf.get('HOST') || 'localhost')+":"+nconf.get('PORT'));
