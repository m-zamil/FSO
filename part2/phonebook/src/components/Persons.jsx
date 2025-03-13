const Person = ({ person, removePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button
        onClick={() => {
          removePerson(person.id);
        }}
      >
        delete
      </button>
    </div>
  );
};

const Persons = ({ numbersToShow, removePerson }) => {
  return numbersToShow.map((person) => <Person key={person.name} person={person} removePerson={removePerson} />);
};
export default Persons;
