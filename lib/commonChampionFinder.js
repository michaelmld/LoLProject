/**
 * Created by michael.dang on 4/6/17.
 */

//Takes in two lists of champion stats
//each champion stat object will have this structure
// {id=<champion_id>, stats = {.....} }

exports.findCommonChampions = function(championAStats, championBStats) {
    var i = 0
    var j = 0
    var commonChampions = []
    while(i < championAStats.length && j < championBStats.length) {
        if(championAStats[i].id == championBStats[j].id){
            var championArray = [championAStats[i], championBStats[j]]
            commonChampions.push(championArray)
            i++
            j++
        }
        else if(championAStats[i].id > championBStats[j].id) {
            j++
        }
        else {
            i++
        }
    }
    return commonChampions
}