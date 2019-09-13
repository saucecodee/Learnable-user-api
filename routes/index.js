const router = require('express').Router();
const userRoutes = require('./userRoutes');
const siteController = require('../controllers/siteController');
const siteCtrl = new siteController();

module.exports = function () {
    // go to user routes
    router.use('/user', userRoutes())
    
    //go to home
    router.get('/home', siteCtrl.home);

    //go to signin
    router.get('/signin', siteCtrl.signin);
    
    //go to signin
    router.get('/signup', siteCtrl.signup);

    return router;
}