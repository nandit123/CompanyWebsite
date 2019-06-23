const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is a company route");
});

router.get('/yo',function(req,res){
    res.sendFile((__dirname+'/View/dashboard.html'));
    //__dirname : It will resolve to your project folder.
});
module.exports = router;
