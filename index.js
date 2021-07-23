const inquirer = require('inquirer');
const questions = require('./lib/questions');

const init = () => {
    
    console.log('Welcome to the Employee Tracker \n-----------------------------------');
    askTodo();
};

const askTodo = () => {

    inquirer
        .prompt(questions.whatTodoQuestions)
        .then((ans) => {

            switch (ans.nextChoice) {

                case 'View all Departments':
                    console.log('Department List');
                    break;

                case 'View all Roles':
                    console.log('View Roles');
                    break;

                case 'View all Employees':
                    console.log('View Employees');
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