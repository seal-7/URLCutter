var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'URL CUTTER' });
});
router.post('/create', function(req, res, next) {
    console.log(req.body.url);
    console.log(req.body.short_url);

    var req_data=new User({
        url: req.body.url,
        short_url : req.body.short_url,
        date : new Date().toDateString()
    });

    User.create_short_url(req_data,function (error, db_data) {
        if(error){
            console.log("Error occured maybe because of duplicates\n");
            res.render('failed',{urlerror: "URL ALREADY TAKEN, TRY ANOTHER!"});
        }
        else{
            console.log("User created succesfully\n");
            res.render('success',{link: "http://52.15.233.98:3000/" + db_data.short_url});
        }

    })
});

router.get('/:url',function (req, res, next) {
    console.log(req.url);
    var short_url=req.url.substring(1);
    User.find_short_url(short_url,function (error, data) {
        if(error || data==null){
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
        else {
            console.log(data.url);
            res.redirect(data.url);
        }
    });
})
module.exports = router;
