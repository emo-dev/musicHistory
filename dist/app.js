(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";


//Variable to keep track of the number of songs on the page
//and to create custom Id's
let numOfSongsOnPage = 0;

let createSongStructure = (song) => {
	// console.log("You are in domHandling.js within creatSongStructure(). Here is your song: ", song);
	let counter = numOfSongsOnPage;
	$(
		
		`<div class="song-list">
			<div class="row">
					<div class="col-md-9 song-container">
						<h2 id="song--${counter}">${song.title}</h2>
					</div>
					<div class="col-md-2">
						<input class="btn btn-default delete-btn" type="button" value="Delete">
					</div>
			</div>
			<div class="row song-container">
				<p id="artist--${counter}">${song.artist}</p>
				<p id="album--${counter}">${song.album}</p>
			</div>
		</div>`

		).insertBefore( $(".more") );
	numOfSongsOnPage++;
};


//This function toggle between the List and Add Music pages
let updateHeader = (headerName) => {
	if (headerName === "ADD") {
		$("#add-page").removeClass('hidden');
		$("#list-page").addClass('hidden');
	} else if (headerName === "LIST") {
		$("#list-page").removeClass('hidden');
		$("#add-page").addClass('hidden');
	}
};

//This function is designed to populate the filter options. It takes two parameters, the array of values, and the name of 
//the value type. Ex: 'artist', 'album'
let updateFilterValues = (objValArr, objValType) => objValArr.forEach((objVal) => $(`<li><a href='#'>${objVal}</a></li>`).appendTo(`.${objValType}-scroll`));


module.exports = {createSongStructure, updateHeader, updateFilterValues};























},{}],2:[function(require,module,exports){
"use strict";

//This function filters out the songs listed on the LIST page based on either album, artist, or both
let filterSongs = (myFilterObj, songArr) => {
	return new Promise((resolve) => {
		if ((myFilterObj.artist.length === 0) && (myFilterObj.album.length === 0)) {
		} else {
			$('.song-list').remove();
			let myFilteredSongs = [];
			let allSongs = songArr.map((song) => {
				if ((song.artist === myFilterObj.artist) || (song.album === myFilterObj.album)) {
					myFilteredSongs.push(song);
					return song;
				}
			});
			resolve(myFilteredSongs);
		}
	});
};

module.exports = {filterSongs};
},{}],3:[function(require,module,exports){
"use strict";

//Array to keep all user's songs
let userSongs = [];

//Variable to store all Parsed Json Data Files
let myData = [];


//function to set userSongs
let setUserSongs = (songArr) => userSongs.push(songArr);
//function to set json data
let setJsonSongs = (songArr) => {
	return new Promise((resolve) => {
		songArr.forEach((song) => myData.push(song));
		resolve(myData);
	});
};

//function to return array of objects that 
//contain all of user's personal songs
let getUserSongs = () => userSongs;
//Function to retrieve stored Json data
let getJsonSongs = () => myData;

//function that will combine userSongs and myData, and further sort them by value returning an array or those values
//Current values: 'title', 'album', 'artist'
let getSongValues = (value) => (userSongs.concat(myData).map((song) => song[value])).sort();


module.exports = {getUserSongs, getJsonSongs, setUserSongs, setJsonSongs, getSongValues};
},{}],4:[function(require,module,exports){
"use strict";


//Function that take user's songs and creates an object that includes the
//title, artist, and album of the song, then pushes the object into
//userSongs array
let updateSongs = (counter) => {

	return new Promise ((resolve) => {
		let inputs = $("input[name='song-input']").slice(0, 3);
		let title = inputs[0].value,
			artist = inputs[1].value,
			album = inputs[2].value;

		//checks to see if any inputs are left blank
		if (title === "" || artist === "" || album === "") {
			alert("Don't leave out anything!!");
		//creates the object and pushes it to userSongs Array
		} else {
			var song = {title, artist, album};
			$("input[name='song-input']").val("");

			resolve(song);
			// NEED TO SET UP RESOLVE HERE
			// userSongs.push(song);
			// Music.createSongStructure(song);
		}
	});
};
	

module.exports = {updateSongs};
},{}],5:[function(require,module,exports){
"use strict";


//Attached to each delete button per individual music card
let deleteSongs = () => {
	let target = $(event.target);
	if (target.hasClass("song-delete")) {
		target.parent().remove();	
	}
};

module.exports = {deleteSongs};
},{}],6:[function(require,module,exports){
"use strict";



//Creates XHR request for specified fileName. Pushes the retrieved JSON
//file to the parsJson function to be parsed and stored
//For the pre-determined song list, there is a separate functionality
//that adds two new songs to Json object before storing it
let loadJson = function(fileName) {

	return new Promise ((resolve, reject) => {
		$.ajax({url: fileName})
			.done((songData) => {
				console.log(`This is your song data with ${fileName}: `, songData);	
				resolve(songData);
			})
			.fail((error) => reject(error));
	});

};

let loadFirebase = () => console.log("loadFirebase still needs to be created");

module.exports = {loadJson, loadFirebase};
},{}],7:[function(require,module,exports){
"use strict";

let updateSongs = () => console.log("You should create UpdateSongs function");

module.exports = {updateSongs};
},{}],8:[function(require,module,exports){
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
	//grab the artist and album values that were clicked
	let whatToFilter = {artist: $('.artist-name').html(), album: $('.album-name').html()};
	filter.filterSongs(whatToFilter, storage.getUserSongs().concat(storage.getJsonSongs())).then(
			(filteredArr) => filteredArr.forEach((song) => domHandling.createSongStructure(song))
		);
});















},{"./DOM/domHandling.js":1,"./Filter/filter.js":2,"./Storage/storeMusic.js":3,"./crud/createSongs.js":4,"./crud/destroySongs.js":5,"./crud/readSongs.js":6,"./crud/updateSongs.js":7}]},{},[8]);
