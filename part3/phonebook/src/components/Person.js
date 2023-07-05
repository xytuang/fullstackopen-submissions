const Person = ({person, deletePerson}) => {
    return (
      <>
      <p>{person.name} {person.number}</p>
      <button onClick={() => deletePerson(person.id)}>delete</button>
      </>
    )
  }

export default Person