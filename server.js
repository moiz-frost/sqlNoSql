var express = require('express');
var mongoose = require('mongoose');
var customer = require('./model/customerModel')

// Create an instance of express
var app = express();


// Create DB Connection
var dbConnection = 'mongodb://localhost:27017/test';
mongoose.connect(dbConnection);

// Define the location for static resources
app.use(express.static('/'));

// Port defined by gulp, else 3000
var port = process.env.PORT || 3000;

// Get request at '/' to display all json objects from the customer collection
app.get('/', function (request, response) {
    customer.find({})
        .exec(function (error, customer) {
            if(error)
                response.send('Error Agaya!');
            else
                response.send(customer);
        });
});

// Get request for saving an object into the customer collection
app.get('/:name/:address/:zipcode', function (request, response) {
    var newCustomer = customer();
    newCustomer.name = request.params.name;
    newCustomer.address = request.params.address;
    newCustomer.zipCode =  request.params.zipcode;
    newCustomer.save(function (error, customer) {
        if(error)
            response.send('Error Agaya!');
        else
            response.json(customer);
    })
});


// Listening for port
app.listen(port, function () {
    console.log("Listening on port %s", port)
});