
require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.send("hello I am a deployed express App!");
});

// need to remove this line when deploying
// app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;
