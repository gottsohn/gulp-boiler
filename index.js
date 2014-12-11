global._ = require('lodash');
global.t = require('moment');
var firebaseRef = require('./firebaseRef');
var bodyParser = require('body-parser');
function run(appdir) {
	var express = require('express');
	var app = express();

	app.dir = process.cwd();
	app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(bodyParser.json());
	// things to do on each request
	
	app.use(function (req, res, next) {
		// tell the client what firebase to use
		if(process.env.NODE_ENV === 'production') {
		  res.cookie('rootRef', firebaseRef.prod);
		}
		else {
			// development mode
			res.cookie('rootRef', firebaseRef.dev);
			// log the request
		  console.log(t().format('HH:MM'), req.method , req.hostname + ':'+req.port + '\n' + req.url, req.socket.bytesRead);
		}
	  next();
	});

	// static files
	app.use(express.static(app.dir + '/public'));

	app.get('/*',function(req,res){
		res.sendFile('index.html',{root:'./public/'});
	});
	// Standard error handling
	app.use(function(err, req, res, next){
	  console.error(err.stack);
	  res.status(500).send('Something broke!');
	});

  // Fire up server
	var server = app.listen(process.env.PORT || 5555, function() {
	  console.log('Listening on port %d', server.address().port);
	});
}

run(process.cwd());
