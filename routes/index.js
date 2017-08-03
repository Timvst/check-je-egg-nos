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

  var status = 'veilig';

  if ( search.includes('nl') != true ) {
    status = 'veilig';
  } else if ( eggs.includes(trimmed) == true && trimmed.length == 5 ) {
    status = 'onveilig';
  };
  if ( search.length != 12 ) {
    status = 'onbekend';
  };
  if ( status == 'veilig') {
    res.render('results', { Title: 'Dit ei is veilig', Results: 'Deze productiecode komt niet voor in de lijst.', Code: req.params.ei } );
  } else if ( status == 'onveilig') {
    res.render('results', { Title: 'Je hebt een besmet ei gekocht', Results: 'Deze productiecode komt voor in de lijst met besmette eieren.', Code: req.params.ei } );
  } else if ( status == 'onbekend') {
    res.render('results', { Title: 'Er klopt iets niet', Results: 'Dit is geen geldige productiecode.', Code: req.params.ei } );
  };
  console.log(status);
  console.log(req.params.ei);


});


module.exports = router;
