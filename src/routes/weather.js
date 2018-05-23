import express from 'express';
import fetch from 'node-fetch';

const weatherRoute = express.Router();


weatherRoute.get('/w', async (req, res) => {
    const appKey = '32a7a32fbff8e508c631869e5f998fc2';
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=84095,us&APPID=${appKey}`;
    const result = await fetch(url);
    const json = await result.json();   
    console.log(json);
    res.json(json);
});

export default weatherRoute;