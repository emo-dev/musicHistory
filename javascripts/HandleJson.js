"use strict";



var Music = (function(LoadJson) {
	
	//=================================//
	//===========JSON UPLOAD===========//
	//=================================//

	//Variable to store all Parsed Json Data Files
	let myData = {};
	
	//Creates XHR request for specified fileName. Pushes the retrieved JSON
	//file to the parsJson function to be parsed and stored
	//For the pre-determined song list, there is a separate functionality
	//that adds two new songs to Json object before storing it
	LoadJson.loadMusic = function(fileName, customVariable) {

		let updateMySongData = songList => {
			console.log("done loading " + customVariable);
			myData[customVariable] = songList;

			if (customVariable === "myMusic") {
				myData[customVariable].push({album: "MuteMath", artist: "MuteMath", title: "Chaos"});
				myData[customVariable].unshift({album: "NewBorn Sun", artist: "Chon", title: "Bubble Dream"});
				//sends Parsed data to populateUserList to be uploaded to 
				//page
				Music.populateUserList(customVariable);
			}
		};

		$.ajax({url:fileName})
			.done(updateMySongData);

	};

	//Function to retrieve stored Json data
	LoadJson.grabJson = dataName => myData[dataName];

	return LoadJson;

})(Music || {});

//On load, specified Json files are sent to be parsed and stored with 
//custom variable names
window.onload = Music.loadMusic("../songs.json", "myMusic");
window.onload = Music.loadMusic("../songs2.json", "myMusic2");






