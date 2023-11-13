const User = require('../models/user');
// const bcrypt = require('bcrypt');
const path = require('path');

exports.getLoginPage = (req, res) => {
    response.sendFile(path.join(__dirname, '../', 'public', 'views', 'login.html'))
}

exports.postUserSignUp = async (req, res) => {
    console.log(req.body)

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ where: { email: email } })
        if (user) {
            return res.status(405).json({
                error: 'User already exists',
                user: user
            })
        }
        const newUser = await User.create({
            name: name,
            email: email,
            password: password,
        });

        res.status(200).json({
            user: newUser
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

exports.postUserLogin = async (req, res, next) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        console.log(email, password)
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.status(405).json({
                error: 'User does not exist'
            })
        }
        if (user.password !== password) {
            return res.status(406).json({
                error: 'User not authorized'
            });
        }

        res.status(201).json({
            message: "Login successful",
            user: user
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        })
    }
}
