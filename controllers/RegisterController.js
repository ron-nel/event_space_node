const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
	if (!firstname || !lastname || !email || !password) return res.status(400).json({ "message": "All fields are required" });

    try{
        const duplicate = await User.findOne({ email }).exec();
        if (duplicate) return res.sendStatus(409);

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ firstname, lastname, email, "password": hashedPassword })
        res.status(201).json({'message': `New user created!`})
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

module.exports = { handleNewUser }