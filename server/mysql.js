const mysql = require('mysql2');

const handleDisconnect = () => {
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rafi1988',
      database: 'health'
    });
  
    db.connect(err => {
      if (err) {
        console.error('Error reconnecting to MySQL:', err);
        setTimeout(handleDisconnect, 2000); 
      } else {
        console.log('Reconnected to MySQL!');
      }
    });
  
    db.on('error', err => {
      console.error('MySQL error:', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect(); // חידוש חיבור אוטומטי
      } else {
        throw err;
      }
    });
  
    return db;
  };
  
  const db = handleDisconnect();
  
  const Query = (q, params) => {
    return new Promise((resolve, reject) => {
      db.query(q, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
  
  module.exports = Query;
  