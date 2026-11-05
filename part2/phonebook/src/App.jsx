import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'


import { create, deletePerson, updatePerson } from './services/Notes';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filter={filter} setFilter={setFilter} />

      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setMessage={setMessage} setMessageClass={setMessageClass} />

      <Persons persons={persons} setPersons={setPersons} filter={filter} />

      <Notification message={message} messageClass={messageClass}></Notification>

    </div>
  )
}

const Filter = ({ filter, setFilter }) => {
  const handleInputFilter = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      filter shown <input onChange={handleInputFilter} value={filter} />
    </div>
  )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons, setMessage, setMessageClass }) => {
  const handleInputName = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewPerson = (event) => {

    event.preventDefault()

    if (newName === "" || newNumber === "") {
      alert("Remplisser tous les champs")
      return
    }

    const newperson = {
      name: newName,
      number: newNumber,
    }

    const isNotUnique = persons.find(person => {
      return person.name === newperson.name
    })

    if (!isNotUnique) {
      create(newperson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))

          setMessage(
            `Added '${createdPerson.name}'`
          )
          setMessageClass("message")
          setTimeout(() => {
            setMessage(null)
            setMessageClass(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error);
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {

        updatePerson({ ...isNotUnique, number: newNumber })
          .then(updatedPerson =>
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
          )
          .catch(error => {
            console.log(error)
            setMessage(
              `Information of '${isNotUnique.name}' has already been removed from server`
            )
            setMessageClass('error')
            setPersons(persons.filter(p => p.id !== isNotUnique.id))
            setTimeout(() => {
              setMessage(null)
              setMessageClass(null)
            }, 5000)

            
          })
      }
    }

    setNewName("")
    setNewNumber("")
  }

  return (
    <>
      <h2>Add a new</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input onChange={handleInputName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleInputNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({ persons, setPersons, filter }) => {

  const toShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => console.log(error))
    }

  }

  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {toShow.map(person => (
          <li key={person.id}>{person.name} - {person.number} <button onClick={() => handleDelete(person)}>delete</button></li>
        ))}
      </ul>
    </>
  )
}

export default App

const Notification = ({ message, messageClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageClass}>
      {message}
    </div>
  )
}