## Modules: 
1. Automated attendance- mag oopen ng hotspot connection yung teacher then coconnect students then marerecord na attendance nila after 15 mins sino man mag connect considered late
2.quizzes:
Nag cecreate ng quizzes teacher ng quiz multiple choice muna massyadong lalaki scope pag dadamihan. Then once ipublish ni teacher makikita ng mga students sa quiz module nila. Timed sya per question and 1 question per screen to prevent cheating.
3. Lectures
Teacher can upload lectures then every lecture gagawa si teacher ng assessment question pag pasado student sa assessment pwede na nya iaccess next lecture.
4. Recitation and questions
Teacher will open the module and connected students may ask questions anonymously.
5 reports(only for teacher)
Export to excel ng records nila(attendance, scores)
All of this within the classroom lang so they need to connect to the teacher to access the modules.

## Modules Done

- Students CRUD with login
- full database backup and restore

## Api

### Students
- `POST.  /students` - Create student details
- `GET    /students` - Get list of students
- `GET    /students/<student_id>` - Get student info
- `PUT    /student/<student_id>` - Update student info
- `DELETE /student/<student_id>` - Delete student

### Grades
- `POST   /students/<student_id>/grades` - Add/Edit grades for student
- `DELETE /students/<student_id>/grades` - Clear grades
- `GET    /students/<student_id>/grades` - Get grades for student


### Backup and Restore
- `GET /database/sync` - Sync local datastore with remote
- `GET /database/backup` - Start backup
- `GET /database/restore/<restore_point_id>` - Restore databse state from this restore point
- `GET /database/restore-points` - Get restore points