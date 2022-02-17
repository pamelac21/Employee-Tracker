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
