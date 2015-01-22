var express = require( "express" )
var ejs = require( "ejs" )
var app = express();
var fs = require( 'fs' );

var file = "all_pets.JSON"
fs.readFile( file, function ( data ) {} )

var all_pets = {

	pets : []

};

var Pet = function ( name, type ) {
	this.name = name
	this.type = type
}



app.get( '/', function ( req, res ) {
	res.json( {
		welcome: "Welcome to the petDB, "
	} );
} );

app.get( '/create/:pet_name/:pet_type', function ( req, res ) {
	var petItem = new Pet( req.params.pet_name, req.params.pet_type )

	all_pets.pets.push( petItem );
	console.log(all_pets);
	fs.writeFile( file, all_pets, function () {} )
	res.json( {
		status: "Success!"
	
	} );

} )

app.get( '/all_pets', function ( req, res ) {
	
	console.log("requested all pets");
	
	res.json( {
		results: all_pets
	
	} );

} )





// var celeb = {
// 	results: {
// 		"instructions": "Guess the name in this format: Anna_Kendrick",
// 		"profession": "Writer",
// 		"known_for": [ "writing awesome books and being awesome", "Portlander", "funny poignant books", "fiction" ],
// 		"gender": "male",
// 		"first letter of first name": "C",
// 		"quotes": [ "Our Generation has had no Great war, no Great Depression. Our war is spiritual. Our depression is our lives.", "We all die. The goal isn't to live forever, the goal is to create something that will.", "Find joy in everything you choose to do. Every job, relationship, home... it's your responsibility to love it, or change it." ],
// 		"another hint": "The first rule is... we don't talk about it..."

// 	}
// }

// app.get( '/', function ( request, response ) {
// 	response.json( celeb )
// } )

// app.get( '/:guess', function ( request, response ) {

// 	var celebGuess = request.params.guess;
// 	if ( celebName === celebGuess ) {
// 		response.json( {
// 			correct: "Nice work!"
// 		} )
// 	}
// 	else {
// 		response.json( {
// 			incorrect: "Wrong!"
// 		} )
// 	}
// } )

app.listen( 3000 )
console.log("listening on port 3000");