const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

const databaseName = "noteApp"
const url = `mongodb+srv://jacksonli2001:${password}@cluster0.js9pg0c.mongodb.net/${databaseName}?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

/*
*  Schema tells Mongoose how note objects will be stored in the datbase
*  Mongoose convention names collections as lowercase plural
*  Mongoose convention names models as uppercase singular
*/
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'CSS is Hard',
//   important: true,
// })

// save() saves the note to the database
note.save().then(result => {
  console.log(result.content, 'was saved!')
  mongoose.connection.close()
})

/* find(condition) finds all notes matching the search conditions
*  find({}) returns every note
*  find({important: true}) returns only important notes
*/

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
