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


exports.signup = async (req, res,) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    let user = await User.findOne({ email: email }).exec();
    // Make sure this account doesn't already exist
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists..! " });
    }
    else {
      // Create and save the user
      client = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
    };
    let newClient = await client.save();
    res.send(newClient);

    // Create a verification token for this user
    var token = new Token({
      _userId: client._id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    // Save the verification token
    await token.save();

    // Send the email
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });

    var mailOptions = {
      from: "no-reply@testapplication.com",
      to: client.email,
      subject: "Account Verification Token",
      text:
        "Hello,\n\n" +
        "Please verify your account by clicking the link: \nhttp://" +
        // req.headers.host +
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
        .send("A verification email has been sent");
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error...." });
  }
};




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ error: 'The email address ' + user + ' is not associated with any account.' });
    } else {
      const isMatched = await customer.compare(password, user.password);
      if (!isMatched) {
        return res
          .status(400)
          .json({ error: 'Incorrect password or Username.' });
      }else{
        return res
          .status(201)
          .json({ msg: 'Log In Successful.' });
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error...." });
  }
};






