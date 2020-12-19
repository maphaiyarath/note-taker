// load data
let data = require('../db/db.json');
var fs = require('fs');
var path = require('path');

module.exports = function(app) {
	// GET /api/notes reads the db.json file and returns all the saved notes as json
	app.get('/api/notes', function(req, res) {
		let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
		res.json(notes);
	});

	/*
	POST /api/notes receives a new note to save on the req body,
	  adds it to the db.json file
	  and returns the new note to the client
	*/
	app.post('/api/notes', function(req, res) {
		let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));

		notes.push(req.body);

		var updatedNotes = JSON.stringify(notes);
		fs.writeFileSync('./db/db.json', updatedNotes);

		res.json(req.body);
	});

	/*
	DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete.
      This means you'll need to find a way to give each note a unique id when it's saved.
      In order to delete a note, you'll need to read all notes from the db.json file,
      remove the note with the given id property, and then rewrite the notes to the db.json file.
	*/
	app.delete('/api/notes/:id', function(req, res) {
		// empty out note with that id
		var noteID = req.params.id;
		let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
		let index = notes.findIndex( element => {
			if (element.id === noteID) return true;
		});
		notes.splice(index, 1);

		var updatedNotes = JSON.stringify(notes);
		fs.writeFileSync('./db/db.json', updatedNotes);
		
		res.send('Deleting note');
	})
};