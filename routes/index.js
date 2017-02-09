var express = require('express');
var request = require('request');
var lolAPI = require('./lolAPI');
var router = express.Router();


router.get('/', function(req, res, next) {
    request(lolAPI.getAllChampions(), function(error, response, body){
        var json = JSON.parse(body)
        var arr = []
        var keys = Object.keys(json.data)
        keys.forEach(function(item, index) {
            arr.push(json.data[item].name)
        });
        res.render('index', { champions: arr });
    })
});

router.get('/form', function(req, res) {
    res.render('form', { title: 'Express' });
});

router.post('/form', function(req, res) {
    var summonerName = req.body.summonerName
    request(lolAPI.getSummonerId(summonerName), function(error, response, body) {
        var json = JSON.parse(body)
        var summonerId = json.saxire.id
        res.send("Form submitted for " + req.body.summonerName);
    })
});



module.exports = router;
