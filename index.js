const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { login, students, grades } = require('./routes'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use(login);
app.use(students);
app.use(grades);

if(process.env.NODE_ENV !== 'production'){
	app.on('request', (err,res) => {
		console.log(err,res);
	});
}

app.listen(8080, err => {
	if(!err) console.log('Server started http://0.0.0.0:8080');
});