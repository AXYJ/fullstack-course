const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mutegrip80_db_user:${password}@cluster0.gcobzz0.mongodb.net/`

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


mongoose
    .connect(url)
    .then(() => {
        console.log('connected')

        if (!process.argv[3] || !process.argv[4]) {
            Person.find({}).then(result => {
                result.forEach(person => {
                    console.log(person.name, person.number)
                })
            })
        } else {
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            })

            console.log('added', person.name, 'number', person.number, 'to phonebook')
            return person.save()
        }
    })
    .then(() => {
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))


