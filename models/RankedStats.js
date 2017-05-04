var ChampionStats = require('./ChampionStats');

module.exports = class RankedStats {
    constructor() {
        this.summonerId = Number;
        this.modifyDate = Number;
        this.champions = [ChampionStats];
    }
};
