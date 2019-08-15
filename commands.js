#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');

const {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
} = require('./index');
//Customer questions to use on add
const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Customer First Name'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Customer Last Name'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Customer Phone Number'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Customer Email Addresss'
    }
];

//Version Command
program
    .version('1.0.0')
    .description('Client Managment System')

//Add Command
program
    .command('add')
    .alias('a')
    .description('Adds a customer')
    .action(() => {
        prompt(questions).catch(() => {
        console.info("Failed to create new Customer");
        }).then(answers => addCustomer(answers));
    });

//Find Command
program
    .command('find <name>')
    .alias('f')
    .description('Find a customer')
    .action(name => findCustomer(name));

program
    .command('update <_id>')
    .alias('u')
    .description('Update a customer')
    .action(_id => {
        prompt(questions).catch(() => {
        console.info("Failed to update Customer");
        }).then(answers => updateCustomer(_id, answers));
});

//Remove command
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a customer')
    .action(_id => removeCustomer(_id));

//List Command
program
    .command('list')
    .alias('l')
    .description('Lists all customers')
    .action(()=> listCustomers());
program.parse(process.argv);