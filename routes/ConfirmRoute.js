var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));




var BookingSchema = mongoose.Schema({
    Title : String,
    City : String,
    Theatre : String,
    Show : String,
    SeatNo : Array,
    Quantity : String,
    Amount : String,
    Name : String,
    Email : String,
    Phone : String,
    Date:String,
 CurrentDate : String
});

var FeedbackSchema=mongoose.Schema({
  Name : String,
  Subject : String,
  Email:String,
  Content : String
});


var Booking = mongoose.model('Booking',BookingSchema, 'Booking');
var Feedback = mongoose.model('Feedback',FeedbackSchema, 'Feedback');


router.post('/newFeedback/:n/:s/:e/:c', function (req, res) {
  var feedback = new Feedback({
    Name: req.params.n,
    Subject: req.params.s,
    Email:req.params.e,
    Content: req.params.c
  });
  feedback.save(function(err,docs){
    console.log('Feedback Saved Successfully'+docs);
  });
});

router.get('/feedback', function (req, res) {
  Feedback.find({}, function (err, docs) {
    res.json(docs);
    });
});

router.delete('/deleteFeedback/:id',function(req, res){
  Feedback.remove({_id:req.params.id},function(err, docs){
    console.log('Feedback Removed Successfully');
  });
});

router.post('/newTicket/:t/:c/:t1/:s/:sno/:sq/:a/:n/:e/:p/:d/:cd', function (req, res) {
  var booking = new Booking({
    Title: req.params.t,
    City: req.params.c,
    Theatre: req.params.t1,
    Show: req.params.s,
    SeatNo:JSON.parse(req.params.sno),
    Quantity: req.params.sq,
    Amount: req.params.a,
    Name : req.params.n,
    Email: req.params.e,
    Phone: req.params.p,
    Date:req.params.d,
   CurrentDate:req.params.cd,
  });
  booking.save(function(err,docs){
    console.log('Booking Saved Successfully'+docs);
  });
});

router.get('/bookedseats/:t/:th/:s/:d', function (req, res) {
  Booking.find({Title:req.params.t,Theatre:req.params.th,Show:req.params.s,Date:req.params.d}, function (err, docs) {
    res.json(docs);
    });
});



router.get('/bookedid/:n/:m', function (req, res) {
  Booking.find({Name:req.params.n,Title:req.params.m}, function (err, docs) {
    res.json(docs);
    });
});

module.exports = router;
