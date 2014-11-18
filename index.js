global._ = require('lodash');
global.t = require('moment');

function run(appdir) {
	var express = require('express');
	var app = express();

	app.dir = process.cwd();

	// things to do on each request
	app.use(function (req, res, next) {
		// tell the client what firebase to use
		if(process.env.NODE_ENV === 'production') {
		  res.cookie('rootRef', "https://matsi1.firebaseio.com/");
		}
		else {
			// development mode
			res.cookie('rootRef', "https://brilliant-heat-9512.firebaseio.com/");
			// log the request
		  console.log(t().format('HH:MM'), req['method'], req.url, req.socket.bytesRead);
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
