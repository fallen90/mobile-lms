const Router = require('express').Router;
const AuthUtils = require('../lib/authUtils');
const { students } = require('../lib/database');
const api = Router();

api.post('/student/login', (req, res) => {
	const authToken = AuthUtils.createSession((new Date).toISOString());
	const { username, password } = (req.body) ? req.body : {};
	const exists = students.find({ username, password }).size().value();
	console.log(exists);
	if(exists){
		students.find({ username, password })
		return res.status(200).json({
			status : 'success',
			message : 'Logged In',
			access_token : authToken
		});
	} else {
		return res.status(400).json({
			status : 'error',
			message : 'Username or Password incorrect.'
		});
	}
});

module.exports = api;