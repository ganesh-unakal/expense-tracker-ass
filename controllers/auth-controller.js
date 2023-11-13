const User = require('../models/user');
const bcrypt = require('bcrypt');
const path = require('path');

// function generateAccessToken(id, email) {
//     return jwt.sign({ userId: id, email: email }, process.env.TOKEN);
//   }

exports.getLoginPage = (req,res) => {
    response.sendFile(path.join(__dirname,'../','public','views','login.html'))
}

exports.postUserSignUp = async(req,res) => {
    console.log(req.body)
    try{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    await User.findOne({ where : {email : email} })
    .then((user) => {
        if(user) {
            res.status(405).send(
                `<script>alert('this email is already taken. Please choose another one.');window.location.href='/'</script>`
            )
        } else {
            bcrypt.hash(password,8,async (err, hash) => {
                await User.create({
                    name : name,
                    email : email,
                    password : hash,
                });
            });
            res.status(200)
                .send(`<script>alert('User created Successfully')</script>`);
        }
    }).catch((err) => console.log(err));
    } catch (error) {
        console.log(error)
    }
};

exports.postUserLogin = async (req, res, next) => {
    console.log(req.body)
    try {
      const email = req.body.loginEmail;
      const password = req.body.loginPassword;
  
      await User.findOne({ where: { email: email } }).then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ success: false, message: "Something went Wrong!" });
            }
            if (result == true) {
              return res.status(200).json({
                success: true,
                message: "Login Successful!",
                // token: generateAccessToken(user.id, user.email),
              });
            } else {
              return res.status(401).json({
                success: false,
                message: "Password Incorrect!",
              });
            }
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "User doesn't Exists!",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };