const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utills/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

// Setup handelbar engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static function
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chirag Agrawal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name : 'Chirag Agrawal'
        
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Chirag Agrawal'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chirag Agrawal',
        ErrorMessage: 'Help Article Not found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'Mudt probide'
        })
    }
    res.send({
        prof: []
    })
})

app.get('/weather', (req, res) => {
   
    if (!req.query.address) {
        return res.send({
            error: 'Mudt probide'
        })
    }
    const location = req.query.address
    forecast(location, (error, forecastData) => {
        if(error) {
            return res.send({
                error
            })
        }
        return res.send({
            data: forecastData,
            location

        })
    })
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chirag Agrawal',
        ErrorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on ' + port)
})
