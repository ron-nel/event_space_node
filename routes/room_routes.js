const express = require("express");
const roomRouter = express.Router();
const RoomModel = require("../models/Room");

roomRouter.post("/addRoom", function(req, res){
	let newRoom = RoomModel({
		"roomName": req.body.roomName,
		"roomPrice": req.body.roomPrice,
		"roomImage": req.body.roomImage,
		"roomLocation": req.body.roomLocation,
		"roomCapacity": req.body.roomCapacity,
		"roomReception": req.body.roomReception,
		"roomBanquet": req.body.roomBanquet,
		"roomClassroom": req.body.roomClassroom,
		"roomDimension": req.body.roomDimension,
		"roomArea": req.body.roomArea,
		"roomCeiling": req.body.roomCeiling,
		"roomAddons": req.body.roomAddons,
		"roomSpeaker": req.body.roomSpeaker,
		"roomStatus": req.body.roomStatus
	});

	newRoom.save(function (err, post){
		if(!err){
			return res.json({
				"post":post
			});
		} else {
			return res.send(err);
		}
	});
});

roomRouter.get("/showRooms", function(req, res){
	RoomModel.find({}).then(function(result){
		return res.json({"result":result})
	});
});

roomRouter.get("/showRoomById/:id", function (req, res){
	RoomModel.find({"_id":req.params.id}, function(err, result){
		if(!err){
			return res.json({"result":result})
	} else {
		return res.send(err);
		}
	});
});

roomRouter.delete("/deleteRoom/:id", function(req, res){
	let $id =req.params.id;

	RoomModel.findByIdAndRemove($id, function(err, result){
		if(!err){
			return res.json({"result":result})
		} else {
			return res.send(err);
		}
	});
});

roomRouter.put("/updateRoom/:id", function(req, res){
	RoomModel.updateOne({"_id":req.params.id}, req.body).then(function(result, err){
		if(!err){
			return res.json({"result":result})
		} else {
			return res.send("No post to update");
		}
	});
});

module.exports = roomRouter;