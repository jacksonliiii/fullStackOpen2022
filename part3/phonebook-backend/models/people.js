const mongoose = require('mongoose');

//  All fields will be saved to database
//  even if some are not specified in schema model
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('Connecting to', url);

mongoose.connect(url)
    .then(result => {
        console.log("Successfully connected to MongoDB");
    })
    .catch(error => {
        console.log("Failed to connect to MongoDB:", error.message);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
