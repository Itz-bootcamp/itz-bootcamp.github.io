var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('company.db');
var check;
db.serialize(function() {

  db.run("CREATE TABLE if not exists Projects ( " +
        "id integer primary key AUTOINCREMENT," +
        "nome varchar(255)," +
        "descricao varchar(255)," +
        "custo float )"
  );
});

db.close();
