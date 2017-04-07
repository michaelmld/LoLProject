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

router.post('/', function(req, res) {
    var summonerName = encodeURI(req.body.summonerName)
    var summonerName2 = encodeURI(req.body.summonerName2)

    Promise.all([getSummonerStats(summonerName), getSummonerStats(summonerName2)]).then( results => {
        if (results.length  == 2) {
            var summonerStats = results[0]
            var summonerStats2 = results[1]
            var commonChampions = commonChampionFinder.findCommonChampions(summonerStats, summonerStats2)

            var compareChampionsResult = summonerComparer.compareCommonChampions(commonChampions);
            summonerComparer.displayComparisonResults(summonerName, summonerName2, compareChampionsResult);
            res.render('results', { summonerA: summonerName, summonerB: summonerName2, winner: compareChampionsResult.compare, resultList:compareChampionsResult.championCompareList });
        }
        else {
            console.error("failed to get stats for " + summonerName + " or " +summonerName2)
        }
    })

});

var getSummonerStatsWithId = function (summonerId) {
    return new Promise(function(resolve, reject){
        request(lolAPI.getRankedStats(summonerId), function(error, response, body) {
            var champions = JSON.parse(body).champions
            var results = champions.map(champion =>
                    ({
                        id: champion.id,
                        stats: champion.stats
                    })
            //sort so we can linear search and remove result with id 0, dont know why LoL API sends that result
            ).sort((a, b) => a.id - b.id).filter(result => result.id != 0);
            resolve(results)
        })
    })
};

var getSummonerStats = function(summonerName) {
    return new Promise(function(resolve, reject) {
        request({url: lolAPI.getSummonerId(summonerName), json:true}, function(error, response, body) {
            //TODO error check later
            var summonerKey = Object.keys(body)[0]
            var summonerId = body[summonerKey].id
            resolve(getSummonerStatsWithId(summonerId))
        })
    })
}


module.exports = router;
