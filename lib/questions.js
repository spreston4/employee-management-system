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

module.exports = { whatTodoQuestions, addDeptQuestions };