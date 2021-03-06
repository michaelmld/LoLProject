/**
 * Created by michael.dang on 4/26/17.
 */

const apiKey = "?api_key=RGAPI-93b12e3e-06d3-41fe-9692-84f8800b2809"
const staticDataPath = "https://global.api.pvp.net"
const basePath = "https://na.api.pvp.net"

const getAllChampions = "/api/lol/static-data/na/v1.2/champion"
const getChampionById = "/api/lol/static-data/na/v1.2/champion/"
const getSummonerId = "/api/lol/na/v1.4/summoner/by-name/"
const getRankedStats = "/api/lol/na/v1.3/stats/by-summoner/" //hardcode season for now

const saxireSummonerId = "19525965"
const zyraChampionId = "143"


var lolApi = new function () {
    this.getAllChampions = function() {
        return staticDataPath + getAllChampions + apiKey
    };
    this.getChampionById = function(id) {
        return staticDataPath + getAllChampions + id + apiKey
    };
    this.getSummonerId = function(name) {
        return basePath + getSummonerId + name + apiKey
    };
    this.getRankedStats = function(summonerId) {
        return basePath + getRankedStats + summonerId + "/ranked" + apiKey + "&season=SEASON2016"
    }
}


module.exports = lolApi