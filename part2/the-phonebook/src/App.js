/* global alert */
import React, { useState } from 'react'

const NewPersonForm = ({ newName, newNumber, addPerson, handleNameInputChange, handleNumberInputChange }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input onChange={handleNameInputChange} value={newName} />
    </div>
    <div>
      number: <input onChange={handleNumberInputChange} value={newNumber} />
    </div>
    <div>
      <button type='submit' disabled={!(newName && newNumber)}>
        add
      </button>
    </div>
  </form>
)

const FilterField = ({ filterQuery, handleFilterQueryChange }) => (
  <div>
    filter names starting with: <input onChange={handleFilterQueryChange} value={filterQuery} />
  </div>
)

const PhonebookList = ({ persons, filterQuery }) => {
  const filteredList = list => list.filter(person => person.name.toLowerCase().startsWith(filterQuery.toLowerCase()))

  return (
    <div>
      {filteredList(persons).map(person => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ id: 0, name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')

  const addPerson = event => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook!`)
    } else {
      const newPerson = { id: persons[persons.length - 1].id + 1, name: newName, number: newNumber }

      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameInputChange = event => setNewName(event.target.value)
  const handleNumberInputChange = event => setNewNumber(event.target.value)
  const handleFilterQueryChange = event => setFilterQuery(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new person!</h2>
      <NewPersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
      />
      <h2>Numbers</h2>
      <FilterField filterQuery={filterQuery} handleFilterQueryChange={handleFilterQueryChange} />
      <PhonebookList persons={persons} filterQuery={filterQuery} />
    </div>
  )
}

export default App
