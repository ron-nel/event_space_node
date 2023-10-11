const express = require("express");
const router = express.Router();
const userController = require("../../controllers/UserController");
const { ROLES_LIST } = require('../../config/constants');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
	.get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Employee), userController.GetAll)
	.put(userController.Update)
	.delete(userController.Delete);

router.route('/:id')
	.get(userController.Get);

module.exports = router;