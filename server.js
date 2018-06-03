const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const COOKIE_SECRET = 'cookie_secret';
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const routes = require('./routes');
const { db, User } = require('./models');
const app = new express();



//########AUTHETIFICATION###########
//PASSPORT
passport.use(new LocalStrategy((username, password, cb) => {
    User.findOne({where: {name: username, password: password}}).then((user) => {
        cb(null, user || false);
    });
}));
passport.serializeUser((user, cb) => {
    cb(null, user.name);
});
passport.deserializeUser((username, cb) => {
    User.findOne({where: {name: username}}).then((user) => {
        return cb(null, user || false);
    }).catch(cb);
});


//########MIDDLEWARE#########
app.set('view engine', 'pug');
app.use(express.static("public"));
app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: COOKIE_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);


db.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server listening on port: 3000");
    });
});