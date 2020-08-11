const localStategy = require('passport-local').Strategy;
const NguoidungSchema = require('../model/nguoidung.schema');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcrypt");

module.exports = function (passport) {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() 
        // || ExtractJWT.fromHeader() || ExtractJWT.fromBodyFiel
         ,
        secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'Monkey D Naruto'
    }, function (token, done) {
        // find the user in db if needed. This functionality may be omitted if you store
        // everything you'll need in JWT payload.
        return NguoidungSchema
            .findOne({ _id: token._id })
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }));
    passport.use(new localStategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async function (email, password, done) {
        await NguoidungSchema
            .findOne({email: email, loai: true})
            .then(user => {
                if (!user) 
                    return done(null, false, {message: 'Email không đúng'})
                if (  bcrypt.compareSync(password, user.mat_khau) ) 
                    return done(null, user) 
                return done(null, false, {message: 'Mật khẩu không đúng'})
            })
    }))
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user, done) => {
        // NguoidungSchema
        //     .findOne({email: user.email})
        //     .then(email => done(null, user))
        done(null, user)
    })
}