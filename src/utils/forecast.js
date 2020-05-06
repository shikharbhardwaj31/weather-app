const request = require('request');

const fun = (lat,long,callback) => {
const url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric"+"&appid=efa19cbef5d1f2358ce1b4cc24c712b5";
request({url : url,json : true},(error,response)=>{
    if(error)
    {
        callback("Unable to connect to location services !",undefined);
    }
    else if(response.body.cod!=200)
    {
        callback(response.body.message,undefined);
    }
    else
    {
        callback(undefined,response.body)
    }
})
}

module.exports = fun