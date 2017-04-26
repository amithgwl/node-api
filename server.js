var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var app = express();

var schemaName = new Schema({
	name: String,
	address: String,
	description: String,
	category: String
}, {
		collection: 'product'
	});

var Model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://admin:justpass@ds149040.mlab.com:49040/publishadds');


app.get('/find', cors(), function (req, res) {

	//{'_id':'58e0e21af36d2878e036d74e'},
	// console.log("id=" + req.param('name'))
	Model.find(function (err, result) {
		if (err) throw err;
		if (result) {
			res.json(result)
		} else {
			res.send(JSON.stringify({
				error: 'Error'
			}))
		}
	})
})


app.get('/getDetails', cors(), function (req, res) {

	//{'_id':'58e0e21af36d2878e036d74e'},
	// console.log("id=" + req.param('id'))
	Model.find({ '_id': req.param('id') }, function (err, result) {
		if (err) throw err;
		if (result) {
			res.json(result)
		} else {
			res.send(JSON.stringify({
				error: 'Error'
			}))
		}
	})
})



app.post('/save', cors(), function (req, res) {
	Model.create({ name: req.param('name'), address: req.param('address'), description: req.param('description'), category: req.param('category') }, function (err, result) {
		if (err) throw err;
		if (result) {
			res.json(result)
		} else {
			res.send(JSON.stringify({
				error: 'Error'
			}))
		}
	})
})

app.delete('/deleteProduct', cors(), function (req, res) {
	Model.remove({ _id: req.param('id') }, function (err, result) {
		if (result) {
			res.json(result)
		}
		else {
			res.send(JSON.stringify({
				error: 'Error'
			}))
		}
	});
})


var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('Node.js listening on port ' + port);
});


app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});