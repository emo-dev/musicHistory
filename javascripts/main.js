"use strict"; 

let createSongs = require('./crud/createSongs.js'),
		destroySongs = require('./crud/destroySongs.js'),
		updateSongs = require('./crud/updateSongs.js'),
		readSongs = require('./crud/readSongs.js'),
		domHandling = require('./DOM/domHandling.js'),
		storage = require('./Storage/storeMusic.js'),
		filter = require('./Filter/filter.js');



//================================================//
//=============INITIAL JSON LOAD==================//
//================================================//

/*
Taking initial JSON and storing all music data within storeMusic.js 
Then taking all data and displaying it on the DOM
*/
readSongs.loadJson('../JSON/songs.json').then(
		(songData) => storage.setJsonSongs(songData)
	).then(
		(myStoredJsonData) => myStoredJsonData.forEach((song) => domHandling.createSongStructure(song))
);
	
/*
Taking second set of JSON data and storing it within storeMusic.js
Console.log all of current stored data
*/
readSongs.loadJson('../JSON/songs2.json').then(
		(songData) => storage.setJsonSongs(songData)
	).then(
		(songArr) => console.log("Here is all of my tored Json data: ", storage.getJsonSongs())
);


//Set up toggle for switching between List and Add pages
$('#link-home').click((event) => {
	console.log("You are clicking: ", event.currentTarget);
});

$('#link-add').click((event) => {
	console.log("You are clicking: ", event.currentTarget);
});




