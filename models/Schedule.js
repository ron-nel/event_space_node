const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ScheduleSchema = new Schema({
	roomId: String,
	startDate: String,
	endDate: String,
	userEmail: String,
	roomPrice: Number,
	clientName: String
});

module.exports = mongoose.model("Schedule", ScheduleSchema);