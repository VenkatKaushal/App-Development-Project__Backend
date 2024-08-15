const User = require('../models/Users');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
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
            { expiresIn: '5h' },
            (err, token) => {
                if (err) {
                    console.error('Error generating token:', err.message);
                    return res.status(500).send("Server Error");
                }
                res.json({ token });
            }
        );

        console.log("SignUp Successful");
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).send("Server Error");
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        console.log("Stored Password:", user.password);
        if (user.password !== password) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) {
                    console.error('Error generating token:', err.message);
                    return res.status(500).send("Server Error");
                }
                res.json({ token });
            }
        );

        console.log("Login Successful");
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).send("Server Error");
    }
};

exports.ForgetPassword = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email && !username) {
            return res.status(400).json({ message: "Email or username is required." });
        }

        if (!password) {
            return res.status(400).json({ message: 'New Password is required' });
        }

        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        user.password = password;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


