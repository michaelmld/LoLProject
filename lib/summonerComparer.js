/**
 * Created by michael.dang on 4/6/17.
 *
 */
var championMap = require('../public/static/champions.json');

//Takes in a list of tuples of Objects that contain the id of a champion and the summoner's stats for the particular champion
exports.compareCommonChampions = function (commonChampions) {
    var finalWinner = 0;
    var championCompareList = commonChampions.map(([championA, championB]) => {

        var winPercentage = compareWinPercentages(championA.stats, championB.stats);
        var championKills = compareChampionKills(championA.stats, championB.stats);
        var damageDealt = compareDamageDealt(championA.stats, championB.stats);
        var creepScore = compareMinionsKilled(championA.stats, championB.stats);
        var deaths = compareAverageDeaths(championA.stats, championB.stats);
        var goldEarned = compareGoldEarned(championA.stats, championB.stats);
        var turretsKilled = compareTurretsKilled(championA.stats, championB.stats);
        var physicalDamage = comparePhysicalDamage(championA.stats, championB.stats);
        var magicalDamage = compareMagicalDamage(championA.stats, championB.stats);
        var assists = compareAssists(championA.stats, championB.stats);


        var resultingWinner = winPercentage.winner + championKills.winner +
            damageDealt.winner + creepScore.winner +
            deaths.winner + goldEarned.winner +
            turretsKilled.winner + physicalDamage.winner +
            magicalDamage.winner + assists.winner;

        finalWinner += (resultingWinner > 0 ? 1 : (resultingWinner < 0 ? -1 : 0));
        return {
            championName: championMap[championA.id],
            winner: resultingWinner,
            result: [winPercentage, championKills, damageDealt, creepScore,
                deaths, goldEarned, turretsKilled, physicalDamage, magicalDamage, assists]
        };
    });

    return  {
        finalWinner: finalWinner,  // overall result for all the champions.
        championCompareList: championCompareList // array will consist of json lke {id: championId, result: return value from compareChampionStats}
    };
};


var compareWinPercentages = function(summonerAStats, summonerBStats) {
    var summonerAWinPercentage = summonerAStats.totalSessionsWon/summonerAStats.totalSessionsPlayed;
    var summonerBWinPercentage = summonerBStats.totalSessionsWon/summonerBStats.totalSessionsPlayed;

    var offset = summonerAWinPercentage - summonerBWinPercentage;
    var winner = getWinnerOffset(offset)
    return createResultObject(summonerAWinPercentage, summonerBWinPercentage, "Win percent", "some reason", winner)

};

var compareChampionKills = function(summonerAStats, summonerBStats) {
    var summonerAKillAverage = summonerAStats.totalChampionKills/summonerAStats.totalSessionsPlayed;
    var summonerBKillAverage = summonerBStats.totalChampionKills/summonerBStats.totalSessionsPlayed;

    var offset = summonerAKillAverage - summonerBKillAverage;
    var winner = getWinnerOffset(offset)
    return createResultObject(summonerAKillAverage, summonerBKillAverage, "Champion Kills", "some reason", winner)
};

var compareDamageDealt = function(summonerAStats, summonerBStats) {
    var summonerADamageAverage = summonerAStats.totalDamageDealt/summonerAStats.totalSessionsPlayed;
    var summonerBDamageAverage = summonerBStats.totalDamageDealt/summonerBStats.totalSessionsPlayed;

    var offset = summonerADamageAverage - summonerBDamageAverage;
    var winner = getWinnerOffset(offset)
    return createResultObject(summonerADamageAverage, summonerBDamageAverage, "Damage", "some reason", winner)
};

var compareMinionsKilled = function(summonerAStats, summonerBStats) {
    var summonerACreepScoreAvg = summonerAStats.totalMinionKills/summonerAStats.totalSessionsPlayed;
    var summonerBCreepScoreAvg = summonerBStats.totalMinionKills/summonerBStats.totalSessionsPlayed;

    var offset = summonerACreepScoreAvg - summonerBCreepScoreAvg;
    var winner = getWinnerOffset(offset)
    return createResultObject(summonerACreepScoreAvg, summonerBCreepScoreAvg, "Creep Score", "some reason", winner)
};

var compareAverageDeaths = function(summonerAStats, summonerBStats) {
    var summonerAAvgDeaths = summonerAStats.totalMinionKills/summonerAStats.totalSessionsPlayed;
    var summonerBAvgDeaths = summonerBStats.totalMinionKills/summonerBStats.totalSessionsPlayed;

    var offset = summonerAAvgDeaths - summonerBAvgDeaths;
    //Take Note this one is different since you want less deaths
    var winner = (offset > 0 ? -1 : (offset < 0 ? 1 : 0));
    return createResultObject(summonerAAvgDeaths, summonerBAvgDeaths, "Deaths", "some reason", winner)
};

