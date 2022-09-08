// Require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection( 
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
)

// Queries database
db.query('SELECCT * FROM employee', function (err, results) {
    console.log(results);
  });
