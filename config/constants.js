exports.HTTP_CODES = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
}

exports.ROLES_LIST = {
    "Client": 501,
    "Partner": 502,
    "Employee": 601,
    "Admin": 700
}

exports.ALLOWED_ORIGINS = [
    'https://www.eventspace.com',
    'http://127.0.0.1:5000',
    'http://localhost:3000',
];

exports.SCHEDULE_STATUS = {
    RESERVED: 1,
    CANCELLED: 2,
    COMPLETED: 3,
}