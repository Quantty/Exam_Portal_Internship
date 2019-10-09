const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile.js').development);

function comparePassword(userPass, dbPass) {
    return bcrypt.compareSync(userPass, dbPass);
}

function createUser(req) {
    return bcrypt.hash(req.body.password, 10).then(hash => {
        return knex('Examinators')
                    .insert({
                        email: req.body.username,
                        password: hash
                    })
                    .returning('*');
    });
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(403);
}

module.exports = {
    comparePassword,
    createUser,
    isLoggedIn
}