const express = require('express');
const router = express.Router();

const authenticationHelper = require('../config/authenticationHelper.js');
const passport = require('../config/passport.js');


router.post('/register', (req, res, next) => {
    return authenticationHelper.createUser(req)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.sendStatus(404);
        }
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            req.session.save(err => {
                return next(err);
            });
            return res.sendStatus(200);
        });
    })(req, res, next);
});

router.get('/logout', authenticationHelper.isLoggedIn, (req, res) => {
    req.logout();
    res.sendStatus(200);
});

router.get('/', authenticationHelper.isLoggedIn, (req, res) => {
    res.sendStatus(200);
});

module.exports = router;