const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

// eslint-disable-next-line no-unused-vars
mongoose.connect(url).then(result => {
  console.log('connected to mongodb')
})
  .catch((error) => {
    console.log('error connecting to mongodb', error.messsage)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 3,
    required: true
  },
})
// eslint-disable-next-line no-unused-vars
const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)