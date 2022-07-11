const mongoose = require('mongoose');

//to connect the database follow this  https://mongoosejs.com/  or https://mongoosejs.com/docs/index.html
mongoose.connect('mongodb://localhost:27017/contacts_list_db');

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'error connecting to db'));

db.once('open', function () {
	console.log('successfully connected to db');
});
