

require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify);

var moment = require('moment'); 
moment().format();

var axios = require('axios'); 

var fs = require('fs'); 

var arg1 = process.argv[2]; 
var arg2 = process.argv.slice(3).join(" "); 

if (arg1 == "concert-this") {
    concertThis(arg2);
}
if (arg1 == "spotify-this-song") {
    spotifySong(arg2);
}
if (arg1 == "movie-this") {
    movieThis(arg2);
}
if (arg1 == "do-what-it-says") {
    doThis();
}


function concertThis(arg2) {
    axios.get("https://rest.bandsintown.com/artists/" + arg2 + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {

            var datetime = response.data[i].datetime; 
            var dateArr = datetime.split('T'); 

            var concertResults = 
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY"); 
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
        

}

function spotifySong(value) {
   
    spotify
    .search({ type: 'track', query: value })
    .then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
                "--------------------------------------------------------------------" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                    
            console.log(spotifyResults);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

function movieThis(arg2) {
    
    axios.get("https://www.omdbapi.com/?t=" + arg2 + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            var movieResults = 
                "--------------------------------------------------------------------" +
                    "\nMovie Title: " + response.data.Title + 
                    "\nYear of Release: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].arg2 +
                    "\nCountry Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

function doThis() {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        spotifySong(dataArr[1]);
    })
}