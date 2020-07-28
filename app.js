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
const [loginRouter, adminRouter, userRouter, classRouter, questionRouter, categoryRouter ] = [
    require('./routers/login.router'),
    require('./routers/admin.router'),
    require('./routers/user.router'),
    require('./routers/class.router'),
    require('./routers/question.router'),
    require('./routers/category.router')];
require('./config/passport')(passport);
app.use(cors());
app.use( require('../config/header.js') );
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxage: process.env.COOKIE_MAXAGE
    },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

connectDB(mongoose, process.env.MONGODB_CONNECTION);

app.use('/', loginRouter);
app.use('/admin/', adminRouter);
app.use('/admin/user', userRouter);
app.use('/admin/question', questionRouter);
app.use('/admin/class', classRouter);
app.use('/admin/category', categoryRouter);

app.listen(port, (error) => {
    error
        ? console.log('Error : ' + error)
        : console.log("Your app running on port " + port)
});