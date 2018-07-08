const api = require('express').Router();
const { students } = require('../lib/database');
const checkRequired = require('../lib/checkRequired');

api.post('/student/register', (req, res) => {
    const data = req.body;
    const requiredFields = ['email', 'first_name', 'last_name', 'username', 'password'];
    const fieldsRequired = checkRequired(requiredFields, Object.keys(data));
    if (fieldsRequired.length == 0) {
        const _ifExists = students.find({ email: data.email }).value();
        const studentData = students.insert(Object.assign(data, {
            created_at: (new Date()).toISOString(),
            modified_at: (new Date()).toISOString()
        })).write();

        if (!_ifExists) {
            if (studentData) {
                return res.status(201).json({
                    status: 'success',
                    message: 'student registration success',
                    data: studentData
                });
            } else {
                return res.status(400).json({
                    status: 'error',
                    message: 'cant create student.'
                });
            }
        } else {
            return res.status(400).json({
                status: 'error',
                message: 'student already exists with that email'
            });
        }
    } else {
        return res.status(400).json({
            status: 'error',
            message: `${fieldsRequired.join(',')} ${fieldsRequired.length > 1 ? 'are' : 'is'} required.`
        });
    }
});

api.get('/student', (req, res) => {
	const student_data = students.value();
	return res.status(200).json(student_data);
});

api.get('/student/:id', (req, res) => {
	const params = req.params || {};

	if(params.id){
		const student_data = students.getById(params.id).value();

		if(student_data){
			return res.status(200).json(student_data);
		} else {
			return res.status(400).json({
	            status: 'error',
	            message: `student not found`
	        });
		}
	}
});

api.put('/student/:id', (req, res) => {
	const params = req.params || {};
	const body = Object.assign(req.body || {}, { modified_at : (new Date).toISOString() });

	if(params.id){
		const student_data = students.getById(params.id).value();

		if(student_data){
			const data = students
							.find({ id : params.id })
							.assign(body)
							.write();

			return res.status(200).json({
				status : 'success',
				message : 'student updated',
				data : data
			});
		} else {
			return res.status(400).json({
	            status: 'error',
	            message: `student not found`
	        });
		}
	}
});

api.delete('/student/:id', (req, res) => {
	const params = req.params || {};

	if(params.id){
		const d = students.remove({ id : params.id }).write();
		if(d.length >= 1){
			return res.status(200).json({
				status : 'success',
				message : 'student removed'
			});
		} else {
			return res.status(400).json({
				status : 'error',
				message : 'student doesnt exists'
			});
		}
	}
});


module.exports = api;