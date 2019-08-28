const router = require('express').Router();
const studentController = require('./../controller/student.controller');

router.post('/add-student', studentController.addStudent);
router.get('/students', studentController.getAllStudents);
router.get('/studentById', studentController.getStudentById);
router.put('/student-update', studentController.updateStudent);
router.delete('/student-detele', studentController.deleteStudent);


module.exports = router;