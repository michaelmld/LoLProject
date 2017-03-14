var express = require('express');
var request = require('request');
var lolAPI = require('./lolAPIController');
var Promise = require('promise')
var championMap = require('../public/static/champions.json');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('home', {champions: championMap})
});

//

// router.get('/form', function(req, res) {
//     res.render('form', { title: 'Express' });
// });

router.post('/', function(req, res) {
    var summonerName = encodeURI(req.body.summonerName)
    var summonerName2 = encodeURI(req.body.summonerName2)


    var getStatsWithId = function (summonerId) {
        return new Promise(function(resolve, reject){
            request(lolAPI.getRankedStats(summonerId), function(error, response, body) {
                var champions = JSON.parse(body).champions
                var results = champions.map(champion =>
                    ({
                        id: champion.id,
                        stats: champion.stats
                    })
                ).sort((a, b) => a.id - b.id).filter(result => result.id != 0);
                resolve(results)
            })
        })
    };

    var getSummonerId = function(summonerName) {
        return new Promise(function(resolve, reject) {
            request({url: lolAPI.getSummonerId(summonerName), json:true}, function(error, response, body) {
                var summonerKey = Object.keys(body)[0]
                var summonerId = body[summonerKey].id
                resolve(getStatsWithId(summonerId))
            })
        })
    }

    Promise.all([getSummonerId(summonerName), getSummonerId(summonerName2)]).then( results => {
        if (results.length  == 2) {
            var summonerStats = results[0]
            var summonerStats2 = results[1]
            //todo use bubble sort to figure out common champions played
        }
        else {
            console.log("yo i dont work faggot")
        }
    })

    res.send("hi work in progress")
});




module.exports = router;