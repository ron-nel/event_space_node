const express = require("express");
const regRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../models/User");

regRouter.post("/register", (req, res)=>{
	let name = req.body.name;
	let email = req.body.email;
	let password = req.body.password;
	let role = req.body.role;

	if (!email||!password) {
		return res.status(500).json({
			"error": "incomplete"
		})
	}

	UserModel.find({"email":email})
		.then(function(user, err){
			if (err) {
				return res.status(500).json({
					"error": "An error occured"
				})
			}

			if (user.length > 0) {
				return res.status(500).json({
					"error": "User already exists"
				})
			}

			bcrypt.genSalt(10, function(err, salt){
				bcrypt.hash(password, salt, null, function(err, hash){
					let newUser = UserModel({
						"name": req.body.name,
						"role": req.body.role,
						"email": req.body.email,
						"password": hash
					});

					newUser.save(function(err){
						if (!err) {
							const token = jwt.sign(newUser.toJSON(), "victoriasecret", {expiresIn:"300m"});
							return res.json({
								"message": "User Registered Successfully",
								"data": newUser,
								"token": token
							})
						}
					})
				})
			})
		})
})

module.exports = regRouter;