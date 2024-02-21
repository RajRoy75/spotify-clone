const express = require('express');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('./Models/User');
const authRouter = require('./routes/auth');

const app = express();
require('dotenv').config();
app.use(express.json());
const port = 8000;
const mongoDb = `mongodb+srv://rajroy:${process.env.MONGO_PASSWORD}@cluster0.etidfhl.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoDb).then((x)=>{
    console.log('mongoDB atlas successfully connected to express Js')
}).catch((err)=>{
    console.error(err);
});
// adding passport-jwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'ThisIsAsecretKey';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get('/',(req,res)=>{
    res.send('Hello from express');
});
app.use('/auth',authRouter);

app.listen(port,()=>{
    console.log(`Express is running on port ${port}`);
})