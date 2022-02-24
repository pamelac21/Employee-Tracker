const inquirer = require("inquirer");
const db = require('./db/connection');
const cTable = require('console.table');
require('dotenv').config()
console.log(process.env) // remove this 


const promptUser = () => {

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectAction',
                message: "What would you like to do?",
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Finished'
                ]
            }
        ]).then(({ selectAction }) => {
            if (selectAction === 'View all departments') {
                viewDepartments();
            }
            if (selectAction === 'View all roles') {
                viewRoles();
            }
            if (selectAction === 'View all employees') {
                viewEmployees();
            }
            if (selectAction === 'Add a department') {
                addDepartment();
            }
            if (selectAction === 'Add a role') {
                addRole();
            }
            if (selectAction === 'Add an employee') {
                addEmployee();
            }
            if (selectAction === 'Update an employee role') {
                updateEmployee();
            }
            if (selectAction === 'Finished') {
                process.exit()
            }
        });

}
const viewDepartments = () => {
    const sql = `SELECT id AS id, name AS department
                FROM department`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        promptUser();
    });
};

const viewRoles = () => {
    const sql = `SELECT 
                role.id,
                role.title,
                role.salary,
                department.name AS department
                
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        promptUser();
    });
}

const viewEmployees = () => {
    const sql = `SELECT 
                employee.id,
                employee.first_name,
                employee.last_name,
                role.title AS role,
                department.name AS department,
                role.salary,
                CONCAT(manager.first_name, " ", manager.last_name) AS manager
                FROM employee 
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        promptUser();
    });
}
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'Enter new department name:'
            }
        ]).then(input => {
            const params = input.department;
            const sql = `INSERT INTO department (name)
                    VALUES (?)`;

            db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log('Department Added');
                promptUser();
            });
        });
}

const addRole = () => {

    const deptQuery = `SELECT * FROM department`;

    db.query(deptQuery, (err, result) => {
        if (err) throw err;
        const departments = result.map(({ name, id }) => ({ name: name, value: id }));

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'Enter new role name:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter new role salary:'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'What department does this role belong to?',
                    choices: departments
                }

            ]).then(input => {
                const params = [input.role, input.salary, input.department]
                const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?,?,?)`

                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log('Role Added');
                    promptUser();
                });
            });
    });
}

const addEmployee = () => {

    const roleQuery = `SELECT * FROM role`;
    const managerQuery = `SELECT * FROM employee`;

    db.query(roleQuery, (err, result) => {
        if (err) throw err;
        const roles = result.map(({ title, id }) => ({ name: title, value: id }));
        db.query(managerQuery, (error, data) => {
            if (error) throw err;
            const managers = data.map(({ first_name, last_name, id }) => ({ name: first_name + " " + last_name, value: id }));
          


            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: "Enter employee's first name:"
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: "Enter employee's last name:"
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is this employee's role?",
                        choices: roles
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Who is this employee's manager?",
                        choices: managers
                    }
                ]).then(input => {
                    const params = [input.firstName, input.lastName, input.role, input.manager]
                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                VALUES (?, ?, ?, ?)`
                    db.query(sql, params, (err, result) => {
                        if (err) throw err;
                        console.log('Employee added');
                        promptUser();
                    });
                });
        });
    });
}