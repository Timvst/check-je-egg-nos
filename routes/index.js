var express = require('express');
var router = express.Router();
var codes = require('./codes');
var _ = require('lodash');
const matcher = require('matcher');


/* GET home page. */



router.get('/', function(req, res) {
  res.render('index');
});

router.get('/zoek/', function(req, res) {
  res.render('index', { Fout: 'Je moet wel een code invullen.'});
});

router.get('/zoek/:ei', function(req, res) {
  var search = req.params.ei;
  var trimmed = search.substr(5, 5);
  var eggs = JSON.stringify(codes);
  var acuut = '2-nl-4015502';

  var status = 'veilig';

  if ( search.includes('nl') != true ) {
    status = 'veilig';
  } else if ( search.includes(acuut) && trimmed.length == 5 ) {
    status = 'onveilig-acuut';
  } else if ( eggs.includes(trimmed) == true && trimmed.length == 5 ) {
    status = 'onveilig-kinderen';
  };
  if ( search.length != 12 ) {
    status = 'onbekend';
  };
  if ( status == 'veilig') {
    res.render('results', { Title: 'Dit ei is veilig', Results: 'Deze productiecode komt niet voor in de lijst.', Code: req.params.ei } );
  } else if ( status == 'onveilig-acuut') {
    res.render('results', { Title: 'Je hebt een besmet ei gekocht', Results: 'Deze productiecode komt voor in de lijst met besmette eieren. Het advies is deze eieren niet te eten.', Code: req.params.ei } );
  } else if ( status == 'onveilig-kinderen') {
    res.render('results', { Title: 'Je hebt een besmet ei gekocht', Results: 'Deze code komt voor in de lijst waarvan wordt geadviseerd deze niet door kinderen te laten eten.', Code: req.params.ei } );
  } else if ( status == 'onbekend') {
    res.render('results', { Title: 'Er klopt iets niet', Results: 'Dit is geen geldige productiecode.', Code: req.params.ei } );
  };
  console.log(status);
  console.log(req.params.ei);


});


module.exports = router;
