const Sequelize = require('sequelize');
const userClass = require('./user.model');
const studentClass = require('./student.model');
require('dotenv').config();


// Connection with the Database.

const sequelize = new Sequelize("node_demo", "postgres", "argusadmin", {
    host: "localhost",
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    },
    dialectOptions: {
        useUTC: false, // for reading from database
    },
    timezone: '+05:30'
});

sequelize.sync({ force: false })
    .then(() => {

    });

const userModel = userClass(sequelize, Sequelize);
const studentModel = studentClass(sequelize, Sequelize);

module.exports = {
    userModel,
    studentModel
}