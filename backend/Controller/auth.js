const User = require('../Models/userModel');
const Token = require('../Models/tokenModel');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const { resolve } = require('path');
const { rejects } = require('assert');


// Account verification via Email
// exports.signup = (req, res) => {
//     console.log(req.body);
//     const {firstName, lastName, email, password} = req.body;
//     User.findOne({email}).exec((err, user) => {
//         if(user) {
//             return res.status(400).json({ error: "User with this email already exists..!"});
//         }
//     })
// }


exports.signup =  (req, res,) => {
  console.log(req.body);
  try {
    const {email,password,firstName,lastName} = req.body;

    let user =  User.findOne({email}).exec().then;

    // Make sure this account doesn't already exist
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists..!" });
    }
    // Create and save the user
    user = new User({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password,
    });
    user.save().then(
      ()=> {
        res.status(201).json({
          message: 'User added successfully!'
        });
      }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
  
      // Create a verification token for this user
      var token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });

      // Save the verification token
      token.save().then(
        ()=> {
          res.status(201).json({
            message: 'Token created successfully!'
          });
        }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );

        // Send the email
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD,
          },
        });
        var mailOptions = {
          from: "no-reply@testapplication.com",
          to: user.email,
          subject: "Account Verification Token",
          text:
            "Hello,\n\n" +
            "Please verify your account by clicking the link: \nhttp://" +
            req.headers.host +
            "/confirmation/" +
            token.token +
            ".\n",
        };
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res
            .status(200)
            .send("A verification email has been sent to " + user.email + ".");
        });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error...." });
  }
};


exports.login = (req, res) => {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account.' });

    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) return res.status(401).send({ msg: 'Invalid email or password' });

      // Make sure the user has been verified
      if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' });

      res.send({ token: generateToken(user), user: user.toJSON() });
    });
  });
};


