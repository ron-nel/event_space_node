const express = require('express');
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const appPassport = require("../passport");

authRouter.post("/login", function(req, res, next){
	passport.authenticate("local", {session:false}, (err, user, info)=>{
		if (err||!user) {
			return res.status(400).json({
				"error":"Please try again",
				"err": err
			})
		}

		req.login(user, {session:false}, (err)=>{
			if (err) {
				res.send(err);
			}

			const token = jwt.sign(user.toJSON(), "victoriasecret", {
				expiresIn:"300min"
			})

			return res.status(200).json({
				"data":{
					"user": user,
					"token": token
				}
			})
		})
	})

	(req, res);

})
authRouter.get("/logout", function(req, res){
	req.logout();
	res.json({
		"status": "logout",
		"message": "Please login again"
	})
})

module.exports = authRouter;