const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const htmlPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'./views/partials')
console.log(__dirname)

const app = express()

app.set('view engine','hbs')
app.use(express.static(htmlPath))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        data : 'Shikhar',
        header : 'Weather'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help page',
        data : 'Shikhar',
        header : 'Help'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About page',
        data : 'Shikhar',
        header : 'About'
    })
})

app.get('/products',(req,res)=>{
    
    if(!req.query.search)
    {
        return res.send({
            error : 'You must provide a search term !'
        })
    }
    res.send({
        products : []
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.location)
    {
        return res.send({
            error : 'You must provide a location !'
        })
    }

    geocode(req.query.location,(error,response)=>{
        if(error)
        {
            return res.send({
                error : error
            })
        }
        else
        {
            forecast(response[1],response[0],(error,response)=>{
                if(error)
                {
                    return res.send({
                        error : error
                    })
                }
                else
                {
                    return res.send({
                        location : req.query.location,
                        temperature : response.main.temp,
                    })
                }
            })
        }
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        data : 'Help article'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        data : '404'
    })
})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})