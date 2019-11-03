require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));


/**
 * Middleware
 */
app.use(cors());
app.use(helmet());

/**
 * Header Access Allow Origin
 */
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

/**
 * Routing
 */
require('route')(app);

/**
 * Definition du serveur
 */

app.listen(4002, function (req) {

    console.log('Server is running on port : 4002');

});




