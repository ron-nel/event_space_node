const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please add name"],
	},
	price: {
		type: String,
		required: [true, "Please add price"],
	},
	location: {
		type: String,
		required: [true, "Please add location"],
	},
	image: {
		type: String,
		required: [true, "Please add image"],
	},
	capacity: {
		type: String,
		required: [true, "Please add capacity"],
	},
	reception: {
		type: String,
		required: [true, "Please add reception"],
	},
	banquet: {
		type: String,
		required: [true, "Please add banquet"],
	},
	classroom: {
		type: String,
		required: [true, "Please add classroom"],
	},
	dimension: {
		type: String,
		required: [true, "Please add dimension"],
	},
	area: {
		type: String,
		required: [true, "Please add area"],
	},
	ceiling: {
		type: String,
		required: [true, "Please add ceiling"],
	},
	addons: {
		type: String,
		required: [true, "Please add addons"],
	},
	speaker: {
		type: String,
		required: [true, "Please add speaker"],
	},
	created_user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
}, {
	timestamps: true
});

module.exports = mongoose.model("Room", RoomSchema);