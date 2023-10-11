const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.sendStatus(401); 
    
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.sendStatus(401);

    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundUser.email,
                "roles": roles
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '2min'}
    );

    const refreshToken = jwt.sign({"email": foundUser.email}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d'});

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24*60*60*1000 });
    res.json({ roles, accessToken });
}

module.exports = { handleLogin }