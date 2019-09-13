const router = require('express').Router();
const userController = require('../controllers/userController');
const {authorize} = require("../middleware/auth")

module.exports = function () {
    const userCtrl = new userController();
    
    //get all users
    router.get('/', userCtrl.getUsers);

    //add user
    router.post('/', userCtrl.addUser);
    
    //login user
    router.post('/login', userCtrl.loginUser);

    // delete user
    router.delete('/', authorize, userCtrl.deleteUser);

    return router;
}