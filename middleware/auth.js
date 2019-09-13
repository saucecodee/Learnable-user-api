const jwt = require('jsonwebtoken');

const userModel = require('../models/users');

async function authorize(req,res,next){
     const decoded = jwt.verify(req.body.token, 'sauce');
     const user = await userModel.findOne({ email: decoded.email });
     if (user && user.isAdmin == true) {
          req.user = decoded;
          next()
         
     } else {
          console.log("Unauthorized user")
          return {
              success: false,
              message: "Unauthorized user",
              data: user
          };
      }
  
}

module.exports = {
     authorize
}