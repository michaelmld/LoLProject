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
            console.log(s)
        }
        else {
            console.log("yo i dont work faggot")
        }
    })

    res.send("hi work in progress")
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

// router.get('/form', function(req, res) {
//     res.render('form', { title: 'Express' });
// });

module.exports = router;
