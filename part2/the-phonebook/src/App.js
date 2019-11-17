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
      <button type='submit' disabled={!(newName && newNumber) /* fields are not empty */}>
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
        <li key={person.id} style={{ margin: '5px' }}>
          {person.name} {person.number}
          <button onClick={() => removePerson(person.id)}>Remove</button>
        </li>
      ))}
    </ul>
  )
}

const Notification = ({ notification }) => {
  // if (!message) return null
  // return <div className='error'>{message}</div>
  return !(notification && notification.text) ? null : (
    <div className={notification.error ? 'error' : 'success'}>{notification.text}</div>
  )
}

const App = () => {
  const [phonebook, setPhonebook] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({}) // { text, error }

  // Fetch and set phonebook from server
  const fetchPhonebook = () => {
    phonebookService.getPhonebook().then(phonebook => setPhonebook(phonebook))
  }
  useEffect(fetchPhonebook, [])

  const showNotification = (text, error = false, duration = 4500) => {
    setNotificationMessage({ text, error })
    setTimeout(() => {
      setNotificationMessage(null)
    }, duration)
  }

  const addPerson = event => {
    event.preventDefault()

    const duplicatePerson = phonebook.find(person => person.name === newName)
    if (duplicatePerson) {
      window.confirm(`${newName} is already in the phonebook!\nUpdate the number?`) &&
        updatePerson({ ...duplicatePerson, number: newNumber })
    } else {
      const newPerson = {
        id: phonebook[phonebook.length - 1].id + 1,
        name: newName,
        number: newNumber
      }
      phonebookService.addPerson(newPerson).then(addedPerson => {
        showNotification(`${addedPerson.name} was added to the phonebook!`)

        setPhonebook(phonebook.concat(addedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const removePerson = id => {
    phonebookService.removePerson(id).catch(() => {})
    setPhonebook(phonebook.filter(person => person.id !== id))
  }

  const updatePerson = updatedPerson => {
    phonebookService
      .updatePerson(updatedPerson)
      .then(returnedPerson => {
        showNotification(`${returnedPerson.name} was updated!`)

        // Update the returned person in the list
        setPhonebook(phonebook.map(person => (person.id !== updatedPerson.id ? person : returnedPerson)))
      })
      .catch(() => {
        showNotification(`${updatedPerson.name} has been removed from the server`, true)
        setPhonebook(phonebook.filter(person => person.id !== updatedPerson.id))
      })
  }

  const handleNameInputChange = event => setNewName(event.target.value)
  const handleNumberInputChange = event => setNewNumber(event.target.value)
  const handleFilterQueryChange = event => setFilterQuery(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notificationMessage} />
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
