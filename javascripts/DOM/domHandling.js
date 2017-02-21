"use strict";


//Variable to keep track of the number of songs on the page
//and to create custom Id's
let numOfSongsOnPage = 0;

let createSongStructure = (song) => {

	console.log("You are in domHandling.js within creatSongStructure(). Here is your song: ", song);

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
	console.log("songs created");
};


//This function toggle between the List and Add Music pages
let updateHeader = (headerName) => {
	if (headerName === "ADD") {
		$("#add-page").show();
		$("#list-page").hide();
	} else if (headerName === "LIST") {
		$("#list-page").show();
		$("#add-page").hide();
	}
};


module.exports = {createSongStructure, updateHeader};