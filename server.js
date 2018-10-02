//Configuring the databasee
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise

//Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
	console.log('Successfully connected to the database');
}).catch(err => {
	console.log(err);
	console.log('Could not connect to the database. Exiting now...');
    process.exit();
});



const express = require('express');
const bodyParser = require('body-parser');

//Create express app
const app = express();

//Parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:true }));

//Parse request of content-type - application/json
app.use(bodyParser.json());

// //Define a simple route
// app.get('/', (req, res) => {
// 	res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});	
// });


// Require Notes routes
require('./app/api/routes/note.routes.js')(app);

//Listen for request
app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});


