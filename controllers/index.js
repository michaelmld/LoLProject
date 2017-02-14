var express = require('express');
var request = require('request');
var lolAPI = require('./lolAPI');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
var router = express.Router();


router.get('/', function(req, res) {
    myCache.get("champions" , function(err, value) {
        if(!err) {
            if(value == undefined){
                request(lolAPI.getAllChampions(), function(error, response, body){
                    var json = JSON.parse(body)
                    var keys = Object.keys(json.data)
                    var championsMap = keys.map(function(item) {
                        return {
                            id: json.data[item].id,
                            value: item
                        }
                    });
                    myCache.set("champions", championsMap)
                    res.render('index', { champions: championsMap });
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
        //no error checking at all bruh
        var summonerKey = Object.keys(json)[0]
        var summonerId = json[summonerKey].id
        request(lolAPI.getRankedStats(summonerId), function(error, response, body) {
            var champions = JSON.parse(body).champions
            var results = champions.map(function(champion) {
                return {
                    id: champion.id,
                    totalSessionsPlayed: champion.stats.totalSessionsPlayed
                }
            }).sort(function(a, b){
                return b.totalSessionsPlayed - a.totalSessionsPlayed
            });


            res.send(results);
        })

    })
});



module.exports = router;
