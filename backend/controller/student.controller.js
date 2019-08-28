

"use strict";
const {
    getStudentById,
    getStudents,
    addStudent,
    removeStudent,
    updateStudent,
    getStudentByEmail
} = require('./../models/student');
const validator = require('../utils/validation');
const {
    studentSchema
} = require('../utils/schemas');

class StudentController {

    static async addStudent(req, res, next) {
        validator(req.body, studentSchema, async function (error, value) {
            if (error) {
                next(error);
            } else {
                const { firstname, lastname, age, email } = req.body;
                const student = await getStudentByEmail(email);
                if (!student) {
                    const studentData = {
                        's_firstname': firstname,
                        's_lastname': lastname,
                        's_age': age,
                        's_email': email
                    };
                    const result = await addStudent(studentData);
                    if (result) {
                        res.json({ 'message': 'student added.' });
                    } else {
                        let error = new Error();
                        error.code = 'SEQFALSEINSERT';
                        next(error);
                    }
                }
                else {
                    let error = new Error();
                    error.code = 'USERALREADYEXISTS';
                    next(error);
                }
            }
        });
    }

    static async updateStudent(req, res, next) {
        validator(req.body, studentSchema, async function (error, value) {
            if (error) {
                next(error);
            } else {
                const { firstname, lastname, age, email } = req.body;
                const studentId = req.query.id;
                console.log(studentId);
                
                const student = await getStudentById(studentId);
                if (student) {
                    const studentData = {
                        's_firstname': firstname,
                        's_lastname': lastname,
                        's_age': age,
                        's_email': email
                    };
                    const result = await updateStudent(studentId, studentData);
                    if (result) {
                        res.json({ 'message': 'student updated.' });
                    } else {
                        let error = new Error();
                        error.code = 'SEQFALSEINSERT';
                        next(error);
                    }
                }
                else {
                    let error = new Error();
                    error.code = 'NORECORD';
                    next(error);
                }
            }
        });
    }

    static async deleteStudent(req, res, next) {
        const studentId = req.query.id;
        const student = await getStudentById(studentId);
        if (student) {
            const result = await removeStudent(studentId);
            if (result) {
                res.json({ 'message': 'student deleted.' });
            } else {
                let error = new Error();
                error.code = 'SEQFALSEINSERT';
                next(error);
            }
        }
        else {
            let error = new Error();
            error.code = 'NORECORD';
            next(error);
        }
    }

    static async getStudentById(req, res, next) {
        const studentId = req.query.id;
        const student = await getStudentById(studentId);
        if (student) {
            res.json({ 'student': student.dataValues });
        }
        else {
            let error = new Error();
            error.code = 'NORECORD';
            next(error);
        }
    }

    static async getAllStudents(req, res, next) {
        
        const student = await getStudents();
        
        if (student.length > 0) {
            res.json({ 'student': student });
        }
        else {
            let error = new Error();
            error.code = 'NORECORD';
            next(error);
        }
    }
}


module.exports = StudentController;