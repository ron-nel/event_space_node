const express = require('express');
const router = express.Router();
const roomController = require('../../controllers/RoomController');
const { ROLES_LIST } = require('../../config/constants');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
	.get(roomController.GetAll)
	.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Employee, ROLES_LIST.Partner), roomController.Create)
	.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Employee, ROLES_LIST.Partner), roomController.Update)
	.delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Employee, ROLES_LIST.Partner), roomController.Delete);

router.route('/:id')
	.get(roomController.Get);

module.exports = router;