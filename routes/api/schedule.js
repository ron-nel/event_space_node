const express = require('express');
const router = express.Router();
const scheduleController = require('../../controllers/ScheduleController');

router.route('/')
	.get(scheduleController.GetAll)
	.post(scheduleController.Create)
	.put(scheduleController.Update);

router.route('/:id')
	.get(scheduleController.Get);

module.exports = router;