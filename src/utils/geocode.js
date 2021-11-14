let request = require('request');

//Instead of returning values from function, we can use callback. As nodeJS is asynchronous, returning from a function in asynchronous methods doesn't work.
const geocode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZHNiMSIsImEiOiJja3ZqdjQxZjg2bHhhMm5xd2gyNGdxdWFzIn0.qWY2GXYr4AVT3ZF6zrjQ6A&limit=1"

    request({ url: geocodeURL, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find locatio. Try again with different search term", undefined);
        } else {
            let data = {
                place: address,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = {
    geocode
}