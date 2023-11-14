const User = require('../models/user');
const bcrypt = require('bcrypt');
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
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
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
            return res.status(404).json({
                error: 'User does not exist'
            })
        }
        
        const validPassword = await bcrypt.compare(password,user.password)
        if (!validPassword) {
            return res.status(401).json({
                error: 'Inavlid password'
            });
        }

        res.status(200).json({
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
