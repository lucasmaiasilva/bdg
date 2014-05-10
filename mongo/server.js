// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb

	// configuration =================

	mongoose.connect('mongodb://localhost/mydb'); 	// connect to mongoDB database on modulus.io

	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
		app.use(express.methodOverride()); 						// simulate DELETE and PUT
	});


	// define model =================
	var Lbs = mongoose.model('Lbs', {

		placa : String,
		id    : Number, 
		lat   : Number,
		lon   : Number
	});


// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/points', function(req, res) {

		// use mongoose to get all todos in the database
		Lbs.find(function(err, points) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(points); // return all todos in JSON format
		});
	});

	app.get('/api/points/:placa',function(req,res){
		if(req.params.placa){
			Lbs.find({placa: req.params.placa}, function(err,points){
				res.json(points);
			});
		}

	});


	// create todo and send back all todos after creation
	app.post('/api/points', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Lbs.create({
			placa : req.body.text,
			done : false
		}, function(err, points) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Lbs.find(function(err, points) {
				if (err)
					res.send(err)
				res.json(points);
			});
		});

	});

	// delete a todo
	app.delete('/api/points/:points_id', function(req, res) {
		Lbs.remove({
			_id : req.params.points_id
		}, function(err, points) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Lbs.find(function(err, points) {
				if (err)
					res.send(err)
				res.json(points);
			});
		});
	});


	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	// listen (start app with node server.js) ======================================
	app.listen(8080);
	console.log("App listening on port 8080");


