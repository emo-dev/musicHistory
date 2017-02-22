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