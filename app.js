const express = require('express');
const router = express.Router();
var request = require('request');
var redis = require('redis');
var client = redis.createClient()
var session = require('express-session');
var redisStore = require('connect-redis')(session);

router.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client}),
    saveUninitialized: false,
    resave: false
}));

client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

router.get("/", (req, res) => {
    res.sendFile((__dirname+'/View/home.html'));
});

router.get("/login", (req, res) => {
    console.log('login page')
    res.sendFile((__dirname+'/View/login.html'));
});

router.post("/sessionStart", (req, res) => {
    console.log('session start function');
    console.log('req is: ', req.body);
    console.log('email is: ', req.body['session[companyUser][email]']);
    req.session.companyUser = req.body['session[companyUser][email]'];
    req.session.serverSessionID = req.body.sessionID;
    console.log('Session ID is => ', req.sessionID);
    console.log('Server Session ID is => ', req.session.serverSessionID);
    console.log('req.session at session start => ', req.session);
    res.status(200).send();
});

router.get('/dashboard',function(req,res){
    if(!req.session.companyUser) {
        console.log('session cant start');
        console.log('req.session: ', req.session);
        // return res.status(401).send();
        res.sendFile((__dirname+'/View/login.html'));
    } else {
        console.log('session started')
        console.log('req.session: ', req.session);
    }
    res.sendFile((__dirname+'/View/dashboard.html'));
});

router.get('/products',function(req,res){
    if(!req.session.companyUser) {
        console.log('req.session: ', req.session);
        // return res.status(401).send();
        res.sendFile((__dirname+'/View/login.html'));
    } else {
        console.log('session started')
        console.log('req.session: ', req.session);
    }
    res.sendFile((__dirname+'/View/products.html'));
});

router.get('/logout',function(req,res){
    if(!req.session.companyUser) {
        console.log('req.session: ', req.session);
        return res.status(401).send();
    } else {
        console.log('session ending');
        // req.session.destroy(req.session.serverSessionID);
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            } else {
                res.sendFile((__dirname+'/View/login.html'));
            }
        });
    }
});

module.exports = router;
