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

app.get('/profs', function(req, res) {

   res.sendFile(path.resolve('Public/prof-table.html'));
 
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


app.post('/kens-second-route', function (req,res){

	console.log('hello world');
	// res.send('hello world - this is the response');

});


app.listen(3000, function(){ console.log('Example app listening on port 3000!')})