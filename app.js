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

router.get("/companies", (req, res) => {
    res.sendFile((__dirname+'/View/companies.html'));
});

router.get("/login", (req, res) => {
    console.log('login page')
    res.render((__dirname+'/View/login.html'), {message: ""});
});

router.get("/register", (req, res) => {
    console.log('register page')
    res.sendFile((__dirname+'/View/register.html'));
});

router.post("/sessionStart", (req, res) => {
    console.log('session start function');
    console.log('email is: ', req.body['session[companyUser][email]']);
    req.session.companyUser = req.body['session[companyUser][email]'];
    req.session.serverSessionID = req.body.sessionID;
    res.status(200).send();
});

router.get('/dashboard',function(req,res){
    if(!req.session.companyUser) {
        res.redirect('login');
    } else {
        var requestUrl = 'http://buytrue.in:3333/product/getAllProducts?cId=' + req.session.companyUser;
        console.log('/dashboard:', req.session.companyUser);
        var options = {
            url: requestUrl
        };
        let pd = '';
        function callback(error, response, body) {
            pd = JSON.parse("" + (body));
            let totalCodes = 0;
            let totalProducts = pd.products.length;
            for (var i = 0; i < totalProducts; i++) {
                totalCodes += pd.products[i].totalCodes;
            }
            var requestUrl2 = 'http://buytrue.in:3333/review/getAllCompanyReviews?companyId=' + req.session.companyUser + "&type=" + 1;
            var options2 = {
                url: requestUrl2
            };
            function callback2(error, response, body) {
                let rd = JSON.parse(body);
                let totalReviews = rd.reviews.length;
                
                res.render((__dirname+'/View/dashboard.html'), {totalCodes: totalCodes, totalProducts: totalProducts, totalReviews: totalReviews, name: req.session.companyUser});
            }
            request(options2, callback2);
        }
        request(options, callback);
    }
});

router.get('/forgot-password',function(req,res){
    res.render((__dirname+'/View/forgot-password.html'));
});

router.get('/resetPassword',function(req,res){
    var code = req.query.code;
    res.render((__dirname+'/View/reset-password.html'), {passwordResetCode: code});
});

router.get('/verify',function(req,res){
    res.render((__dirname+'/View/verify.html'));
});

router.get('/reviews',function(req,res){
    if(!req.session.companyUser) {
        res.redirect('login');
    } else {
        var requestUrl = 'http://buytrue.in:3333/review/getAllCompanyReviews?companyId=' + req.session.companyUser;
        var options = {
            url: requestUrl
        };
        let rd = '';
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
            rd = JSON.parse("" + (body));
            res.render((__dirname+'/View/reviews.html'), {reviews: rd.reviews, name: req.session.companyUser});
            } else {
            res.render((__dirname+'/View/reviews.html'), {reviews: [], name: req.session.companyUser});
            }
        }
        request(options, callback);
    }
});

router.get('/verifyAccount',function(req,res){
    var email = req.query.email;
    var code = req.query.code;

    var requestUrl = 'http://buytrue.in:3333/companyUser/verifyAccount?email=' + email + '&code=' + code;
    var options = {
        url: requestUrl
    };
    let rd = '';
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          res.render((__dirname+'/View/login.html'), {message: "Account verified"});
        } else {
          res.render((__dirname+'/View/login.html'), {message: "Account can't be verified"});
        }
    }
    
    request(options, callback);
});

router.get('/settings',function(req,res){
    if(!req.session.companyUser) {
        res.redirect('login');
    } else {
        var requestUrl = 'http://buytrue.in:3333/companyUser/settings?cId=' + req.session.companyUser;
        var options = {
            url: requestUrl
        };
        let pd = '';
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
            pd = JSON.parse(body);
            res.render((__dirname+'/View/settings.html'), {name: req.session.companyUser, companyData: pd});
            } else {
            res.render((__dirname+'/View/settings.html'), {name: req.session.companyUser});
            }
        }
        request(options, callback);
    }
});

router.get('/products',function(req,res){
    if(!req.session.companyUser) {
        res.redirect('login');
    } else {
        var requestUrl = 'http://buytrue.in:3333/product/getAllProducts?cId=' + req.session.companyUser;
        var options = {
            url: requestUrl
        };
        let pd = '';
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
            pd = JSON.parse("" + (body));
            res.render((__dirname+'/View/products.html'), {products: pd.products, name: req.session.companyUser});
            } else {
                res.render((__dirname+'/View/products.html'), {products: [], name: req.session.companyUser});
            }
        }
        
        request(options, callback);
    }
});

router.get('/currentProduct',function(req,res){
    if(!req.session.companyUser) {
        res.redirect('login');
    } else {
        var requestUrl = 'http://buytrue.in:3333/code/getCodes?cId=' + req.session.companyUser + '&productTitle=' + req.query.title;
        var options = {
            url: requestUrl
        };
        let codes = '';
        let productData = '';
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
            try {
                productData = JSON.parse(body);
            } catch (e) {
                codes = {}
            }
            res.render((__dirname+'/View/currentProduct.html'), {name: req.session.companyUser, currentProductData: productData});
            } else {
            res.render((__dirname+'/View/currentProduct.html'), {name: req.session.companyUser, currentProductData: productData, codes: {}});
            }
        }
        
        request(options, callback);
    }
});

router.get('/logout',function(req,res){
    if(!req.session.companyUser) {
        res.redirect('login');
    } else {
        console.log('/logout:', req.session);
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
