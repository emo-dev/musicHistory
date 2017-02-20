"use strict";

$("#add-page").hide();


var Music = (function(List) {

	//===============================//
	//===========VARIABLES===========//
	//===============================//

	//This function toggle between the List and Add Music pages
	let updateHeader = headerName => {
		if (headerName === "ADD") {
			$("#add-page").show();
			$("#list-page").hide();
		} else if (headerName === "LIST") {
			$("#list-page").show();
			$("#add-page").hide();
		}
	};

	//Attached to each delete button per individual music card
	let deleteSongs = () => {
		let target = $(event.target);
		if (target.hasClass("song-delete")) {
			target.parent().remove();	
		}
	};

	//Attached to the "More >" button at the bottom of the 
	//home page. Will retrieve pre-requested json file
	let uploadSecondJson = () => Music.populateUserList("myMusic2");
	
	//===============================//
	//===========FUNCTIONS===========//
	//===============================//

	//Container for all functions used as event listeners
	List.eventListeners = {updateHeader, deleteSongs, uploadSecondJson};

	//============================//
	//===========RETURN===========//
	//============================//

	return List;

})(Music || {});


































