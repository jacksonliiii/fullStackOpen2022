const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const databaseName = 'phonebookApp';
const url = `mongodb+srv://jacksonli2001:${password}@cluster0.js9pg0c.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

/*
*  Schema tells Mongoose how note objects will be stored in the datbase
*  Mongoose convention names collections as lowercase plural
*  Mongoose convention names models as uppercase singular
*/
const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 4) {
  Person
      .find({})
      .then((result) => {
        console.log('phonebook:');
        result.forEach((person) => {
          console.log(person.name, person.number);
        });
        mongoose.connection.close();
      });
} else {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log('Added', result.name, 'number', result.number, 'to phonebook');
    mongoose.connection.close();
  });
}
