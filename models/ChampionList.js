var Champion = require('./Champion');

module.exports = class ChampionList {
    constructor() {
        this.type = String;
        this.version = String;
        this.data = {'type' : Champion};
    }
};
