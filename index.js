const inquirer = require('inquirer');
const util = require('util');
const questions = require('./lib/questions');
const db = require('./lib/connect_db');
const { totalmem } = require('os');
const { connect } = require('./lib/connect_db');
const query = util.promisify(db.query).bind(db);

// init begins the application
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

// askTodo will ask the suer what they want to do and call the appropriate functions
const askTodo = () => {

    inquirer
        .prompt(questions.whatTodoQuestions)
        .then((ans) => {

            switch (ans.nextChoice) {

                case 'View all Departments':

                    viewAllDepts();
                    break;

                case 'View all Roles':

                    viewAllRoles();
                    break;

                case 'View all Employees':

                    viewAllEmps();
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


// viewAllDepts will display all current departments 
const viewAllDepts = async () => {

    const res = await query(`
    SELECT id, name AS department 
    FROM department;`)

    displayTable(res);
    askTodo();
};

// viewAllRoles will display all current roles
const viewAllRoles = async () => {

    const res = await query (`
    SELECT roles.id, roles.title, department.name AS department, roles.salary 
    FROM roles 
    JOIN department ON roles.department_id = department.id;
    `)
    
    displayTable(res);
    askTodo();
};

// viewAllEmps will display all current employees
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

// addDept will allow the user to add a new department
const addDept = async () => {

    const newDept = await inquirer.prompt(questions.addDeptQuestions);

    await query(`INSERT INTO department (name) VALUES (?)`, newDept.depName.trim());
    await viewAllDepts();
};

// addRole will allow the user to add a new role
const addRole = async () => {

    // Populate choices for role questions
    await getDepts();

    const newRole = await inquirer.prompt(questions.addRoleQuestions)

    // Determine department id
    const deptQuery = await query(`SELECT id from department WHERE name = (?)`, newRole.roleDept);
    const deptId = deptQuery[0].id;

    await query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,[newRole.roleName, parseInt(newRole.roleSalary), deptId]);

    viewAllRoles();
};

// addEmp will allow the user to add a new employee
const addEmp = async () => {

    // Populate choices for employee questions
    await getRoles();
    await getEmps();

    const newEmp = await inquirer.prompt(questions.addEmpQuestions);

    console.log(newEmp);

    // Determine role id

    // Determine manager id

    await askTodo();
};

// updateEmpt will allow the user to update the role of an existing employee
const updateEmp = () => {

    console.log('Update employee');
    askTodo();
}


// exitApp closes the program
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

// displayTable standardizes table output formatting
const displayTable = (data) => {
    console.log('\n');
    console.table(data);
    console.log('\n');
};

// getDepts will query all available departments, then populate questions.deptArr with results
const getDepts = async () => {
    
    // Query all departments
    const allDepts = await query(`SELECT * FROM department;`);

    // Populate deptArr
    for (const depts of allDepts) {
        const dept = {};
        dept.id = depts.id;
        dept.name = depts.name;
        questions.deptArr.push(dept);
    };
};

// getDepts will query all available roles, then populate questions.roleArr with results
const getRoles = async () => {

    const allRoles = await query(`SELECT * FROM roles;`);

    for (const roless of allRoles) {
        const role = {};
        role.id = roless.id;
        role.name = roless.title;
        questions.roleArr.push(role);
        console.log(role);
    };
};

// getEmps will query all available employees, then populate questions.empArr with results
const getEmps = async () => {

    const allEmps  = await query(`SELECT * FROM employee;`);
    
    for (const emps of allEmps) {
        const emp = {};
        emp.id = emps.id;
        emp.name = `${emps.first_name} ${emps.last_name}`;
        questions.empArr.push(emp);
    };
};

// Run Program
init();