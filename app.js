const express = require('express');
var mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');






var pool = mysql.createPool({
	host	: process.env.DB_HOST || 'localhost',
	user	: process.env.DB_USERNAME || 'root',
	password: process.env.DB_PASSWORD ||'root',
	database: process.env.DB_DATABASE ||'wingman'
});


console.log(pool.host);

var path = require('path');

app.use(express.static(__dirname + '/Public')); // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

//Frontend route

app.get('/', function(req, res) {

   res.sendFile(path.resolve('Public/home-page.html'));
 
 });

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


app.post('/kens-third-route', function(req,res){

	var ID = req.body.ID
	var Name = req.body.Name
	var Phone = req.body.Phone
	var Address = req.body.Street_Address
	var Zip_Code = req.body.Zip_Code
	var Hours = req.body.Hours
	var Website = req.body.Website
	var Image_URL = req.body.Image_URL



	pool.getConnection(function(err,connection) {
	
		var sqlQuery = "INSERT INTO WING_SPOTS (Name, Phone, Street_Address, Zip_Code, Hours, Website, Image_URL) VALUES('"+Name+"', '"+Phone+"', '"+Address+"', '"+Zip_Code+"', '"+Hours+"', '"+Website+"', '"+Image_URL+"');"
		console.log(sqlQuery);
		// use the connection
		connection.query(sqlQuery, function (error, results, fields) {

			connection.release();

			if(!error) {
				console.log("IS THERE A SUCCESS?", results)
			  res.json(results);

			}else{
				console.log("ERROR: ", error)
			}


		});

	});


});

var port = process.env.PORT || 3000;

app.listen(port, function(){ console.log('Example app listening on port 3000!')})