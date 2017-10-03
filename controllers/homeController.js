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

router.post('/navySeal', function(req, res) {
    router.post('/navySeal', function(req, res) {
        json = {
            "response_type": "in_channel",
            "text" : 'What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.'
        }
        res.send(json)
    });

});




module.exports = router;
