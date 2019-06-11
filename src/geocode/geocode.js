const request = require('request');
const fetch = require('node-fetch')

var geocodeAddress = (address, callback) => {

  console.log('Get address')
        var addressCd = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressCd}`,
      json: true
    }, (error, response, body) => {
      if(error) {
      //  console.log('Unable to connect to Google Server');
        callback('Unable to connect to Google Server');
      } else if (body.status==='ZERO_RESULTS') {
        //console.log('Unable to find the address');
        callback('Unable to find the address');
      } else if (body.status === 'OK') {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });

      }
    });
};


const getGeocodeAsync = async(addressCd) => {
  
  return await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addressCd)}.json?access_token=pk.eyJ1IjoidGFuaW1hcmFuamFuIiwiYSI6ImNqd21vZmN3NDAwcjI0OHJ5MXk5cmxqOGQifQ.DxCSTWP8UDIfGYJmr1u8qA`).then((geoResponse) => {
    if(geoResponse.status === 200) {
      return geoResponse.json()
    } else {
      throw new Error('Unable to fetch geocode')
    }
  }).then((data) => {
     
    if(data.features.length !== 0) {
      return {
        address: data.features[0].place_name,
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0]
      }
    } else {
      throw new Error('Unable to find the location, Try again')
    }
    
  })
  }


 module.exports = {
   geocodeAddress, getGeocodeAsync
 };

//1732f5b553cd2b33aba75b3d173e8570
  //https://api.darksky.net/forecast/1732f5b553cd2b33aba75b3d173e8570/40.7247159,-73.9510677
//https://api.darksky.net/forecast/1732f5b553cd2b33aba75b3d173e8570/37.8267,-122.4233


//pk.eyJ1IjoidGFuaW1hcmFuamFuIiwiYSI6ImNqd21vZmN3NDAwcjI0OHJ5MXk5cmxqOGQifQ.DxCSTWP8UDIfGYJmr1u8qA

//"https://api.mapbox.com/geocoding/v5/mapbox.places/starbucks.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoidGFuaW1hcmFuamFuIiwiYSI6ImNqd21vZmN3NDAwcjI0OHJ5MXk5cmxqOGQifQ.DxCSTWP8UDIfGYJmr1u8qA"

//"https://api.mapbox.com/geocoding/v5/mapbox.places/Brooklyn.json?access_token=pk.eyJ1IjoidGFuaW1hcmFuamFuIiwiYSI6ImNqd21vZmN3NDAwcjI0OHJ5MXk5cmxqOGQifQ.DxCSTWP8UDIfGYJmr1u8qA"

//https://api.mapbox.com/geocoding/v5/mapbox.places/encodeURIComponent('Jersey City').json?access_token=pk.eyJ1IjoidGFuaW1hcmFuamFuIiwiYSI6ImNqd21vZmN3NDAwcjI0OHJ5MXk5cmxqOGQifQ.DxCSTWP8UDIfGYJmr1u8qA