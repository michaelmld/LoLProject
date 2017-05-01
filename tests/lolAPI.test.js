const lolAPI = require('./../lib/lolAPI')
const expect = require('expect')

it('should get the url to get a summoner id', () => {
    var result = lolAPI.getSummonerId('saxire')
    var expected = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/saxire?api_key=RGAPI-93b12e3e-06d3-41fe-9692-84f8800b2809"

    expect(result).toBe(expected)
})

//Todo write other tests