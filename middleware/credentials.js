const { ALLOWED_ORIGINS } = require('../config/constants');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (ALLOWED_ORIGINS.includes(origin)) res.header('Access-Control-Allow', true);
    next();
}

module.exports = credentials;