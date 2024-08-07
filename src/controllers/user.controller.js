//src/controllers/user.controller.js

const User = require('../models/user');
const Subscription = require('../models/subscription');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { username, avatar, first_name, second_name } = req.body;
    try {
        const user = await User.create({ username, avatar, first_name, second_name });
        const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' }); // Token generatsiyasi
        return res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        return res.status(500).json({ error: 'Error during registration' });
    }
};

const loginUser = async (req, res) => {
    const { username, first_name } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user && user.first_name === first_name) {
            const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' }); // Token generatsiyasi
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'Invalid username or first_name' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error during login' });
    }
};

const getUserProfile = async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const user = await User.findByPk(userId);
        if (user) {
            return res.json({ user });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error getting user profile' });
    }
};

const updateUserProfile = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { username, first_name, second_name, description } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.update({ username, first_name, second_name, description });
            return res.json({ message: 'User profile updated successfully', user });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error updating user profile' });
    }
};

const deleteUserAndUnsubscribe = async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const deletedUser = await User.findByPk(userId);
        if (deletedUser) {
            await deletedUser.destroy();
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
        await Subscription.destroy({ where: { user_id: userId } });

        return res.json({ message: 'User deleted and unsubscribed successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Error deleting user and unsubscribing' });
    }
};

module.exports = {
    createUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUserAndUnsubscribe,
};
