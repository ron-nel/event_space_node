const { ALLOWED_ORIGINS } = require('./constants');

const corsOptions = {
    origin: (origin, callback) => {
        (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) ? callback(null, true) : callback(new Error('Not alowed by CORS')) ;
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;