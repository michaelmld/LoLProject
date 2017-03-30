var express = require('express');
var request = require('request');
var lolAPI = require('./lolAPIController');
var Promise = require('promise')
var championMap = require('../public/static/champions.json');
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
            var commonChampions = findCommonChampions(summonerStats, summonerStats2)
            console.log(commonChampions);

            var compareChampionsResult = compareCommonChampions(commonChampions);
            displayComparisonResults(summonerName, summonerName2, compareChampionsResult);
            res.render('results', { winner: compareChampionsResult.compare, resultList:compareChampionsResult.championCompareList });

        }
        else {
            console.log("yo i dont work faggot")
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
            var summonerKey = Object.keys(body)[0]
            var summonerId = body[summonerKey].id
            resolve(getSummonerStatsWithId(summonerId))
        })
    })
}

var findCommonChampions = function(championsA, championsB) {
    var i = 0
    var j = 0
    var commonChampions = []
    while(i < championsA.length && j < championsB.length) {
        if(championsA[i].id == championsB[j].id){
            var championArray = [championsA[i], championsB[j]]
            commonChampions.push(championArray)
            i++
            j++
        }
        else if(championsA[i].id > championsB[j].id) {
            j++
        }
        else {
            i++
        }
    }
    return commonChampions
}

var compareCommonChampions = function(commonChampions) {
    var compareValue = 0;
    var championCompareList = commonChampions.map( ([championA, championB]) => {
        var championCompare = compareChampionStats(championA.stats, championB.stats);
        compareValue += championCompare.compare;
        return ({
            id: championA.id,
            result: championCompare
        });
    });

    var ret = {
        compare : compareValue,  // overall result for all the champions.
        // comparison for each champion.
        championCompareList: championCompareList // array will consist of json like {id: championId, result: return value from compareChampionStats}
    }
    return ret;
}

var compareChampionStats = function(statsA, statsB) {
    var winCmp = statsA.totalSessionsWon - statsB.totalSessionsWon;
    var cmp = (winCmp > 0 ? 1 : (winCmp < 0 ? -1 : 0));
    var championCompare = {
        compare: cmp,
        reason: {
            winCompare: winCmp
            // More things will go in here eventually
        }
    };

    return championCompare;
}

// takes the return value from compareCommonChampions
var displayComparisonResults = function(summoner1, summoner2, compareChampionsResult) {
    if (compareChampionsResult.compare > 0) {
        console.log("" + summoner1 + " wins!");
    }
    else if (compareChampionsResult.compare < 0) {
        console.log("" + summoner2 + " wins!");
    }
    else {
        console.log("It's a tie. " + summoner1 + " and " + summoner2 + " are both equally trash!");
    } 

    console.log("Results for each champion are as follows:");
    compareChampionsResult.championCompareList.forEach(champion => {
        console.log("\tChampion id " + champion.id);
        if (champion.result.compare == 0) {
            console.log("\t\tTie.");
        }
        else {
            var championWinner = champion.result.compare > 0 ? summoner1 : summoner2;
            console.log("\t\t" + championWinner + " won by " + Math.abs(champion.result.reason.winCompare) + " wins.");
        }
    });
}

// router.get('/form', function(req, res) {
//     res.render('form', { title: 'Express' });
// });

module.exports = router;
