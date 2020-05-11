const https = require('https')
const forecast = (address, callback) => {
    const url = 'https://openweathermap.org/data/2.5/weather?q=' + address +'&appid=439d4b804bc8187953eb36d2a8c26a02'
    const request = https.request(url, (response) => {
        let data = ""
        response.on('data', (chunk) => {
            data += chunk.toString();
        })
        
        response.on('end', () => {
            const body = JSON.parse(data)
            if(body.cod != 200){
                callback('Unable to find location', undefined)
            } else{
                    callback(undefined, `Current temp is ${body.main.temp} degree C, and have ${body.weather[0].description} today`, undefined);
            }
        })
    })
    request.on('error', (error) => {
        callback("Unable to connect weather service", undefined)
    })
    request.end();
}



module.exports = forecast