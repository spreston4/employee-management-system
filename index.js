const inquirer = require('inquirer');
const questions = require('./lib/questions');
const db = require('./lib/connect_db');

const init = () => {

    console.log(`
-----------------------------------------------------
--                                                 --
--                 Welcome to the                  --
--           Employee Management System            --
--                                                 --
-----------------------------------------------------
    `);
    
    askTodo();
};

const askTodo = () => {

    inquirer
        .prompt(questions.whatTodoQuestions)
        .then((ans) => {

            switch (ans.nextChoice) {

                case 'View all Departments':

                    viewAll('department');
                    break;

                case 'View all Roles':

                    viewAll('roles');
                    break;

                case 'View all Employees':

                    viewAll('employee');
                    break;

                case 'Add a Department':

                    addDept();
                    break;

                case 'Add a Role':
                    
                    addRole();
                    break;

                case 'Add an Employee':

                    addEmp();
                    break;

                case 'Update an Employee Role':

                    updateEmp();
                    break;

                case 'Exit Application':

                    exitApp();
                    break;
            }
        })

        .catch(err => {
            if (err) throw err;
        });
};

const viewAll = (table) => {

    db.query(`SELECT * FROM ??`, table, (err, res) => {

        if (err) {
            console.error(err)
        } else {
            console.log('\n')
            console.table(res)
            console.log('\n')
            askTodo();
        } 
    });
};

const addDept = () => {

    inquirer
        .prompt(questions.addDeptQuestions)
        .then((ans) => {

            // console.log(ans.depName);
            db.query(`INSERT INTO department (name) VALUES ("${ans.depName}");`, (err, results) => {

                if(err){
                    console.error(err);
                }
            });

            askTodo();
        });
};

const addRole = () => {

    console.log('Add role');
    askTodo();
};

const addEmp = () => {

    console.log('Add employee');
    askTodo();
};

const updateEmp = () => {

    console.log('Update employee');
    askTodo();
}

const exitApp = () => {

    console.log(`
    -----------------------------------------------------
    --                                                 --
    --              Thanks for using the               --
    --           Employee Management System            --
    --                                                 --
    -----------------------------------------------------
        `);

    process.exit();
}

init();