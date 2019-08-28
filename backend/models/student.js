
const {
    studentModel
} = require('./../database.config/index');

const addStudent = async (studentData) => {
    let result = await studentModel.create(studentData);
    return result;
}

const getStudentById = async (studentId) => {
    let result = await studentModel.findOne({
        where: {
            s_id: studentId
        }
    });
    return result;
}

const getStudentByEmail = async (email) => {
    let result = await studentModel.findOne({
        where: {
            s_email: email
        }
    });
    return result;
}

const getStudents = async () => {
    let result = await studentModel.findAll({
    });
    return result;
}


const updateStudent = async (studentId , studentData) => {
    let result = await studentModel.update(
        studentData,
        {
        where : {
            s_id : studentId
        }
    });
    return result;
}
const removeStudent = async (studentId) => {
    let result = await studentModel.destroy(
        {
        where : {
            s_id : studentId
        }
    });
    return result;
}



module.exports = {
  removeStudent,
  addStudent,
  updateStudent,
  getStudentById,
  getStudents,
  getStudentByEmail
}