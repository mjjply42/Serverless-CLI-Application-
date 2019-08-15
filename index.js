const mongoose = require('mongoose');

//Map global promise - get rid of warning
mongoose.Promise = global.Promise;
//Connect to db
const db = mongoose.connect('mongodb://localhost:27017/customercli', { useNewUrlParser: true });

//Import Mongoose customer model
const Customer = require('./models/customer');

//Add Customer
const addCustomer = (customer)=> {
    Customer.create(customer).catch(() => {
        console.info('Failed to create Customer');
        mongoose.connection.close();
    }).then(customer => {
        console.info('New Customer Added');
        console.info(customer);
        mongoose.connection.close();
    });
}

//Find customer
const findCustomer = (name) => {
    //Make case insensitive
    const search = new RegExp(name, 'i');
    Customer.find({$or:[{firstname: search}, {lastname: search}]})
    .catch(() => {
        console.info('No Customer found');
        mongoose.connection.close();
    }).then(customer => {
            console.info(customer);
            console.info(`${customer.length} matches`);
            mongoose.connection.close();
        });
}

//Update Customer
const updateCustomer = (_id, customer) =>
{
    Customer.updateOne({_id}, customer).catch(() => {
        console.info("Failed to update Customer");
        mongoose.connection.close();
    }).then(customer => {
        console.info("Customer updated");
        mongoose.connection.close();
    })
}

//Remove Customer
const removeCustomer = (_id) =>
{
    Customer.remove({_id}).catch(() => {
        console.info("Failed to update Customer");
        mongoose.connection.close();
    }).then(customer => {
        console.info("Customer updated");
        mongoose.connection.close();
    })
}

//List all Customer
const listCustomers = () => {
    Customer.find().catch(() => {
        console.info("Could not retrive customers");
        mongoose.connection.close();
    })
    .then(customers => {
        console.info(customers);
        console.info(`${customers.length} matches`);
        mongoose.connection.close();
    })
}

//Export all methods
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers,
}