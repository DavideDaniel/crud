var express = require( "express" )
var ejs = require( "ejs" )
var app = express();
var levelup = require( "level" )
var db = levelup( "./myDb", {
	valueEncoding: "json"
} )

var value = {
	name: "smokey",
	type: "cat"
};

var checkDb = db.put( "allPets", value );
console.log( "checking " + checkDb );

db.createReadStream()
	.on( 'data', function ( data ) {
		console.log( data.key, '=', data.value )
	} )
	.on( 'error', function ( err ) {
		console.log( 'Oh my!', err )
	} )
	.on( 'close', function () {
		console.log( 'Stream closed' );
	} )
	.on( 'end', function () {
		console.log( 'Stream closed' );
	} );

var none = {
	status: "A pet by that name does not exist."
};

var success = {
	status: "Success!"
};

var Pet = function ( name, type ) {
	this.name = name
	this.type = type
};

app.get( '/', function ( req, res ) {
	db.createReadStream()
		.on( 'data', function ( data ) {
			console.log( data );

			console.log( data.value )

		} )
		.on( 'error', function ( err ) {
			console.log( 'Oh my!', err )
		} )
		.on( 'close', function () {
			console.log( 'Stream closed' )
		} )
		.on( 'end', function () {
			console.log( 'Stream closed' )
		} );

	res.json( {
		welcome: "Welcome to the petDB "
	} );

} );

app.get( '/create/:pet_name/:pet_type', function ( req, res ) {

	var petName = req.params.pet_name
	var petType = req.params.pet_type
	var petItem = new Pet( petName, petType )

	db.put( "allPets", petItem );

	res.json(
		success
	);

} );

app.get( '/all_pets', function ( req, res ) {
	db.createReadStream()
		.on( 'data', function ( data ) {
			console.log( "requested all pets" );
			var queryAllPets = JSON.parse(data);
			console.log( queryAllPets );

			res.json( {
				results: queryAllPets

			} );

		} )

	.on( 'close', function () {
		console.log( 'Stream closed' )
	} )
		.on( 'end', function () {
			console.log( 'Stream closed' )
		} );
} );

app.get( '/read/:pet_name', function ( req, res ) {
	db.createReadStream( function ( stream ) {
		stream.on( 'data', function ( data ) {
			console.log( data.key, '=', data.value )
			db.get( 'foo', function ( err, value ) {

				console.log( value );
				console.log( value );
			} )

		} )
		stream.on( 'error', function ( err ) {
			console.log( 'Oh my!', err )
		} )
		stream.on( 'close', function () {
			console.log( 'Stream closed' )
		} )
		stream.on( 'end', function () {
			console.log( 'Stream closed' )
		} );
	} );

	var petQuery = req.params.pet_name
	console.log( "requested " + petQuery );
	res.json( petQuery );
	// for ( var i = 0; i < all_pets.pets.length; i++ ) {
	// 	if ( petQuery === all_pets.pets[ i ].name ) {

	// 		res.json( {
	// 			results: all_pets.pets[ i ]
	// 		} )
	// 	}
	// 	else {
	// 		res.json( none );

	// 	}

	// }
} );

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

	}
} );

app.get( '/destroy/:pet_name', function ( req, res ) {

	var petQuery = req.params.pet_name
	console.log( "destroying " + petQuery );
	for ( var i = 0; i < all_pets.pets.length; i++ ) {
		if ( petQuery === all_pets.pets[ i ].name ) {
			all_pets.pets.splice( i, 1 )
			res.json( success )
		}
		else {
			res.json( none );
		}

	}
} )

app.listen( 3000 );
console.log( "listening on port 3000" );