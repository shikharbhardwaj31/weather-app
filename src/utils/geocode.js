const request = require('request')

const geocode = (location,callback) => {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(location)+".json?access_token=pk.eyJ1IjoiYm9vc3RlcmtpbmcwNiIsImEiOiJjazl0Mjdlb2IxYTgyM2dxaHM4bzh0czVkIn0.vU5i83c10ka29gXadoj3Tg"
    request({url : url,json : true},(error,response)=>{
        if(error)
        {
            callback("Unable to connect to location services !",undefined)
        }
        else if(response.statusCode!=200)
        {
            callback(response.body.message,undefined);
        }
        else
        {
            callback(undefined,response.body.features[0].geometry.coordinates)
            console.log("lat = "+response.body.features[0].geometry.coordinates[1])
            console.log("long = "+response.body.features[0].geometry.coordinates[0])
        }
    })
}


module.exports = geocode