const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const main = require('./app')
var redis = require('redis');
var client = redis.createClient(); // this creates a new client
var session = require('express-session');
var redisStore = require('connect-redis')(session);

app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client}),
    saveUninitialized: false,
    resave: false
}));

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())  

//add the router
app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

app.use("/", main);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
