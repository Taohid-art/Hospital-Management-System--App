const mysql = require('mysql2');

const connection = mysql.createConnection({
 host: 'hopper.proxy.rlwy.net',
  user: 'root',
  password: 'eNidbpKdkmMixCyzygXUPrXZlqAAzvub',
  database: 'railway',
  port: 27096
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;
