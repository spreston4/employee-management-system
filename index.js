const inquirer = require('inquirer');
const questions = require('./lib/questions');

const init = () => {
    
    console.log('Welcome to the Employee Tracker \n-----------------------------------')
    askTodo();
}

const askTodo = () => {

    inquirer
        .prompt(questions.whatTodoQuestions)
        .then((nAns) => {

            console.log(`Next Choice: ${nAns.nextChoice}`);
        })
}

init();