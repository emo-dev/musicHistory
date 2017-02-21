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