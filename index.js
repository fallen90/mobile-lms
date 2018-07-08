const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { login, student } = require('./routes'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use(login);
app.use(student);

app.listen(8080, err => {
	if(!err) console.log('Server started 0.0.0.0', 8080);
});