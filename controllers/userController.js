var { getUsers, addUser, loginUser, deleteUser } = require('../services/userServices')
module.exports = function userContoller() {

    // Get users from database
    this.getUsers = (req, res) => {
        getUsers(req.body).then(result => {
            res.status(200).send({
                success: result.success,
                message: result.message,
                data: result.data || null
            })
        }).catch(error => {
            res.send({
                success: false,
                message: "could load user",
                data: error
            })
        })
    }

    //Add user to database
    this.addUser = (req, res) => {
        addUser(req.body)
            .then(result => {
                if (result.success) {
                    res.redirect(`/api/home?t=${result.data}&user=${result.user}`)
                } else {
                    res.status(200).send({
                        success: result.success,
                        message: result.message,
                        data: result.data || null
                    })
                }
            }).catch(error => {
                res.send({
                    success: false,
                    message: "could not not user",
                    data: error
                })
            })
    }

    //Authenticate user
    this.loginUser = (req, res) => {
        loginUser(req.body)
        .then(result => {
            if (result.success) {
                res.redirect(`/api/home?t=${result.data}&user=${result.user}`)
            } else {
                res.status(200).send({
                    success: result.success,
                    message: result.message,
                    data: result.data || null
                })
            }
        }).catch(error => {
            res.send({
                success: false,
                message: "Cannot login user",
                data: error
            })
        })
    }

    this.deleteUser = (req, res) => {
        deleteUser(req.body).then(result => {
            res.status(200).send({
                success: result.success,
                message: result.message,
                data: result.data || null
            })
        }).catch(error => {
            res.status(300).send({
                success: false,
                message: "could not not user",
                data: error
            })
        })
    }
}