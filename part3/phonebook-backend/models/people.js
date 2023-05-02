const mongoose = require('mongoose');

//  All fields will be saved to database
//  even if some are not specified in schema model
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('Connecting to', url);

mongoose.connect(url)
    .then((result) => {
      console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
      console.log('Failed to connect to MongoDB:', error.message);
    });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: Number,
    minLength: 8,
    validate: {
      /*
            *   ^       matches string start
            *   \d{2,3} matches 2 or 3 digits
            *   -       matches hyphen character
            *   \d+     matches 1 or more digits
            *   $       matches string end
            */
      validator: function(number) {
        return /^\d{2,3}-\d+$/.test(number);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,

  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
