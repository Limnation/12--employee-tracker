// Includes packages needed for this application
const inquirer = require("inquirer");

// gets Specific arrays { questions } from questions.js
const {
  questions,
  departments,
  managers,
  addEmployeeArr,
  addDepartmentArr,
  addRoleArr,
} = require("./lib/questions.js");

// gets Specific object { connection } from questions.js
const { connection } = require("./db/connectiond.js");

// arrow fucntion that prompts
const prompts = () => {
  inquirer.prompt(questions).then((questionsData) => {
    switch (questionsData.cases) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "View All Employees by Department":
        viewAllEmployeesByDepartment();
        break;
      case "View All Employees by Manager":
        viewAllEmployeesByManager();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRole();
        break;
      case "View Employee":
        viewEmployee();
        break;
      case "View Department":
        viewDepartment();
        break;
      case "View Role":
        viewRole();
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      default:
        exit();
        break;
    }
  });
};

// View All Employees
viewAllEmployees = () => {
  const sqlQuery = `SELECT e.id, e.first_name, e.Last_name, r.title, d.name as "Department", salary
  FROM employees as e
  LEFT JOIN roles as r 
  ON e.role_id = r.id 
  LEFT JOIN department as d 
  ON r.department_id = d.id;`;
  connection.query(sqlQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
    prompts();
  });
};

// View All Employees by Department
viewAllEmployeesByDepartment = () => {
  inquirer.prompt(departments).then((departmentsData) => {
    const sqlQuery = `
    SELECT department.id AS 'department_id', name AS 'department', e.first_name, e.last_name
    FROM department
    LEFT JOIN roles r ON department.id = r.department_id
    LEFT JOIN employees e ON e.role_id = r.id
    where name='${departmentsData.department}'
    GROUP BY department_id, name, e.first_name, e.last_name;
    `;
    connection.query(sqlQuery, (err, res) => {
      if (err) throw err;
      console.table(res);
      prompts();
    });
  });
};

// View All Employees by Manager
viewAllEmployeesByManager = () => {
  inquirer.prompt(managers).then((managerData) => {
    const sqlQuery = `
    SELECT first_name, last_name, r.title
    FROM employees e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN department d ON d.id = r.department_id
    WHERE first_name='${managerData.managerFName}'
    GROUP BY first_name, last_name, r.title;
    `;
    connection.query(sqlQuery, (err, res) => {
      if (err) throw err;
      console.table(res);
      prompts();
    });
  });
};

// Select role Array for Prompt
function selectRoleArr() {
  var roleArr = [];
  const sqlQuery = `SELECT * FROM roles;`;
  connection.query(sqlQuery, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}

// Add Employee
addEmployee = () => {
  inquirer.prompt(addEmployeeArr).then((EmployeeData) => {
    const sqlQuery = `INSERT INTO employees SET ?;`;
    connection.query(
      sqlQuery,
      {
        first_name: EmployeeData.fName,
        last_name: EmployeeData.LName,
        role_id: EmployeeData.role,
        manager_id: EmployeeData.managerName,
      },
      (err, res) => {
        if (err) throw err;
        console.table(res);
        prompts();
      }
    );
  });
};

// Add Department
addDepartment = () => {
  const sqlQuery = ``;
  connection.query(sqlQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
    prompts();
  });
};

// Add Role
addRole = () => {
  const sqlQuery = ``;
  connection.query(sqlQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
    prompts();
  });
};

// View employees
function viewEmployee() {
  var query = "";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    prompts();
  });
}

// View Role
function viewRole() {
  var query = "";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    prompts();
  });
}

// View Department
function viewDepartment() {
  var query = "";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    prompts();
  });
}

// Update Employee Role
updateEmployeeRole = () => {
  const sqlQuery = ``;
  connection.query(sqlQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
    prompts();
  });
};

// exit
exit = () => {
  connection.end();
};

// Creates a function to initialize app
function init() {
  prompts();
}

// Function call to initialize app
init();

// Exports
module.exports = { selectRoleArr };
