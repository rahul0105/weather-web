
const request=require('request')


const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFodWxjaDcyNSIsImEiOiJja3E1Y2dqZjIxaGpmMnZxYmRkZnpwMnN3In0.8XD89mbaAiPRFS0jsDubow&limit=1'

    request({url,json:true},(error,response)=>{
        if(error)
        callback('Unable to connect with weather services!!!',undefined)
        else if(response.body.features.length===0)
        callback('Unable to find Location. Type Alternative trem to search',undefined)
        else
        {
            const data=response.body.features[0]

            callback(undefined,{
                latitude: data.center[1],
                longitude:data.center[0],
                location: data.place_name
            })
        }
    })
}

module.exports= geocode;