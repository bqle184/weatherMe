const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cf215db342b99ce6b3f1b56c2d1a4baa&query=' + latitude + ',' + longitude

    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log(body)
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + body.current.temperature + ' degree out. There is a ' + body.current.precip    + '% chance of rain.')
        }
    })
}

module.exports = forecast