const { readFile } = require('fs');

const express = require('express');

const app = express();

const path = require('path');



app.get('/',(request, response) =>{
    readFile('./welcome.html', 'utf8', (err, html) => {
        if(err){
            response.status(500).send('sorry, out of order')
            return;
        }

        response.send(html);
    })


});
app.get('/home',(request, response) =>{
    readFile('./home.html', 'utf8', (err, html) => {
        if(err){
            response.status(500).send('sorry, out of order')
        }

        response.send(html);
    })
});
app.get('/todolist', (request, response) => {
    const filePath = path.join(__dirname, 'todolist_dist/index.html');

    readFile(filePath, 'utf8', (err, html) => {
        if (err) {
            response.status(500).send('Sorry, something went wrong.');
            return;
        }

        response.send(html);
    });
});

app.use('/todolist', express.static(path.join(__dirname, 'todolist_dist')));


require('dotenv').config();
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.use('/weather', express.static(path.join(__dirname, 'WeatherApp_dist')));




app.listen(process.env.PORT || 3000, () => console.log('Avialble on http://localhost:3000'));








