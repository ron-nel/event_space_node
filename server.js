require("dotenv").config();
const express = require("express");
const app = express();

const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const { errorHandler } = require("./middleware/errorHandler");
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDb = require("./config/dbConnection");
const PORT = process.env.PORT || 4000;

//databse conection
connectDb();

//custom middleware
app.use(credentials);
app.use(cors(corsOptions));

//built in middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//third party middleware
app.use(cookieParser());

//routes
app.use('/', require('./routes/api/room'))
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/users', require("./routes/api/user"));
app.use('/schedule', require("./routes/api/schedule"));

app.use(errorHandler);

mongoose.connection.once('open', () => {
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})