
const {
    userModel
} = require('./../database.config/index');

const addUser = async (userData) => {
    let result = await userModel.create(userData);
    return result;
}

const getUserByEmail = async (email) => {
    let result = await userModel.findOne({
        where: {
            u_email: email
        }
    });
    return result;
}

const getUsers = async () => {
    let result = await userModel.findAll({
    });
    return result;
}

const getUserByRefreshToken = async (token) => {
    let result = await userModel.findOne({
        where : {
            u_refresh_token : token
        }
    });
    return result;
}

const removeRefreshToken = async (token) => {
    let result = await userModel.update(
        {u_refresh_token : null},
        {
        where : {
            u_refresh_token : token
        }
    });
    return result;
}

const addRefreshToken = async (email,token) => {
    let result = await userModel.update(
        {u_refresh_token : token},
        {
        where : {
            u_email : email
        }
    });
    return result;
}


module.exports = {
  getUserByEmail,
  addUser,
  getUsers,
  getUserByRefreshToken,
  removeRefreshToken,
  addRefreshToken
}