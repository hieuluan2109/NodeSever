const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const port = process.env.PORT || 8000;
const flash = require('connect-flash');
const connectDB = require('./config/connectDB');
require('./config/passport')(passport);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxage: 1000 * 60 * 60 * 24 * 3
    },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

connectDB(mongoose, process.env.MONGODB_CONNECTION);

app.use('/admin', require('./routers/admin_router'));

app.listen(port, (error) => {
    error
        ? console.log('Error : ' + error)
        : console.log("Your app running on port " + port)
});