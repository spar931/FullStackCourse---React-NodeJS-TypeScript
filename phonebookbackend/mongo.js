const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('node <filename> <password> <name> <number> to add a person to phonebook.\
  If no name and number is provided, then all entries in phonebook will be displayed')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('missing name or number')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://spar931:${password}@phonebook.slucli1.mongodb.net/Persons?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(
    console.log('person saved!'),
    mongoose.connection.close()
  )
}