const api = require('express').Router();
const { quizzes } = require('../lib/database');

api.post('/createQuiz', (req, res) => {
	const teacher_id = req.query.teacher_id;
	console.log(teacher_id);
	const data = Object.assign(req.body || {}, { teacher_id });

	const inserted = quizzes.insert(data).write();
	
	return res.send({
		status : 'success',
		message : 'Quiz Added',
		data : inserted
	});
});

api.get('/listQuizzes', (req, res) => {
	const teacher_id = req.query.teacher_id;
	const _q = quizzes.filter(item => item.teacher_id == teacher_id).value();
	return res.send(_q);
});

module.exports = api;