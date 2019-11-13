var mysql      = require('mysql');

var pool = mysql.createPool({
  host     : '10.10.10.51',
  user     : 'team1',
  password : '2001colorful',
  database : 'tianya'
});

class Tianya {
  static page(filter, cb) {
    const pi = filter.pi;
    const ps = filter.ps;

    const start = (pi-1)*ps;

    const sql1 = `select count(*) as total from user_tbl;`;
    const sql2 = `SELECT * FROM user_tbl limit ${start}, ${ps};`;
    
    pool.getConnection((err, connection) => {
      if (err) {
        log(err.message);
        return cb(err);
      }
      connection.query(sql1, (err, data) => {
        if (err) return cb(err);
        const total = data[0].total;
        pool.getConnection((err, conn) => {
          if (err) return cb(err);
          conn.query(sql2, (err, result) => {
            if (err) return cb(err);
            cb(null, {total, list: result});
          });
          conn.release();
        });
      });
      connection.release();
    });
  }

  static find(user_id, cb) {
    const sql = `select * from user_tbl where id=${user_id}`;
    pool.getConnection(function(err, connection){
      if (err) return cb(err);
      connection.query(sql, cb);
      connection.release();
    });
  }
}

module.exports = Tianya;
