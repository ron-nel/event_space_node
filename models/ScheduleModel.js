const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
	startDate: {
		type: String,
		required: true
	},
	endDate: {
		type: String,
		required: true
	},
	roomPrice: {
		type: Number,
		required: true
	},
	room_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Room",
	},
	created_user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	status: {
		type: Number,
		required: true
	},
}, {
	timestamps: true,
});

module.exports = mongoose.model("Schedule", ScheduleSchema);