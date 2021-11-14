const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocodeUtil = require('./utils/geocode');
const weatherUtil = require('./utils/weather');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

//Setup handlebars engine and views location
//To render dynamic content in website: Tell express which templating engine we are using. This single line below will setup handlebars for us.
app.set('view engine','hbs');
//If we don't set this-default folder express is going to look for templates is views folder.
app.set('views', viewsPath);
// set hbs to use partials placed inside templates/partials/. This is to write code which can be reused at multiple places.
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//To serve up hbs templates we need to set up routes. In this case:
app.get('',(req,res) =>{
    //render allows us to render one of our views/templates. Render tells express to go into the views folder to look for file named index and then it converts the content into that file in HTML format.
    //second parameter to render is going to be an object which you want that view to be able to access.
    res.render('index',{
        title: 'Weather app',
        name: "Dhanashree"
    });
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About me',
        name: "Dhanashree"
    });
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'Help',
        name: "Dhanashree",
        help: "Some helpful text"
    });
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocodeUtil.geocode(req.query.address, (error, { place } = {}) => {
        if (error) {
            return res.send({
                error: 'You must provide an address'
            });
        }
        // console.log('Data ', data);
        weatherUtil.weather(place, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'You must provide an address'
                });
            }
            // console.log('Data ', forecastData);
            res.send({
                forecast: `It's ${forecastData.temp_c} degrees out there`,
                location: place,
                address: req.query.address
            });
        })
    })
})

app.get('/help/*',(req,res) =>{
    res.render('error',{
        title: 'Error',
        message:'Help article not found'
    });
})

app.get('*',(req,res) =>{
    res.render('error',{
        title: 'Error',
        message:'Page not found'
    });
})



app.listen(3000, () => {
    console.log("Listening on port 3000");
})