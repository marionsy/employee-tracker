// Require dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');

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

db.connect(err => {
    if (err) throw err;
    init();
})

const init = () => {
    inquirer.prompt({
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Quit"
        ]
    }).then((answer) => {
        switch (answer.start) {
            case "View All Departments":
                viewDepartments();
                break;

            case "View All Roles":
                viewRoles();
                break;

            case "View All Employees":
                viewEmployees();
                break;

            case "Add Department":
                break;

            case "Add Role":
                break;

            case "Add Employee":
                break;

            case "Update Employee Role":
                break;

            case "Quit":
                db.end();
                break;
        }
    });
}

// Function to view all departments
viewDepartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        init();
    });
}

// Function to view all roles
viewRoles = () => {
    const query = 'SELECT role.id, role.title, department.name as department, role.salary FROM role JOIN department ON department_id = department.id';
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        init();
    });
}

// Function to view all employees
viewEmployees = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, concat(managers.first_name, \' \', managers.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee as managers ON managers.id = employee.manager_id;';
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        init();
    });
}

