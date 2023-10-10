const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
	roomName: String,
	roomPrice: String,
	roomLocation: String,
	roomImage: String,
	roomCapacity: String,
	roomReception: String,
	roomBanquet: String,
	roomClassroom: String,
	roomDimension: String,
	roomArea: String,
	roomCeiling: String,
	roomAddons: String,
	roomSpeaker: String
});

module.exports = mongoose.model("Room", RoomSchema);