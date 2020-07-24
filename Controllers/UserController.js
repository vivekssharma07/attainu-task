const bcrypt = require('bcrypt');
const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const smsClient = require("../Config/smsClient");

/**
 * Register New user
 */
const RegisterUser = (req, res) => {

   try {
      const { first_name, last_name, email, password, confirm_password } = req.body;
      UserModel.findOne({ email: req.body.email })
         .then(user => {
            if (user) {
               res.send(500, { status: false, message: "Email already exists" });
            } else {

               const newUser = new UserModel({
                  first_name,
                  last_name,
                  email,
                  password,
                  confirm_password
               });
               bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                     if (err) {
                        res.send(500, { status: false, message: "Error", data: err });
                     }

                     newUser.password = hash;
                     newUser.confirm_password = hash;
                     newUser.save()
                        .then(user => {
                           res.send(200, { status: true, message: "Success", data: user });
                        })
                        .catch(err => console.log(err))
                  })
               });
            }
         });

   } catch (e) {
      console.log("Error ", e)
      res.send(500, { status: false, message: "Something went to wrong", error: e });
   }

}

/*
*  Login validation for the users
*/
const LoginUser = (req, res) => {
   UserModel.findOne({ email: req.body.email }).exec()
      .then(function (user) {
         bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err) {
               return res.status(401).json({
                  status: false,
                  failed: 'Unauthorized Access'
               });
            }
            if (result) {
               const JWTToken = jwt.sign({
                  email: user.email,
                  _id: user._id
               },
                  'secret',
                  {
                     expiresIn: '2h'
                  });
               return res.status(200).json({
                  success: true,
                  token: JWTToken,
                  id: user._id
               });
            }
            return res.status(401).json({
               status: false,
               failed: 'Unauthorized Access'
            });
         });
      })
      .catch(error => {
         res.send(500, { status: false, message: "Something went to wrong", error: error });
      });;
}

/**
 * Send SMS via text local
 */
const sendSMS = (req, res) => {
   try {
      smsClient.sendTextSMS(req.body, (err, result) => {
         if (err) {
            return res.send(err)
         } 
         res.send(200, { status: true, message: "Success", data: result });
      });
   } catch (err) {
      res.send(500, { status: false, message: "Something went to wrong", error: err });
   }
}

const LogoutUser = (req, res) => {
   req.logout();
   res.redirect('/')
}
module.exports = {
   RegisterUser,
   LoginUser,
   LogoutUser,
   sendSMS
}