const Schedule = require("../models/ScheduleModel");
const stripe = require("stripe")('sk_test_zSYwRyirefLOuroA3uSp7pNF00BMhHORLF');
const { SCHEDULE_STATUS } = require('../config/constants'); 

const validateCreateData = (req) => {
    if (!req?.body?.startDate) return false;
    if (!req?.body?.endDate) return false;
    if (!req?.body?.roomPrice) return false;
    if (!req?.body?.roomId) return false;
    return true;
}

const Get = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Schedule ID required.' });
    try {
        const room = await Schedule.findOne({ _id: req.params.id }).exec();
        if (!room) return res.status(204).json({ 'message': 'No schedule matches the ID.' });
        res.json(room);
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

const GetAll = async (req, res) => {
    const rooms = await Schedule.find();
    if (!rooms) return res.status(204).json({ 'message': 'No schedule found.' });
    res.json(rooms);
}

const Create = async (req, res) => {
    if (!validateCreateData(req)) {
        return res.status(400).json({ 'message': 'Fields are required' });
    }

    try {
        const result = await Schedule.create({
            "startDate": req.body.startDate,
            "endDate": req.body.endDate,
            "roomPrice": req.body.roomPrice,
            "room_id": req.body.roomId,
            "created_user_id": req.id,
            "status": SCHEDULE_STATUS.RESERVED
        });

        res.status(201).json(result);
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

const Update = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'ID parameter is required.' });
    try {
        const schedule = await Schedule.findOne({ _id: req.body.id }).exec();
        if (!schedule) return res.status(204).json({ 'message': `No schedule matches the ID ${req.body.id}.` });
        if (schedule.created_user_id !== req.id || !req.roles.includes(ROLES_LIST.Admin)) return res.status(403).json({ 'message': `Cannot update schedule.` });
        if (req.body?.status) schedule.status = req.body.status;
        const result = await schedule.save();
        res.json(result);
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

module.exports = { Get, GetAll, Create, Update };