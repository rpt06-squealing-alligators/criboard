var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = 3000;

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.listen(port, function(){console.log(`server is listening on ${port} . . .`)});
