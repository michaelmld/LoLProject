/**
 * Created by michael.dang on 4/26/17.
 */

var request = require('request');
var lolAPI = require('./lolAPI');
var Promise = require('promise')


var fetchSummonerStats = (summonerName) => {
    return new Promise((resolve, reject) => {
        request({url: lolAPI.getSummonerId(summonerName), json:true}, (error, response, body) => {
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
                    resolve(fetchSummonerStatsById(summonerId))
                }
            }
        })
    })
}


var fetchSummonerStatsById = (summonerId) => {
    return new Promise((resolve, reject) => {
        request(lolAPI.getRankedStats(summonerId), (error, response, body) => {
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

module.exports = {
    fetchSummonerStats: fetchSummonerStats,
    fetchSummonerStatsById: fetchSummonerStatsById
}