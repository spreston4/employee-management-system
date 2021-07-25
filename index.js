const inquirer = require('inquirer');
const questions = require('./lib/questions');
const db = require('./lib/connect_db');

const init = () => {

    console.log(`
-------------------------------------------
--                                       --
--    Welcome to the Employee Tracker    -- 
--                                       --
-------------------------------------------
    `);
    
    askTodo();
};

const askTodo = () => {

    inquirer
        .prompt(questions.whatTodoQuestions)
        .then((ans) => {

            switch (ans.nextChoice) {

                case 'View all Departments':

                    db.query('SELECT * FROM department', (err, res) => err ? console.error(err) : console.log(res));
                    break;

                case 'View all Roles':

                    db.query('SELECT * FROM roles', (err, res) => err ? console.error(err) : console.log(res));
                    break;

                case 'View all Employees':

                    db.query('SELECT * FROM employee', (err, res) => err ? console.error(err) : console.log(res));
                    break;

                case 'Add a Department':
                    console.log('Add Department');
                    break;

                case 'Add a Role':
                    console.log('Add Role');
                    break;

                case 'Add an Employee':
                    console.log('Add Employee');
                    break;

                case 'Update an Employee Role':
                    console.log('Update Employee Roll');
                    break;

                case 'Exit Application':
                    console.log('Exit');
                    break;
            }
        })

        .catch(err => {
            if (err) throw err;
        });
};

init();