import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((personsData) => setPersons(personsData));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const personFound = persons.find((person) => person.name === newName);
    if (personFound) {
      if (window.confirm(`${personFound.name} is already added to phonebook, replace the old number with a new one?`)) {
        const newPersonObj = {
          ...personFound,
          number: newNumber,
        };
        phonebookService
          .update(personFound.id, newPersonObj)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id === returnedPerson.id ? returnedPerson : person)));
            setMessage({ content: `${returnedPerson.name}'s number is changed`, type: "info" });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setPersons(persons.filter((person) => person.id !== personFound.id));
            setMessage({ content: `Information of ${personFound.name} has already been removed from the server`, type: "error" });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
      setNewName("");
      setNewNumber("");
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
      };
      phonebookService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage({ content: `Added ${returnedPerson.name}`, type: "info" });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const removePerson = (id) => {
    const personToRemove = persons.find((person) => person.id === id);
    window.confirm(`Delete ${personToRemove.name}?`)
      ? phonebookService.deletePerson(id).then((response) => {
          setPersons(persons.filter((persons) => persons.id !== response.id));
          setMessage({ content: `Removed ${response.name}`, type: "info" });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
      : "";
  };

  const handleFilteringPersons = (event) => {
    setFilterText(event.target.value);
  };

  const numbersToShow = persons.filter((person) => person.name.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter value={filterText} onChange={handleFilteringPersons} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons numbersToShow={numbersToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
