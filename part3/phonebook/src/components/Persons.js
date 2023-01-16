const Person = ({name, number, id, deleteName}) => {
    return (
      <div className="number-individual">
        <p className="pn">{name} {number}</p> <button className="delete-button" onClick={() => deleteName(id)}>Delete</button>
      </div>
    )
  }
  
const Persons = ({persons, filter, deleteName}) => {
    return (
    <div className="number-list">
        {persons.filter(person => person.name.includes(filter)).map(person => 
        <Person key={person.name} name={person.name} number={person.number} id={person.id} deleteName={deleteName}/>)}
    </div>
    )
}

export default Persons