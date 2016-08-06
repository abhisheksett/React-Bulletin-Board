
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Notes = mongoose.model('Notes');

router.route('/notes')
.get(function(req, res){
  Notes.find(function(err, notes){
    if(err){
      return res.send(500, err);
    }
    return res.json(notes);
  })
})
.post(function(req, res){
  console.log(req.body);
  var newNote = new Notes();
  newNote.text = req.body.text;
  newNote.save(function(err, note){
    if(err){
      return res.send(500, err);
    }
    return res.json(note);
  })
});

module.exports = router;
