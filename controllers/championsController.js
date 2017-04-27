var express = require('express');
var request = require('request');
var lolAPI = require('../lib/lolAPI');
var fs = require('fs');
var router = express.Router();

//This routes file is used to update our static champions in case new champions are released

router.get('/', function (req, res) {
    request(lolAPI.getAllChampions(), (error, response, body) => {
        transform(body)
        res.redirect('/');
    })
});

transform = function(championsResponseBody) {
    var json = JSON.parse(championsResponseBody)
    var keys = Object.keys(json.data)
    var championsMap = {}
    keys.forEach((item) => {
        championsMap[json.data[item].id] = item
    });

    fs.writeFile("./public/static/champions.json", JSON.stringify(championsMap), (err) => {
        if(err) {
            return console.log(err);
        }
        console.log("Champions updated");
    });
}

module.exports = router;
