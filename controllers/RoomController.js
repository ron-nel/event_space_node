const Room = require("../models/RoomModel");
const { ROLES_LIST } = require('../config/constants');

const validateCreateData = (req) => {
    if (!req?.body?.name) return false;
    if (!req?.body?.price) return false;
    if (!req?.body?.image) return false;
    if (!req?.body?.location) return false;
    if (!req?.body?.capacity) return false;
    if (!req?.body?.reception) return false;
    if (!req?.body?.banquet) return false;
    if (!req?.body?.classroom) return false;
    if (!req?.body?.dimension) return false;
    if (!req?.body?.area) return false;
    if (!req?.body?.ceiling) return false;
    if (!req?.body?.addons) return false;
    if (!req?.body?.speaker) return false;
    if (!req?.body?.status) return false;
    return true;
}

const Get = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Room ID required.' });
    try {
        const room = await Room.findOne({ _id: req.params.id }).exec();
        if (!room) return res.status(204).json({ 'message': 'No room matches the ID.' });
        res.json(room);
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

const GetAll = async (req, res) => {
    const rooms = await Room.find();
    if (!rooms) return res.status(204).json({ 'message': 'No rooms found.' });
    res.json(rooms);
}

const Create = async (req, res) => {
    if (!validateCreateData(req)) {
        return res.status(400).json({ 'message': 'Fields are required' });
    }

    try {
        const result = await Room.create({
            "name": req.body.name,
            "price": req.body.price,
            "image": req.body.image,
            "location": req.body.location,
            "capacity": req.body.capacity,
            "reception": req.body.reception,
            "banquet": req.body.banquet,
            "classroom": req.body.classroom,
            "dimension": req.body.dimension,
            "area": req.body.area,
            "ceiling": req.body.ceiling,
            "addons": req.body.addons,
            "speaker": req.body.speaker,
            "status": req.body.status,
            "created_user_id": req.id
        });

        res.status(201).json(result);
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

const Update = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'ID parameter is required.' });
    try {
        const room = await Room.findOne({ _id: req.body.id }).exec();
        if (!room) return res.status(204).json({ 'message': `No room matches the ID ${req.body.id}.` });
        if (room.created_user_id !== req.id || !req.roles.includes(ROLES_LIST.Admin)) return res.status(403).json({ 'message': `Cannot update room.` });
        const result = await room.updateOne(req.body);
        res.json(result);
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

const Delete = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Room ID required.' });
    try {
        const room = await Room.findOne({ _id: req.body.id }).exec();
        if (room) {
            if (room.created_user_id !== req.id || !req.roles.includes(ROLES_LIST.Admin)) return res.status(403).json({ 'message': 'Cannot delete room' }) 
            await room.deleteOne();
        }
        res.json({ 'message': 'Room deleted.' });
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

module.exports = { Get, GetAll, Create, Update, Delete };