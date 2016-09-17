var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.send('Welcome!');
    //res.sendFile('./client/html/index.html', { root: __dirname });
    res.render('index', {title : 'Hello'});
});

module.exports = router;
