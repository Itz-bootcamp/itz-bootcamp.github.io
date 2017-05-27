var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mentoria' });
});

router.get('/project', function(req, res, next) {
  // consulta banco de dados
  res.render('project', { project: req.query.name, ano: req.query.ano});
});

module.exports = router;
