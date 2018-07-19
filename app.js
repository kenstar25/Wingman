const express = require('express');
var mysql = require('mysql');
const app = express();






var pool = mysql.createPool({
	host	: 'localhost',
	user	: 'root',
	password: 'root',
	database: 'wingman'
});

var path = require('path');

app.use(express.static(__dirname + '/Public')); // set the static files location /public/img will be /img for users


//Frontend route

app.get('/', function(req, res) {

   res.sendFile(path.resolve('Public/home-page.html'));
 
 })

///////////////////////////////////////////////////////

app.get('/kens-first-route', function(req,res){

	console.log("wings");


	pool.getConnection(function(err,connection) {
		// use the connection
		connection.query('SELECT * FROM WING_SPOTS', function (error, results, fields) {

			connection.release();

			if(!err) {

			  res.json(results);

			}


		});

	});


});

//	console.log(req);
//	console.log('kens first route!! Yippie');
//	res.send('hello world - this is the respone');


app.get('/kens-second-route', function(req,res){

	var searchTerm = req.query.searchfunction

	console.log(searchTerm);


	pool.getConnection(function(err,connection) {

		var sqlQuery = "SELECT * FROM WING_SPOTS WHERE Name LIKE '%"+searchTerm+"%';"
		console.log(sqlQuery);
		// use the connection
		connection.query(sqlQuery, function (error, results, fields) {

			connection.release();

			if(!err) {

			  res.json(results);

			}


		});

	});


});


app.listen(3000, function(){ console.log('Example app listening on port 3000!')})