var express = require( "express" )
var ejs = require( "ejs" )
var app = express();
var fs = require( 'fs' );
var file = "all_pets.JSON"

var petfile = fs.readFileSync( file, 'utf8' )
var all_pets = {

	pets: []

};

var pets = JSON.stringify( all_pets.pets )
console.log( pets );

var none = {
	status: "A pet by that name does not exist."
}

var success = {
	status: "Success!"
}

var Pet = function ( name, type ) {
	this.name = name
	this.type = type
}

app.get( '/', function ( req, res ) {
	res.json( {
		welcome: "Welcome to the petDB "
	} );
} );

app.get( '/create/:pet_name/:pet_type', function ( req, res ) {
	var petItem = new Pet( req.params.pet_name, req.params.pet_type )

	all_pets.pets.push( petItem );
	console.log( all_pets );
	fs.writeFile( file, pets, function () {} )
	res.json(
		success
	);

} )

app.get( '/all_pets', function ( req, res ) {

	console.log( "requested all pets" );

	res.json( {
		results: all_pets

	} );

} )

app.get( '/read/:pet_name', function ( req, res ) {

	var petQuery = req.params.pet_name
	console.log( "requested " + petQuery );
	for ( var i = 0; i < all_pets.pets.length; i++ ) {
		if ( petQuery === all_pets.pets[ i ].name ) {

			res.json( {
				results: all_pets.pets[ i ]
			} )
		}
		else {
			res.json( none );

		}

	}
} )

app.get( '/update/:pet_name/:new_pet_name', function ( req, res ) {

	var petQuery = req.params.pet_name
	var newName = req.params.new_pet_name
	console.log( "changing name of " + petQuery );
	for ( var i = 0; i < all_pets.pets.length; i++ ) {
		if ( petQuery === all_pets.pets[ i ].name ) {
			all_pets.pets[ i ].name = newName
			res.json( {
				status: all_pets.pets[ i ]
			} )
		}
		else {
			res.json( none );

		}

	}
} )

app.get( '/destroy/:pet_name', function ( req, res ) {

	var petQuery = req.params.pet_name
	console.log( "destroying " + petQuery );
	for ( var i = 0; i < all_pets.pets.length; i++ ) {
		if ( petQuery === all_pets.pets[ i ].name ) {
			all_pets.pets.splice(i, 1)
			res.json( success )
		}
		else {
			res.json( none );

		}

	}
} )

app.listen( 3000 );
console.log( "listening on port 3000" );