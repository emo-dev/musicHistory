"use strict";


//Attached to each delete button per individual music card
let deleteSongs = () => {
	let target = $(event.target);
	if (target.hasClass("song-delete")) {
		target.parent().remove();	
	}
};

module.exports = {deleteSongs};