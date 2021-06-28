const request = require('request')
const forecast=(lati,long,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?lat='+lati+'&lon='+long+'&appid=a6245db5cb5bfdf12895b8fb38b3852f&units=metric'
    request({url,json:true},(error,response)=>{
        if(error)
        callback('Unable to connect with weather services!!!',undefined)
        else if(response.body.cod==='400')
        callback('Unable to find Location!!',undefined)
        else{
            const weatherData=response.body
          
            const data={
                 
                rain:weatherData.clouds.all,
                temp:weatherData.main.temp,
                 des:weatherData.weather[0].description
            }
            
            callback(undefined,data.des + ' It is currently '+ data.temp + ' degree out. There is a '+data.rain+'% chance of rain')
        }
    })
}

module.exports=forecast