const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const {username, email, password } = req.body;

    try {
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: 'User already exists'});
        }

        user = new User({ username, email, password });

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '5h'},
            (err, token) => {
                if(err) throw err;
                res.json({token});
            },
            console.log("SignUp Successful")
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};


exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({msg: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.send(400).json({msg: "Invalid Credentials"});
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '5h'},
            (err, token) => {
                if(err) throw err;
                res.json({token});
            },
            console.log("Login Successful")
        );
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};