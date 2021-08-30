// Importing modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()

// Define paths for Express config
const publicDPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Bach"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "Bach"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        username: "DefaultUser00",
        name: "Bach"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error, lat:latitude, long: longtitude})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Bach",
        errMessage: "Help Article Not Found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Bach",
        errMessage: "Page Not Found"
    })
})
 
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

