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