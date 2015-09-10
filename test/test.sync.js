/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	mkdirp = require( 'mkdirp' ),
	path = require( 'path' ),
	fs = require( 'fs' ),
	cp = require( './../lib/sync.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'sync', function tests() {

	it( 'should export a function', function test() {
		expect( cp ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a valid destination directory', function test() {
		var values = [
			5,
			null,
			true,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cp( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid options argument', function test() {
		var values = [
			'beep',
			5,
			null,
			true,
			undefined,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cp( 'beep/boop', value );
			};
		}
	});

	it( 'should create a file in a specified directory', function test() {
		var dirpath,
			bool;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath );

		bool = fs.existsSync( path.join( dirpath, 'index.js' ) );

		assert.isTrue( bool );
	});

	it( 'should create a configured file in a specified directory', function test() {
		var dirpath,
			fpath1,
			fpath2,
			f1, f2;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'template': 'nodejs'
		});

		fpath1 = path.join( dirpath, 'index.js' );
		fpath2 = path.join( __dirname, 'fixtures', 'index.js' );

		f1 = fs.readFileSync( fpath1, {
			'encoding': 'utf8'
		});
		f2 = fs.readFileSync( fpath2, {
			'encoding': 'utf8'
		});

		assert.deepEqual( f1, f2 );
	});

	it( 'should create a file using a specified template', function test() {
		var dirpath,
			bool;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'template': 'nodejs'
		});

		bool = fs.existsSync( path.join( dirpath, 'index.js' ) );

		assert.isTrue( bool );
	});

	it( 'should ignore any unrecognized options', function test() {
		var dirpath,
			bool;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'beep': 'boop'
		});

		bool = fs.existsSync( path.join( dirpath, 'index.js' ) );

		assert.isTrue( bool );
	});

});
