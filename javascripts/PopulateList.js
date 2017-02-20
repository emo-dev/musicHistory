"use strict";




var Music = (function(PopulateMusic) {

	
	//===============================//
	//===========VARIABLES===========//
	//===============================//
	

	//Variable to keep track of the number of songs on the page
	//and to create custom Id's
	PopulateMusic.numOfSongsOnPage = 0;

	
	//===============================//
	//===========FUNCTIONS===========//
	//===============================//

	PopulateMusic.createSongStructure = (song) => {

		let counter = Music.numOfSongsOnPage;
		$("#main-content").append(	
			`<div class="song-container">
				<div class="content-wrapper">
					<h2 id="song--${counter}">${song.title}</h2>
					<p id="artist--${counter}">${song.artist}</p>
					<p id="album--${counter}">${song.album}</p>
				</div>
				<button class="song-delete">Delete</button>
			</div>`
		);

		Music.numOfSongsOnPage++;
		console.log("songs created");
	};

	PopulateMusic.populateUserList = songs => {
		//Grabs specific Json objects from atorage variable
		let songsToUpdate = Music.grabJson(songs);
		//Populate the page per song
		for (var song = 0; song < songsToUpdate.length; song++) {
			let currentSong = songsToUpdate[song];
			Music.createSongStructure(currentSong);
		}
	};


	//============================//
	//===========RETURN===========//
	//============================//

	return PopulateMusic;

})(Music || {});













