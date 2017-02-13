var express = require('express');
var request = require('request');
var lolAPI = require('./lolAPI');
// var summoner = require('../models/summoner');
// var summon
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
var router = express.Router();


router.get('/', function(req, res) {
    myCache.get("champions" , function(err, value) {
        if(!err) {
            if(value == undefined){
                console.log("value undefined set value in cache")
                request(lolAPI.getAllChampions(), function(error, response, body){
                    var json = JSON.parse(body)
                    var arr = []
                    var keys = Object.keys(json.data)
                    keys.forEach(function(item, index) {
                        arr.push(json.data[item].name)
                    });
                    myCache.set("champions",arr)
                    res.render('index', { champions: arr });
                })
            }
            else {
                res.render('index', { champions: value });
            }
        }
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

        request(lolAPI.getRankedStats(summonerId), function(error, response, body) {
            console.log("get ranked stats")
            var champions = JSON.parse(body).champions
            var results = champions.map(function(c) {
                return {
                    id: c.id,
                    totalSessionsPlayed: c.stats.totalSessionsPlayed
                }
            });

            console.log(results);
            res.send(results);
        })

    })
});



module.exports = router;
