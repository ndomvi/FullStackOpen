const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument to print the database or add new entrys')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://phonebook-backend:${password}@cluster0-ktnvl.mongodb.net/the-phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]
if (name && number) {
  const person = new Person({ name, number })

  person.save().then(response => {
    console.log(`Added ${person.name} with number ${person.number}!`)
    mongoose.connection.close()
  })
} else {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => console.log(`${person.name} - ${person.number}`))
    mongoose.connection.close()
  })
}
