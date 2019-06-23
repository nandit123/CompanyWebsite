const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is a home page");
});

router.get("/login", (req, res) => {
    res.send("This is a login page");
});

router.get('/dashboard',function(req,res){
    res.sendFile((__dirname+'/View/dashboard.html'));
    //__dirname : It will resolve to your project folder.
});
module.exports = router;
