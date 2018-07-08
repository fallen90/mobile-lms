const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { login, students } = require('./routes'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use(login);
app.use(students);

app.listen(8080, err => {
	if(!err) console.log('Server started http://0.0.0.0:8080');
});