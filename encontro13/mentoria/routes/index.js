var express = require('express');
var router = express.Router();
var fs = require('fs');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/company.db');

function insertProject(data) {
  db.run(`INSERT into Projects(
            nome,
            descricao,
            custo
          )
          VALUES (
            "${data.nome}",
            "${data.descricao}",
            ${data.custo}
          )`);
}

function removeProject(id) {
  db.run(`DELETE from Projects WHERE id = ${id}`)
}

function getProjects(vi, vf, callback) {
  if(!vi)
    vi = 0;

  // TODO: vf = valor máximo no banco de dados
  if(!vf)
    vf = 10000000000;
  var query = `SELECT * from Projects
              WHERE custo >= ${vi} AND custo <= ${vf}
              ORDER BY nome ASC
              `
  db.all(query, callback)
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mentoria' });
});

router.get('/project', function(req, res, next) {
  // consulta banco de dados
  getProjects(req.query.valor_inicial, req.query.valor_final,
    function(err, projects) {
      console.log(projects);
    res.render('project', {
      projects: projects,
      valor_inicial: req.query.valor_inicial,
      valor_final: req.query.valor_final
    });
  });

});

router.get('/project/new', function(req, res, next) {
  // consulta banco de dados
  res.render('project_new', { project: req.query.name, ano: req.query.ano});
});

router.get('/project/remove', function(req, res, next) {
  // consulta banco de dados
  removeProject(req.query.id)
  res.redirect('/project');
});

router.post('/project/new', function(req, res, next) {
  console.log('Req body', req.body);
  // consulta banco de dados
  //res.render('project_new');
  insertProject(req.body);
  res.redirect('/project');
});

module.exports = router;
