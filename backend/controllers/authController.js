const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Provide all the fields" });
        }
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password });
        await user.save();

        const paylaod = {
            name,
            email,
            id: user.id
        };
        const token = jwt.sign(paylaod, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.json({ message: "User Registred Successfully", token: token });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Provide all the fields" });
        }
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const paylaod = {
            name: user.name,
            email,
            id: user.id
        };
        const token = jwt.sign(paylaod, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.json({ message: "Logged in successfully", token: token });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

module.exports = { register, login };