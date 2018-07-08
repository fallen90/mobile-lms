const api = require('express').Router();
const { grades, students } = require('../lib/database');


api.post('/students/:id/grades', (req, res) => {
    const student_id = req.params.id;
    const _ifExists = students.getById(student_id).size().value();

    if (_ifExists) {
    	const data = Object.assign(req.body || {}, { student_id });
		//add grades to user
		const result = grades.push(data).write();
		return res.status(201).json({
    		status : 'success',
    		message : 'grades posted',
    		data
    	});
    } else {
    	return res.status(400).json({
    		status : 'error',
    		message : 'student not found'
    	});
    }
});


module.exports = api;