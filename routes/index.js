var express = require('express');
var request = require('request')
var router = express.Router();

const apiKey = "RGAPI-93b12e3e-06d3-41fe-9692-84f8800b2809"
const basePath = "https://global.api.pvp.net"
const getAllChampions = "/api/lol/static-data/na/v1.2/champion"



router.get('/', function(req, res, next) {
    request(basePath+getAllChampions+ "?api_key="+apiKey, function(error, response, body){
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

router.post('/form', function(req, res){
    res.send("Form submitted for " + req.body.summonerName);
});



module.exports = router;
