let request = require('request');

const weather = (address, callback) => {
    const url = "http://api.weatherapi.com/v1/current.json?key=a00c66a23c914319b1b182755210111&q=" + encodeURIComponent(address);

    //First parameter is options object and second parameter is callback function.
    //json property specifies whether to return data in JSON format or not. If json property is set to true then we won't need to parse the response data manually as it will be in JSON format itself.
    request({ url, json: true }, (error, { body }) => {
        //This if statement is for low level OS errors. Ex. network goes down.
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            //This else if is for the errors which are due to mistake in URL
            callback('Unable to find location', undefined);
        } else {
            //One parameter should always be undefined
            callback(undefined, body.current);
        }
    })
}

module.exports = {
    weather
}