//Node imports
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

//Mongo model
const Article = require('./server/model.js');

//Express and Format settings
const app = express();
const PORT = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.app+json'}));
app.use(express.static('./public'));


//Mongo Configuration
mongoose.connect('mongodb://localhost');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful!');
});

//main route
app.get('/', function(req,res){
  res.sendFile('./public/index.html');
});

// route gets all saved articles
app.get('/api/saved', function(req,res){

    Article.find({})
        .exec(function(err, doc){


            if(err) {
              console.log(err);
            }
            else {
              res.send(doc);
            }
        })
});


//route to add an article to the saved list

app.post ('/api/saved', function (req,res) {
    let newArticle = new Article(req.body);
    console.log(req.body);

    let title = req.body.title;
    let date = req.body.date;
    let url = req.body.url;
    newArticle.save(function(err,doc) {
      if(err) {
        console.log(err);
      }
      else {
       res.json(doc);
      }
    });
});

app.delete('/api/saved', function(req,res) {
    let url = req.param('url');
    Article.find({"url": url}).remove().exec(function(err,data) {
        if(err) {
          console.log(err);
        }
        else{
          res.send("delete");
        }
    });
});

//Start express server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});