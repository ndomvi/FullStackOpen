import React, { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'

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

const PhonebookList = ({ phonebook, filterQuery, removePerson }) => {
  const filteredList = list => list.filter(person => person.name.toLowerCase().startsWith(filterQuery.toLowerCase()))

  return (
    <ul>
      {filteredList(phonebook).map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => removePerson(person.id)}>Remove</button>
        </li>
      ))}
    </ul>
  )
}

const App = () => {
  const [phonebook, setPhonebook] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')

  // Fetch and set phonebook from server
  const fetchPhonebook = () => {
    phonebookService.getPhonebook().then(phonebook => setPhonebook(phonebook))
  }
  useEffect(fetchPhonebook, [])

  const addPerson = event => {
    event.preventDefault()

    const duplicatePerson = phonebook.find(person => person.name === newName)
    if (duplicatePerson) {
      window.confirm(`${newName} is already in the phonebook!\nUpdate the number?`) &&
        updatePerson(duplicatePerson.id, { ...duplicatePerson, number: newNumber })
    } else {
      const newPerson = {
        id: phonebook[phonebook.length - 1].id + 1,
        name: newName,
        number: newNumber
      }
      phonebookService.addPerson(newPerson).then(addedPerson => {
        setPhonebook(phonebook.concat(addedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const removePerson = id => {
    phonebookService.removePerson(id)
    setPhonebook(phonebook.filter(person => person.id !== id))
  }

  const updatePerson = (id, updatedPerson) => {
    phonebookService.updatePerson(id, updatedPerson).then(returnedPerson => {
      setPhonebook(phonebook.map(person => (person.id !== id ? person : returnedPerson)))
    })
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
      <PhonebookList phonebook={phonebook} filterQuery={filterQuery} removePerson={removePerson} />
    </div>
  )
}

export default App
