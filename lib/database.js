const lodashId = require('lodash-id');
const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(process.cwd(), 'data', 'db.json'));
const db = low(adapter);

db._.mixin(lodashId);

db._.mixin({
  findOne: function(collection) {
    return collection[0]
  }
});

db.defaults({
	attendance : [],
	students : [],
	grades : [],
 	teachers : [],
  	files : [],
  	quizzes : []
}).write();

const students = db.defaults({ students : [] }).get('students');
const attendance = db.defaults({ attendance : [] }).get('attendance');
const grades = db.defaults({ grades : [] }).get('grades');
const files = db.defaults({ files : [] }).get('files');
const teachers = db.defaults({ teachers : [] }).get('teachers');
const quizzes = db.defaults({ quizzes : [] }).get('quizzes');

module.exports = {
	db, students, attendance, grades, files, teachers, quizzes
};
