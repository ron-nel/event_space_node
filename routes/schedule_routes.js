const express = require("express");
const scheduleRouter = express.Router();
const ScheduleModel = require("../models/Schedule");
const stripe = require("stripe")('sk_test_zSYwRyirefLOuroA3uSp7pNF00BMhHORLF');

scheduleRouter.post("/reserveRoom", function(req, res){
	let newSchedule = ScheduleModel({
		"roomId": req.body.roomId,
		"startDate": req.body.startDate,
		"endDate": req.body.endDate,
		"roomPrice": req.body.roomPrice,
		"userEmail": req.body.userEmail,
		"clientName": req.body.clientName
	});

	newSchedule.save(function (err, post){
		if(!err){
			return res.json({
				"post":post
			});
		} else {
			return res.send(err);
		}
	});
});


scheduleRouter.get("/availableRooms", function(req, res){
	ScheduleModel.find({}).then(function(result){
		return res.json({"result":result})
	});
});

scheduleRouter.delete("/cancelReservation/:id", function(req, res){
	let $id = req.params.id;
	ScheduleModel.findByIdAndRemove($id, function(err, result){
		if (!err) {
			return res.json({"result":result})
		} else {
			return res.send(err);
		}
	});
});

module.exports = scheduleRouter;