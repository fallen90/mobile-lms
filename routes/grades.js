const api = require('express').Router();
const { grades, students } = require('../lib/database');


api.get('/student/:id/grades', (req, res) => {
    const student_id = req.params.id;
    const _ifExists = studends.getById(student_id).size().value();

    if (_ifExists) {
    	const data = Object.assign(req.body || {}, { student_id });
		//add grades to user
		grades.push(data).write();
    } else {
    	return res.status(400).json({
    		status : 'error',
    		message : 'student not found'
    	});
    }
});


module.exports = api;