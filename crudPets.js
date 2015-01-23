var express = require( "express" )
var ejs = require( "ejs" )
var app = express();
var fs = require( 'fs' );
var file = "all_pets.JSON"

var petfile = fs.readFileSync( file, 'utf8' )

var allPets = JSON.parse(petfile)



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
		welcome: "Welcome to the petDB. "
	} );
	console.log( allPets );
} );

app.get( '/create/:pet_name/:pet_type', function ( req, res ) {
	var petItem = new Pet( req.params.pet_name, req.params.pet_type )

	allPets.push( petItem );
	console.log( allPets );
	fs.writeFile( file, JSON.stringify( allPets ), function () {} )
	res.json(
		success
	);

} );

app.get( '/all_pets', function ( req, res ) {

	console.log( "requested all pets" );

	res.json( {
		results: allPets
	} );

} );

app.get( '/read/:pet_name', function ( req, res ) {

	var petQuery = req.params.pet_name
	console.log( "requested " + petQuery );
	for ( var i = 0; i < allPets.length; i++ ) {
		if ( petQuery === allPets[ i ].name ) {

			res.json( {
				results: allPets[ i ]
			} );
		}

	}
} )

app.get( '/update/:pet_name/:new_pet_name', function ( req, res ) {

	var petQuery = req.params.pet_name
	var newName = req.params.new_pet_name
	console.log( "changing name of " + petQuery );
	for ( var i = 0; i < allPets.length; i++ ) {
		if ( petQuery === allPets[ i ].name ) {
			allPets[ i ].name = newName
			res.json( success )
		}
		else {
			res.json( none );

		}

	}
} )

app.get( '/destroy/:pet_name', function ( req, res ) {

		var petQuery = req.params.pet_name
		console.log( "destroying " + petQuery );

		allPets.forEach( function ( pet ) {
			if ( pet.name === petQuery ) {
				allPets.splice( indexOf( pet ), 1 )
				res.json( success )
				console.log(allPets);
			}
		} )

		res.json( none );

	}


 )

app.listen( 3000 );
console.log( "listening on port 3000" );