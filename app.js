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

router.get("/register", (req, res) => {
    console.log('register page')
    res.sendFile((__dirname+'/View/register.html'));
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
        res.redirect('login');
    } else {
    }
    res.render((__dirname+'/View/dashboard.html'), {name: req.session.companyUser});
});

router.get('/settings',function(req,res){
    if(!req.session.companyUser) {
        res.redirect('login');
    } else {
    }
    res.render((__dirname+'/View/settings.html'), {name: req.session.companyUser});
});

router.get('/products',function(req,res){
    if(!req.session.companyUser) {
        console.log('req.session: ', req.session);
        // return res.status(401).send();
        res.redirect('login');
    } else {
        console.log('session started')
        console.log('req.session: ', req.session);
    }
    var requestUrl = 'http://localhost:3333/product/getAllProducts?cId=' + req.session.companyUser;
    var options = {
        url: requestUrl
    };
    let pd = '';
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          pd = JSON.parse(body);
          console.log('pd is: ', pd.products);
          console.log('party 1');
          res.render((__dirname+'/View/products.html'), {products: pd.products, name: req.session.companyUser});
        } else {
          console.log('party 2');
          res.render((__dirname+'/View/products.html'), {products: [], name: req.session.companyUser});
        }
    }
    
    request(options, callback);
});

router.get('/currentProduct',function(req,res){
    if(!req.session.companyUser) {
        console.log('req.session: ', req.session);
        // return res.status(401).send();
        res.redirect('login');
    } else {
        console.log('session started')
        console.log('req.session: ', req.session);
    }
    // console.log('query: ', req.query);
    // res.render((__dirname+'/View/currentProduct.html'), {name: req.session.companyUser, currentProductData: req.query});

    var requestUrl = 'http://localhost:3333/code/getCodes?cId=' + req.session.companyUser + '&productTitle=' + req.query.title;
    var options = {
        url: requestUrl
    };
    console.log('qq:', req.query);
    let codes = '';
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
        try {
          codes = JSON.parse(body);
        } catch (e) {
            codes = {}
        }
        //   console.log('codes is: ', codes);
          console.log('party 1');
          res.render((__dirname+'/View/currentProduct.html'), {name: req.session.companyUser, currentProductData: req.query, codes: codes});
        } else {
          console.log('party 2');
          res.render((__dirname+'/View/currentProduct.html'), {name: req.session.companyUser, currentProductData: req.query, codes: {}});
        }
    }
    
    request(options, callback);
});

router.get('/logout',function(req,res){
    if(!req.session.companyUser) {
        console.log('req.session: ', req.session);
        // return res.status(401).send();
        res.redirect('login');
    } else {
        console.log('session ending');
        // req.session.destroy(req.session.serverSessionID);
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            } else {
                res.redirect('login');
            }
        });
    }
});

module.exports = router;
