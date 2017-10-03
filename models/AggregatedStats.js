module.exports = class AggregatedStats {
    constructor() {
        this.totalSessionsPlayed = Number;
        this.totalSessionsLost = Number;
        this.totalSessionsWon = Number;
        this.totalChampionKills = Number;
        this.totalDamageDealt = Number;
        this.totalDamageTaken = Number;
        this.mostChampionKillsPerSession = Number;
        this.totalMinionKills = Number;
        this.totalDoubleKills = Number;
        this.totalTripleKills = Number;
        this.totalQuadraKills = Number;
        this.totalPentaKills = Number;
        this.totalUnrealKills = Number;
        this.totalDeathsPerSession = Number;
        this.totalGoldEarned = Number;
        this.mostSpellsCast = Number;
        this.totalTurretsKilled = Number;
        this.totalPhysicalDamageDealt = Number;
        this.totalMagicDamageDealt = Number;
        this.totalFirstBlood = Number;
        this.totalAssists = Number;
        this.maxChampionsKilled = Number;
        this.maxNumDeaths = Number;
    }
};
