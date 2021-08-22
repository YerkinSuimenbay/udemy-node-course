const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const ACCESS_KEY = '45c15e2fa7f30a91c788341416edbc35'
    const URL = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${latitude},${longitude}&units=m`

    request(URL, {json: true}, (error, response) => {
        if (error) return callback('Unable to connect to weather services! No internet connection!')
        if (response.body.error) return callback('Unable to ')
        const { temperature, feelslike, weather_descriptions } = response.body.current
        const data = `${weather_descriptions[0]}. It's currently ${temperature} degrees and feels like ${feelslike}`
        callback(undefined, data)
    })
}

module.exports = forecast