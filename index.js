const express = require('express');
const app = express();
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //dir for directory name
app.use(express.urlencoded()); //this is a middleware
app.use(express.static('assets'));

//create our very first own middleware
//Middleware 1
// app.use(function (req, res, next) {
// 	req.myName = 'uttam';
// 	// console.log('middleware 1 called');
// 	next();
// });

// // middleware2
// app.use(function (req, res, next) {
// 	console.log('My name from middleware2:', req.myName);
// 	// console.log('middleware 2 is called');
// 	next();
// });

var contactList = [
	{
		name: 'uttam',
		phone: '1234567890',
	},
	{
		name: 'thor',
		phone: '2346578920',
	},
	{
		name: 'Iron Man',
		phone: '4528094567',
	},
];

//controller for home page or index page
app.get('/', (req, res) => {
	// console.log('from the get home route controller:', req.myName);
	Contact.find({}, function (err, contacts) {
		if (err) {
			console.log('error in fetching contacts from DB');
			return;
		}
		return res.render('home', {
			title: 'my contact',
			contact_list: contacts,
		});
	});
});

//controller for practice page
app.get('/practice', (req, res) => {
	return res.render('practice');
});

//controller for deleting contact
app.get('/delete-contact', function (req, res) {
	// console.log(req.query);
	//get the ID form query in the ul
	let id = req.query.id;

	//find the contact in the database using id and delete
	Contact.findByIdAndDelete(id, function (err) {
		if (err) {
			console.log('error in deleting an object from database');
			return;
		}
		return res.redirect('back');
	});
	//to contact without db
	// let contactIndex = contactList.findIndex((contact) => contact.phone == phone);

	// if (contactIndex != -1) {
	// 	contactList.splice(contactIndex, 1);
	// }
});

//Controller to handle post request that is comming from home.ejs file
app.post('/create-contact', function (req, res) {
	// return res.redirect('practice');
	// console.log(req.body);
	// contactList.push({
	// 	name: req.body.name,
	// 	phone: req.body.phone,
	// });
	// contactList.push(req.body);
	Contact.create(
		{
			name: req.body.name,
			phone: req.body.phone,
		},
		function (err, newContact) {
			if (err) {
				console.log('error in creating a contact');
				return;
			}
			console.log('*******', newContact);
			return res.redirect('back');
		}
	);
});

app.listen(port, function (err) {
	if (err) {
		console.log('error in running the server on port:', port);
	} else {
		console.log('your app listening on port:', port);
	}
});
