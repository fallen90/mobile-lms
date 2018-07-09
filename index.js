const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { login, students, grades, database } = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use(login);
app.use(students);
app.use(grades);
app.use(database);

if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log('[request>]',`${req.method} ${req.url} ${res.statusCode} ${(req.body) ? JSON.stringify(req.body) : ''}`)		
        next();
    });
}

app.listen(8080, err => {
    if (!err) console.log('Server started http://0.0.0.0:8080');
});