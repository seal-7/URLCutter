var express = require('express');
var router = express.Router();
var User = require('../models/user');
var geoip = require('geoip-country');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  let ipaddress = req.connection.remoteAddress
  res.render('index', { title: 'URL CUTTER' });
  var geo = geoip.lookup("106.51.109.212");
  console.log(geo.country, ipaddress);
  logCountryCodeInFile(geo.country, ipaddress);
});

router.post('/create', function(req, res, next) {
    console.log(req.body.url);
    console.log(req.body.short_url);
    let longUrl = req.body.url;
    let shortUrl = req.body.short_url;
    if (shortUrl == "") {
      shortUrl = getRandomShortUrl();
    }

    var req_data=new User({
        url: longUrl,
        short_url : shortUrl,
        date : new Date().toDateString()
    });

    User.create_short_url(req_data,function (error, db_data) {
        if(error){
            console.log("Error occured maybe because of duplicates\n");
            res.render('failed',{urlerror: "URL ALREADY TAKEN, TRY ANOTHER!"});
        }
        else{
            console.log("User created succesfully\n");
            res.render('success',{link: "http://theurlcutter.in/" + db_data.short_url});
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

function getRandomShortUrl() {
  let randomNumber = Math.round(Math.random() * 1000).toString();
  let timeStamp = new Date().getTime().toString();
  let randomUrl = ""
  for(let i=0; i<timeStamp.length; i++) {
    randomUrl += String.fromCharCode('a'.charCodeAt(0) + parseInt(timeStamp[i]));
  }
  for(let i=0; i<randomNumber.length; i++) {
    randomUrl += String.fromCharCode('a'.charCodeAt(0) + parseInt(randomNumber[i]));
  }
  return randomUrl
}

function logCountryCodeInFile(countryCode, ipaddress) {
  let log = countryCode + " | " + ipaddress + " | " + new Date().getTime() + "\n";
  fs.appendFile('./country.logs', log, function(err) {
    console.error(err, "Error logging in file.");
  })
}

module.exports = router;
