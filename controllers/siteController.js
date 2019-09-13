const path = require('path');

module.exports = function userContoller() {
    this.home = (req, res) => {
        res.status(200).sendFile(path.resolve("public/dashboard.html"))
    }
    this.signin = (req, res) => {
        res.status(200).sendFile(path.resolve("public/signIn.html"))
    }
    this.signup = (req, res) => {
        res.status(200).sendFile(path.resolve("public/signUp.html"))
    }
}