var express = require('express');
var Promise = require('promise')
var statsFetcher = require('../lib/statsFetcher')
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

    var statProms = Promise.all([statsFetcher.fetchSummonerStats(summonerName), statsFetcher.fetchSummonerStats(summonerName2)])
    statProms.then(function(resArr) {
        var summonerStats = resArr[0]
        var summonerStats2 = resArr[1]
        var commonChampions = commonChampionFinder.findCommonChampions(summonerStats, summonerStats2)

        var compareChampionsResult = summonerComparer.compareCommonChampions(commonChampions);
        summonerComparer.displayComparisonResults(summonerName, summonerName2, compareChampionsResult)
        res.render('results', { summonerA: summonerName, summonerB: summonerName2, winner: compareChampionsResult.finalWinner, resultList:compareChampionsResult.championCompareList });
    }, function(reason) {
        console.error("Failed to get stats for : " + reason)
        res.render('error', {message: reason});
    });

});




module.exports = router;
