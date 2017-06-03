var express = require('express');
var router = express.Router();
var fs = require('fs');
const projects_file = './data/projects.json';

function getFileData() {
  var content = fs.readFileSync(projects_file, "utf8");
  console.log('content', content);
  var content_json = JSON.parse(content);
  return content_json;
}

function updateFile(data) {
  content_json = getFileData();
  content_json.push(data);
  fs.writeFileSync(projects_file, JSON.stringify(content_json));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mentoria' });
});

router.get('/project', function(req, res, next) {
  // consulta banco de dados
  res.render('project', { projects: getFileData()});
});

router.get('/project/new', function(req, res, next) {
  // consulta banco de dados
  res.render('project_new', { project: req.query.name, ano: req.query.ano});
});

router.post('/project/new', function(req, res, next) {
  console.log('Req body', req.body);
  // consulta banco de dados
  //res.render('project_new');
  updateFile(req.body);
  res.redirect('/project');
});

module.exports = router;
