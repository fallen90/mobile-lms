const api = require('express').Router();
const { grades, students } = require('../lib/database');

/** Update or Add Grades **/
api.post('/students/:id/grades', (req, res) => {
    const student_id = req.params.id;
    const _ifExists = students.getById(student_id).size().value();

    if (_ifExists) {
    	const data = Object.assign(req.body || {}, { student_id });
    	//check if grades already exists
    	const _ifGradeExists = grades.find({ student_id }).size().value();
		//add grades to user
		const grades_data = (_ifGradeExists) ? grades.findOne({ student_id }).assign(Object.assign(data, { modified_at : (new Date).toISOString() })).write() : grades.insert(Object.assign(data, { created_at : (new Date).toISOString() })).write();
		return res.status(201).json({
    		status : 'success',
    		message : 'grades posted',
    		data : grades_data
    	});
    } else {
    	return res.status(400).json({
    		status : 'error',
    		message : 'student not found'
    	});
    }
});

/** get Grade by student_id **/
api.get('/students/:id/grades', (req, res) => {
    const student_id = req.params.id;
    const _ifExists = students.getById(student_id).size().value();

    if (_ifExists) {
    	const grades_data = grades.findOne({ student_id }).value();
    	return res.status(200).json(Object.assign(grades_data));
    } else {
    	return res.status(400).json({
    		status : 'error',
    		message : 'student not found'
    	});
    }
});

/** clear grades **/
api.delete('/students/:id/grades', (req, res) => {
	const student_id = req.params.id;
    const _ifExists = students.getById(student_id).size().value();

    if (_ifExists) {
    	grades.remove({ student_id }).write();
    	return res.status(200).json({
    		status : 'success',
    		message : 'grade removed'
    	});
    } else {
    	return res.status(400).json({
    		status : 'error',
    		message : 'student not found'
    	});
    }
});

module.exports = api;







