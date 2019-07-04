const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const main = require('./app')
// var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())  

// app.use(session({secret: "uhfewiuiub4iub44jkbj", resave: false, saveUninitialized: false}))

//add the router
app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

app.use("/", main);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
