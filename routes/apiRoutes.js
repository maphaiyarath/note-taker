// load data
let data = require('../db/db.json');
var path = require('path');

module.exports = function(app) {
	// GET /api/notes reads the db.json file and returns all the saved notes as json
	app.get('/api/notes', function(req, res) {
		res.json(data);
	});

	// POST /api/notes receives a new note to save on the req body,
		// adds it to the db.json file
		// and returns the new note to the client
	app.post('/api/notes', function(req, res) {
		data.push(req.body);
		res.json(req.body);
	});

	/*
	DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete.
      This means you'll need to find a way to give each note a unique id when it's saved.
      In order to delete a note, you'll need to read all notes from the db.json file,
      remove the note with the given id property, and then rewrite the notes to the db.json file.
	*/
	app.post('/api/notes/:id', function(req, res) {
		// empty out note with that id
		data.id = '';
		res.json({ ok : true });
	})
};

/*  tableData.length = 0;
	waitListData.length = 0;
	res.sendFile(path.join(__dirname, "view.html"));
	
	*/