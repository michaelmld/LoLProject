var express = require('express');
var request = require('request');
var lolAPI = require('./lolAPIController');
var Promise = require('promise')
var championMap = require('../public/static/champions.json');
var summonerComparer = require('../lib/summonerComparer')
var commonChampionFinder = require('../lib/commonChampionFinder')

var router = express.Router();


router.get('/', function(req, res) {
    res.render('home', {champions: championMap})
});

router.post('/results', function(req, res) {
    var summonerName = encodeURI(req.body.summonerName)
    var summonerName2 = encodeURI(req.body.summonerName2)

    var statProms = Promise.all([getSummonerStats(summonerName), getSummonerStats(summonerName2)])
    statProms.then(function(value) {
        var summonerStats = value[0]
        var summonerStats2 = value[1]
        var commonChampions = commonChampionFinder.findCommonChampions(summonerStats, summonerStats2)

        var compareChampionsResult = summonerComparer.compareCommonChampions(commonChampions);
        summonerComparer.displayComparisonResults(summonerName, summonerName2, compareChampionsResult)
        res.render('results', { summonerA: summonerName, summonerB: summonerName2, winner: compareChampionsResult.finalWinner, resultList:compareChampionsResult.championCompareList });
    }, function(reason) {
        console.error("Failed to get stats for : " + reason)
        res.render('error', {message: reason});
    });

});

var getSummonerStatsWithId = function (summonerId) {
    return new Promise(function(resolve, reject){
        request(lolAPI.getRankedStats(summonerId), function(error, response, body) {
            if(error) {
                console.error("Couldn't reach Riot API for summonerId : " + summonerId)
                reject(error)
            } else {
                if(response && response.statusCode > 400) {
                    console.error("Couldn't get ranked stats for : " + summonerId + " because : " + response.statusMessage)
                    reject(summonerId)
                } else {
                    var champions = JSON.parse(body).champions
                    var results = champions.map(champion =>
                        ({
                            id: champion.id,
                            stats: champion.stats
                        })
                    //sort so we can linear search and remove result with id 0, dont know why LoL API sends that result
                    ).sort((a, b) => a.id - b.id).filter(result => result.id != 0);
                    resolve(results)
                }
            }
        })
    })
};

var getSummonerStats = function(summonerName) {
    return new Promise(function(resolve, reject) {
        request({url: lolAPI.getSummonerId(summonerName), json:true}, function(error, response, body) {
            if(error) {
                console.error("Couldn't reach Riot API for : " + summonerName)
                reject(error)
            } else {
                if(response && response.statusCode > 400) {
                    console.error("Couldn't get summoner id for " + summonerName + " because : " + response.statusMessage)
                    reject(summonerName)
                } else {
                    var summonerKey = Object.keys(body)[0]
                    var summonerId = body[summonerKey].id
                    resolve(getSummonerStatsWithId(summonerId)) 
                }
            }
        })
    })
}


module.exports = router;
