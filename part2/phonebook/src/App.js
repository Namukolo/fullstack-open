import React, { useEffect, useState } from 'react'
import Filter from './components/filter';
import Add from './components/add';
import Number from './components/Number'
import phonebookService from './services/phonebook';
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState([]);

  const hook = () => {
    phonebookService.getAll().then(response => {
      const notes = response;
      setPersons(notes)
      console.log(notes)
    })
  }

  useEffect(hook, [])

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterBy = (event) => {
    setFilter(event.target.value)
  }

  const deletePerson = (person) => {
    const result = window.confirm(`Delete ${person.name}?`)
    if (!result) { return; }
    phonebookService
      .remove(person.id)
      .then(response => {
        hook();

        setMessage([`Deleted ${person.name}`, 'success'])
        setTimeout(() => {
          setMessage([null, ''])
        }, 2000)
      }).catch((error) => {
        setMessage([`${person.name} has already been deleted`, 'error'])
        setTimeout(() => {
          setMessage([null, ''])
        }, 2000)
      })
  }

  const filteredPhonebook = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  const addNewName = (event) => {
    event.preventDefault();
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
      setNewName('');
      setNewNumber('');
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    phonebookService.create(nameObject
    ).then(response => {
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
      setMessage(`Addded ${response.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} filterBy={filterBy} />

      <h3>Add New</h3>
      <Add addNewName={addNewName} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange} />

      <h3>Numbers</h3>
      <ul>
        {filteredPhonebook.map((person, index) =>
          <Number
            key={index}
            person={person}
            deletePerson={() => deletePerson(person)} >

          </Number>
        )}
      </ul>
    </div>
  )
}

export default App