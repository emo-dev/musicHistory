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