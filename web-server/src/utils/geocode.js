const request = require('request')
const geocode = (address, callback) => {
    const ACCESS_TOKEN_MAPBOX = 'pk.eyJ1IjoieWVya2luc3VpbWVuYmF5IiwiYSI6ImNrc2huamdiajAxd3Uyb3I0Y24yMTdnengifQ.lGVanC6-NmiG4xBI-VN9jA'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${ACCESS_TOKEN_MAPBOX}&limit=1`

    request(url, {json: true}, (error, response) => {
        if (error) return callback('Unable to connect to location services! No internet connection.')
        if (!response.body.features.length) return callback('Unable to find location. Try again!')

        const data = {
            location: response.body.features[0].place_name,
            longitude: response.body.features[0].center[0],
            latitude: response.body.features[0].center[1]
        }
        callback(undefined, data)
    })
}

module.exports = geocode
