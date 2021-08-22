const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const PORT = process.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Luffy D'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Luffy D'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Luffy D',
        helpText: 'Some help message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({error: 'You must provide an address!'})

    geocode(req.query.address, (error, data) => {
        if (error) return res.send({error})
        
        const { latitude, longitude, location } = data
        forecast(latitude, longitude, (error, forsecastData) => {
            if (error) return res.send({error})
            
            res.send({
                forecast: forsecastData,
                location: location,
                address: req.query.address
            })
        })
    })
    
})

// ERROR PAGES
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        name: 'Luffy D',
        title: '404 Help'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        name: 'Luffy D',
        title: '404'
    })
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))