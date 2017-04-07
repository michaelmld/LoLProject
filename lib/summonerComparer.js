/**
 * Created by michael.dang on 4/6/17.
 *
 */
var championMap = require('../public/static/champions.json');

//Takes in a list of tuples of Objects that contain the id of a champion and the summoner's stats for the particular champion
exports.compareCommonChampions = function (commonChampions) {
    var compareValue = 0;
    var championCompareList = commonChampions.map(([championA, championB]) => {
        var championCompare = compareChampionStats(championA.stats, championB.stats);
        compareValue += championCompare.compare;
        return ({
            championName: championMap[championA.id],
            result: championCompare
        });
    });

    var ret = {
        compare: compareValue,  // overall result for all the champions.
        championCompareList: championCompareList // array will consist of json lke {id: championId, result: return value from compareChampionStats}
    }
    return ret;
}

var compareChampionStats = function (statsA, statsB) {
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


//Deprecated console logs the results
exports.displayComparisonResults = function (summoner1, summoner2, compareChampionsResult) {
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
        console.log("\tChampion id " + champion.championName);
        if (champion.result.compare == 0) {
            console.log("\t\tTie.");
        }
        else {
            var championWinner = champion.result.compare > 0 ? summoner1 : summoner2;
            console.log("\t\t" + championWinner + " won by " + Math.abs(champion.result.reason.winCompare) + " wins.");
        }
    });
}