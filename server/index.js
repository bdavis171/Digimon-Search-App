// digimon search app

// reference express
const express = require('express');
const app = express();
// const path = require('path'); 
const port = process.env.PORT || 1997;

// import routes
const api = require('./routes/api');
app.use('/api',api);

app.use(express.static('../client/build')); // render react when backend runs while deploying application

// send react app
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// CONNECTING TO A MONGO DATABASE
// reference the mongoose module
let mongoose = require('mongoose');
// connect to database
let mongoDB = 'mongodb+srv://bdavis171:dustysice97@cluster0-wkxef.mongodb.net/cs_database?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGODB_URI || mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
// connection error message
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// //When build is in production environment 
// if (process.env.NODE_ENV === 'production') {           
//     app.use(express.static('../client/build'));
  
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
//   }

// listen to server
// const port = 1997;
// const host = 'localhost';
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})