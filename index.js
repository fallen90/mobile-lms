const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const busboy = require('connect-busboy'); ;
const { login, students, grades, database, files, quizzes } = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(busboy());

//routes
app.use(login);
app.use(students);
app.use(grades);
app.use(database);
app.use(files);
app.use(quizzes);

if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log('[request>]',`${req.method} ${req.url} ${res.statusCode} ${(req.body) ? JSON.stringify(req.body) : ''}`)
        next();
    });
}

app.use(function (err, req, res, next) {
	if(err){
		console.error(err.stack)
	  	res.status(500).send({
	  		status : 'error',
	  		message : 'Something broke!',
	  		error : err.stack
	  	});
	}
  	next();
});

app.listen(8080, err => {
    if (!err) console.log('Server started http://0.0.0.0:8080');
});
