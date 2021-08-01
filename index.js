const inquirer = require('inquirer');
const util = require('util');
const questions = require('./lib/questions');
const db = require('./lib/connect_db');
const query = util.promisify(db.query).bind(db);


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

                    viewAllDepts();
                    // viewAll('department');
                    break;

                case 'View all Roles':

                    viewAllRoles();
                    // viewAll('roles');
                    break;

                case 'View all Employees':

                    viewAllEmps();
                    // viewAll('employee');
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

// const viewAll = (table) => {

//     db.query(`SELECT * FROM ??`, table, (err, res) => {

//         if (err) {
//             console.error(err)
//         } else {
//             console.log('\n')
//             console.table(res)
//             console.log('\n')
//             askTodo();
//         } 
//     });
// };

const viewAllDepts = async () => {

    const res = await query(`
    SELECT id, name AS department 

    FROM department;`)

    displayTable(res);
    askTodo();
};

const viewAllRoles = async () => {

    const res = await query (`
    SELECT roles.id, roles.title, department.name AS department, roles.salary 

    FROM roles 

    JOIN department ON roles.department_id = department.id;
    `)
    
    displayTable(res);
    askTodo();
};

const viewAllEmps = async () => {

    const res = await query (`
    SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS employee, roles.title AS role, roles.salary AS salary, department.name AS department, CONCAT(mang.first_name, " ", mang.last_name) AS manager

    FROM employee

    JOIN roles on employee.role_id = roles.id

    JOIN department ON roles.department_id = department.id

    JOIN employee mang ON mang.id = employee.manager_id;
    `)

    displayTable(res);
    askTodo();
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

const displayTable = (data) => {
    console.log('\n');
    console.table(data);
    console.log('\n');
};

init();