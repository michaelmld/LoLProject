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
                    var championsMap = {}
                    keys.forEach(function(item) {
                        championsMap[json.data[item].id] = item
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
                    id: getChampionNameById(champion.id),
                    totalSessionsPlayed: champion.stats.totalSessionsPlayed
                }
            }).sort(function(a, b){
                return b.totalSessionsPlayed - a.totalSessionsPlayed
            });

            //Do cool DB shit and algorithm shit gay stuff


            res.send(results);
        })

    })
});

getChampionNameById = function(id) {
    var sigh
    myCache.get("champions", function(err, championMap) {
        if(!err) {
            if(championMap == undefined){
                throw 404
            }
            else {
                console.log(championMap[id])
                sigh = championMap[id]
            }
        }
    })
    return sigh
};



module.exports = router;
