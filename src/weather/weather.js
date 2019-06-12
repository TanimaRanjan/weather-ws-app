// var request = require('request');
const fetch = require('node-fetch')

// var getWeather = (lat, lng, callback) => {
//     request({
//         url: `https://api.darksky.net/forecast/1732f5b553cd2b33aba75b3d173e8570/${lat},${lng}`,
//         json: true
//     }, (error, response, body) => {
//       if(!error && response.statusCode === 200) {
//         //console.log(body.currently.temperature);
//         callback(undefined, {
//             temperature: body.currently.temperature,
//             summary: body.currently.summary,
//             apparentTemperature: body.currently.apparentTemperature,
//             windSpeed: body.currently.windSpeed
//         });
//       } else if(response.statusCode === 400) {
//         callback('Unable to fetch weather');
//       }
//     });
// };




const getWeatherAsync = async(lat, lng) => {
  return await fetch(`https://api.darksky.net/forecast/1732f5b553cd2b33aba75b3d173e8570/${lat},${lng}`).then((resp) => {
    if(resp.status === 200 ) {
      return  resp.json()
    } else {
      throw new Error('Unable to Fetch data')
    }
  }).then((data) => {
    // console.log('In Weather Async --- return '+JSON.parse(data))
    const currentTemp = {
            timezone: data.timezone,
            temperature: data.currently.temperature,
            summary: data.currently.summary,
            apparentTemperature: data.currently.apparentTemperature,
            windSpeed: data.currently.windSpeed,
            precipProbability: data.currently.precipProbability
    }
    return currentTemp
  })
}

// getWeatherAsync().then((data) => {
//   console.table(data)
// }).catch((error) => {
//   console.log(error)
// })

module.exports = { 
    getWeatherAsync
}

//