var compareGoldEarned = function(summonerAStats, summonerBStats) {
    var summonerAAvgGoldEarned = summonerAStats.totalGoldEarned/summonerAStats.totalSessionsPlayed;
    var summonerBAvgGoldEarned = summonerBStats.totalGoldEarned/summonerBStats.totalSessionsPlayed;

    var offset = summonerAAvgGoldEarned - summonerBAvgGoldEarned;
    var winner = getWinnerOffset(offset)
    return createResultObject(summonerAAvgGoldEarned, summonerBAvgGoldEarned, "Gold Earned", "some reason", winner)
};

var compareTurretsKilled = function(summonerAStats, summonerBStats) {
    var summonerAAvgTurretsKilled = summonerAStats.totalTurretsKilled/summonerAStats.totalSessionsPlayed;
    var summonerBAvgTurretsKilled = summonerBStats.totalTurretsKilled/summonerBStats.totalSessionsPlayed;

    var offset = summonerAAvgTurretsKilled - summonerBAvgTurretsKilled;
    var winner = getWinnerOffset(offset)
    return createResultObject(summonerAAvgTurretsKilled, summonerBAvgTurretsKilled, "Turrets killed", "some reason", winner)
};


var comparePhysicalDamage = function(summonerAStats, summonerBStats) {
    var summonerAAvgPhysicalDamage = summonerAStats.totalPhysicalDamageDealt/summonerAStats.totalSessionsPlayed;
    var summonerBAvgPhysicalDamage = summonerBStats.totalPhysicalDamageDealt/summonerBStats.totalSessionsPlayed;

    var offset = summonerAAvgPhysicalDamage - summonerBAvgPhysicalDamage;
    var winner = getWinnerOffset(offset)
    return createResultObject(summonerAAvgPhysicalDamage, summonerBAvgPhysicalDamage, "Physical Damage", "some reason", winner)
};

var compareMagicalDamage = function(summonerAStats, summonerBStats) {
    var summonerAAvgMagicalDamage = summonerAStats.totalMagicDamageDealt/summonerAStats.totalSessionsPlayed;
    var summonerBAvgMagicalDamage = summonerBStats.totalMagicDamageDealt/summonerBStats.totalSessionsPlayed;

    var offset = summonerAAvgMagicalDamage - summonerBAvgMagicalDamage;
    var winner = getWinnerOffset(offset)
    return createResultObject(summonerAAvgMagicalDamage, summonerBAvgMagicalDamage, "Magical Damage", "some reason", winner)
};

var compareAssists = function(summonerAStats, summonerBStats) {
    var summonerAAvgAssists = summonerAStats.totalAssists/summonerAStats.totalSessionsPlayed;
    var summonerBAvgAssists = summonerBStats.totalAssists/summonerBStats.totalSessionsPlayed;

    var offset = summonerAAvgAssists - summonerBAvgAssists;
    var winner = getWinnerOffset(offset)
    return createResultObject(summonerAAvgAssists, summonerBAvgAssists, "Assists", "some reason", winner)
};

var getWinnerOffset = function(offset) {
    return (offset > 0 ? 1 : (offset < 0 ? -1 : 0));
}

var createResultObject = function(summonerStatA, summonerStatB, category, reason, winner) {
    return {
        winner : winner, // greater than 1 summonerA wins, less than 0 summonerB wins
        compareStats: {
            category: category, //assists, gold earned, kills etc
            summonerAStat: summonerStatA,
            summonerBStat: summonerStatB,
            reason: reason //can include reason to display to User
        }
    };
}




//Deprecated console logs the results
exports.displayComparisonResults = function (summoner1, summoner2, compareChampionsResult) {
    if (compareChampionsResult.finalWinner > 0) {
        console.log("**************** " + summoner1 + " wins!" +" **************");
    }
    else if (compareChampionsResult.finalWinner < 0) {
        console.log("**************** " + summoner2 + " wins!" +" **************");
    }
    else {
        console.log("It's a tie. " + summoner1 + " and " + summoner2 + " are both equally trash!");
    }

    console.log("Results for each champion are as follows:" + "\n");
    compareChampionsResult.championCompareList.forEach(champion => {
        if (champion.winner == 0) {
            console.log("\tTie.");
        }
        else {
            var victoriousSummoner = champion.winner > 0 ? summoner1 : summoner2;
            console.log(victoriousSummoner + " is a better " + champion.championName + "\n")
            champion.result.forEach(result => {
                var wonOrLost = (result.winner > 0 ? "won" : "lost")
                var compareStats = result.compareStats
                console.log(victoriousSummoner + " " + wonOrLost + " the category " + compareStats.category)
            })
            // console.log("\t\t" + championWinner + " won by " + Math.abs(champion.result.reason.winCompare) + " wins.");
        }
        console.log("--------------------------------")
    });
};