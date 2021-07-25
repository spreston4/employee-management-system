const deptArr = ['Test Dept 1', 'Test Dept 2'];
const roleArr =['Test Role 1', 'Test Role 2'];
const empArr =['Test Employee 1', 'Test Employee 2'];

const whatTodoQuestions =
{
    type: 'list',
    message: 'What would you like to do?',
    name: 'nextChoice',
    choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit Application']
};

const addDeptQuestions = 
{
    type: 'input',
    message: 'Enter a name for the new department:',
    name: 'depName'
};

const addRoleQuestions = [
    {
        type: 'input',
        message: 'Enter a name for the new role:',
        name: 'roleName'
    },
    {
        type: 'input',
        message: 'Enter a salary for the new role:',
        name: 'roleSalary'
    },
    {
        type: 'list',
        message: 'Select a department for the new role:',
        name: 'roleDept',
        choices: deptArr
    }
];

const addEmpQuestions = [
    {
        type: 'input',
        message: "Enter the new employee's first name:",
        name: 'firstName'
    },
    {
        type: 'input',
        message: "Enter the new employee's last name:",
        name: 'lastName'
    },
    {
        type: 'list',
        message: 'Select a role for the new employee:',
        name: 'empRole',
        choices: roleArr
    },
    {
        type: 'list',
        message: 'Select a manager for the new employee:',
        name: 'empManager',
        choices: empArr
    }
];

const updateRoleQuestions = [
    {
        type: 'list',
        message: 'Select an employee to update:',
        name: 'empUpdate',
        choices: empArr
    },
    {
        type: 'list',
        message: 'Select a new role for the employee:',
        name: 'roleUpdate',
        choices: roleArr
    }
];

module.exports = { whatTodoQuestions, addDeptQuestions, addRoleQuestions, addEmpQuestions, updateRoleQuestions, deptArr, roleArr, empArr };