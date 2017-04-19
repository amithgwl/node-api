var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var app = express();

var schemaName = new Schema({
	name: String,
	Id: String
}, {
	collection: 'product'
});

var Model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://admin:justpass@ds149040.mlab.com:49040/publishadds');


app.get('/find', cors(), function(req, res) {
	// var query = req.params.query;7

	Model.find({'_id':'58e0e21af36d2878e036d74e'}, function(err, result) {
		if (err) throw err;
		if (result) {
			res.json(result)
		} else {
			res.send(JSON.stringify({
				error : 'Error'
			})) 
		}
	})
})

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Node.js listening on port ' + port);
});