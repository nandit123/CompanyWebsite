const express = require('express');
const router = express.Router();
var request = require('request');

router.get("/", (req, res) => {
    res.sendFile((__dirname+'/View/home.html'));
});

router.get("/login", (req, res) => {
    console.log('login page')
    res.sendFile((__dirname+'/View/login.html'));
});

router.get('/dashboard',function(req,res){
    // if(!req.session.companyUser) {
    //     return res.status(401).send();
    // }
    request('http://localhost:3333/companyUser/dashboard', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });

    // console.log('session::: ', req.session);
    res.sendFile((__dirname+'/View/dashboard.html'));
    //__dirname : It will resolve to your project folder.
});
module.exports = router;
