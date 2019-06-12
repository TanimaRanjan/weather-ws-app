const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const app = express()

const port =  process.env.PORT ||  3000

// Define path for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebar engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static director to serve 
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle:`Weather `, 
        welcomeMessage:`Use this app to get your weather !`,
        currentYear:new Date().getFullYear(),
        name:'Tanima Ranjan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'Please provide an address'
        })
    }

    
    const getGeoCode = async () => {
    const { address, latitude, longitude} = await geocode.getGeocodeAsync(req.query.address)
        console.log(address, latitude, longitude)

        let data = await weather.getWeatherAsync(latitude, longitude)
        data = {...data , address}
        return data
      }
      
      getGeoCode().then((data) => {  
          res.send({
                welcomeMessage:`${data.summary}. It is currently ${data.temperature} F out and ${data.precipProbability}% change of rain.`,
                location:`${data.address}`,
                precipitation:`${data.precipProbability}% change of rain.`
          })
      }).catch((error) => {
        res.send({
            welcomeMessage:`${error}`,
          })
       
      })
   
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle:'About Page', 
        currentYear: new Date().getFullYear(),
        name:'Tanima Ranjan'
    });
});


app.get('/help', (req, res) => {
    res.render('help.hbs', {
        pageTitle:'Help Page', 
        title: 'help', 
        currentYear:new Date().getFullYear(),
        name:'Tanima Ranjan'
    })
})



app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        errorMessage:'Help Article not found', 
        currentYear:new Date().getFullYear(),
        name:'Tanima Ranjan'
    })
})


app.get('*', (req, res) => {
    res.render('404.hbs', {
        errorMessage:'Page not found',
        currentYear:new Date().getFullYear(),
        name:'Tanima Ranjan'
    })
})


app.listen(port, () => console.log(`server is up on port ${port}`));
