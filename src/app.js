const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const path=require('path')
const express=require('express')
const hbs=require('hbs')
// console.log(__dirname)
// console.log(__filename)
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const app=express()

//define path for express config
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//***IMPORTANT*** we cant use hbs or handle bar without making the 'views' dirctoty
//but we can constimize it name from 'view' to anything like 'templates' make a path just done in 'publicDirectory' 

//setup static direct to server
app.use(express.static(publicDirectory))

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather-app',
        name:'Rahul'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        message:"About me!!!!",
        name:'Rahul'
    })
})

//challenge 23
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Need help for surviver!!!',
        name:'Rahul ch',
        title:'Help'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error:'Please provide the Address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,data)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:data,
                location,
                address:req.query.address
            })
        })
    })
})


// app.get('/product',(req,res)=>{
//     if(!req.query.search)
//     {
//         return res.send({
//             error:'You must search the product'
//         })
//     }

//         console.log(req.query.search);
//         res.send({
//             product:[]
//         })
// })

//challeneg 25

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Error",
        message:"Help article not found",
        name:"Rahul ch"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"Error",
        message:"Page not found",
        name:"Rahul ch"
    })
})

app.listen(3000,()=>{
    console.log('Server set up in 3000.');
})
