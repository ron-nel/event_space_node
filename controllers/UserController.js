const User = require("../models/UserModel");
const { handleLogout } = require('./LogoutController');
const { ROLES_LIST } = require('../config/constants');

const Get = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required.' });
    try {
        const user = await User.findOne({ _id: req.params.id }).exec();
        if (!user) return res.status(204).json({ 'message': 'No user matches the ID.' });
        if (user.id !== req.id || !req.roles.includes(ROLES_LIST.Admin || ROLES_LIST.Employee)) return res.status(204).json({ 'message': 'No user matches the ID.' });
        res.json(user);
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

const GetAll = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found.' });
    res.json(users);
}

const Update = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'ID parameter is required.' });
    try {
        const user = await User.findOne({ _id: req.body.id }).exec();
        if (!user) return res.status(204).json({ 'message': `No user matches the ID ${req.body.id}.` });
        if (user.created_user_id !== req.id || !req.roles.includes(ROLES_LIST.Admin)) return res.status(403).json({ 'message': `Cannot update user.` });
        const result = await user.updateOne(req.body);
        res.json(result);
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

const Delete = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'User ID required.' });
    try {
        const user = await User.findOne({ _id: req.body.id }).exec();
        if (user) {
            if (user.created_user_id !== req.id || !req.roles.includes(ROLES_LIST.Admin)) return res.status(403).json({ 'message': 'Cannot delete user' }) 
            await user.deleteOne();
            if (user.created_user_id === req.id) {
                handleLogout(req, res);
            }
        }
        res.json({ 'message': 'User deleted.' });
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

module.exports = { Get, GetAll, Update, Delete };