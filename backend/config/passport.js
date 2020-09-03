require('dotenv').config();

// a passport startegy for authenication with a JSON Web token
// This allows to authenicate endpoints using the token
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const db = require('../models');

//options is an object literal containing options to control
const options = {}
//jwtFrom Request
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          // If the user is found, return null (for error) and user
          return done(null, user);
        } else {
          // If no user is found
          return done(null, false);
        }
      })
      .catch(error => console.log(error));
    }));
  }