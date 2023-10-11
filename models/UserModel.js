const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
	firstname: {
		type: String,
		required: [true, "Firstname is required"]
	},
	lastname: {
		type: String,
		required: [true, "Lastname is required"]
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: [true, "Email address already taken"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	role: {
		Client: {
			type: Number,
			default: 501
		},
		Partner: Number,
		Employee: Number,
		Admin: Number,
	},
	refreshToken: String
}, {
	timestamps: true,
})

module.exports = mongoose.model("User", UserSchema);