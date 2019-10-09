const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const auth = require('./routes/authentication.js');
const cors = require('cors');
const RedisStore = require('connect-redis')(session);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));

app.use(session({
    store: new RedisStore({
        host: 'localhost',
        port: 6379
    }),
    secret: 'buttcrack',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);

app.listen(3001, err => {
    if (err) {
        console.log(err);
    }
    console.log('Server started on port 3001');
});
