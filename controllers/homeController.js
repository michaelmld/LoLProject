var express = require('express');
var request = require('request');
var lolAPI = require('./lolAPIController');
var championMap = require('../public/static/champions.json');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('home', {champions: championMap})
});

// router.get('/form', function(req, res) {
//     res.render('form', { title: 'Express' });
// });

router.post('/', function(req, res) {
    var summonerName = encodeURI(req.body.summonerName)
    request(lolAPI.getSummonerId(summonerName), function(error, response, body) {
        var json = JSON.parse(body)
        //no error checking at all bruh
        var summonerKey = Object.keys(json)[0]
        var summonerId = json[summonerKey].id
        request(lolAPI.getRankedStats(summonerId), function(error, response, body) {
            var champions = JSON.parse(body).champions
            var results = champions.map(function(champion) {
                return {
                    id: championMap[champion.id],
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




module.exports = router;
