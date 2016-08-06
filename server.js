
const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const config = require('./config/config');
const app = express();

mongoose.connect(`mongodb://${config.dbUrl}:${config.dbPort}/react-bulletin`);

app.listen(config.serverPort, function(){
  console.log(`Server started at port ${config.serverPort}`);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'))

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/board.html');
});
