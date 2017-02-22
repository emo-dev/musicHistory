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
	).then(
		/*
		Taking second set of JSON data and storing it within storeMusic.js
		Console.log all of current stored data
		*/
		() => readSongs.loadJson('../JSON/songs2.json')
	).then(
		(songData) => storage.setJsonSongs(songData)
	).then(
		(songArr) => {
			//
			domHandling.updateFilterValues(storage.getSongValues("album"), "album");
			domHandling.updateFilterValues(storage.getSongValues("artist"), "artist");
		}
);



//================================================//
//=============SET UP PAGE TOGGLE=================//
//================================================//

//Set up toggle for switching between List and Add pages
$('#link-list').click((event) => {
	$('.page-header').html("LIST");
	domHandling.updateHeader($('.page-header').html());
});
$('#link-add').click((event) => {
	$('.page-header').html("ADD");
	domHandling.updateHeader($('.page-header').html());
});



//================================================//
//=============SET UP SONG FILTER=================//
//================================================//

//This updates the values of the song-filter on-click for both artist and album
$('.artist-scroll').click((event) => {
	$('.artist-name').html($(event.target).html());
});

$('.album-scroll').click((event) => {
	$('.album-name').html($(event.target).html());
});

//Set up filter button to filter songs displayed either by artist or by album, 
//or by both
$('.filter-btn').click((event) => {
	let whatToFilter = {artist: $('.artist-name').html(), album: $('.album-name').html()};
	domHandling.filterSongs(whatToFilter);
});














