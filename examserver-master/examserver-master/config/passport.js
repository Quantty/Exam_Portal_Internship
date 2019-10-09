const LocalStrategy = require('passport-local').Strategy;
const knex = require('knex')(require('../knexfile.js').development);
const authenticationHelper = require('./authenticationHelper.js');
const passport = require('passport');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    knex('Examinators')
        .where({id})
        .first()
        .then(user => {
            done(null, user);
        }).catch(err => {
            done(err, null);
        });
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},(username, password, done) => {
    knex('Examinators')
        .where({email: username}).first()
        .then(user => {
            if (!user) {
                return done(null, false);
            }
            if (!authenticationHelper.comparePassword(password, user.password)) {
                return done(null, false);
            }
            return done(null, user);           
        })
        .catch(err => {
            return done(err);
        });
}));
    

module.exports = passport;