const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/users');

const getUsers = async function (userData) {
    const users = await userModel.find({})
    return {
        success: true,
        message: "User deleted",
        data: users
    };
}

const addUser = async function (userData) {
    return bcrypt.hash(userData.password, 10)
        .then(async (hash) => {
            const token = jwt.sign({ email: userData.email }, 'sauce');
            const newUser = new userModel({
                email: userData.email,
                password: hash,
                isAdmin: userData.isAdmin ? true : false
            });
            await newUser.save();
            return {
                success: true,
                message: "User added",
                data: token,
                user: userData.email
            }
        }).catch((err) => {
            return {
                success: false,
                message: err,
                data: null
            }
        })
}

const loginUser = async function (userData) {
    const user = await userModel.findOne({ email: userData.email });
    return bcrypt.compare(userData.password, user.password)
        .then(loginMatch => {
            const token = jwt.sign({ email: userData.email }, 'sauce');
            if (loginMatch) {
                return {
                    success: true,
                    message: "Login successful",
                    data: token,
                    user: userData.email
                };
            } else {
                return {
                    success: false,
                    message: "Incorrect email or password",
                    data: null
                };
            }
        }).catch((err) => {
            return {
                success: false,
                message: err,
                data: null
            };
        })
}

const deleteUser = async function (userData) {
  
        const user = await userModel.deleteOne({ email: userData.email })
        return {
            success: true,
            message: "User deleted",
            data: user
        };
    
}


module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;