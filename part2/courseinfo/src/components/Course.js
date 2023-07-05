const Header = ({name}) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Part = ({id, name, exercises}) => {
    return (
      <p>{name} {exercises}</p>
    )
  }
  
  const Content = ({arr}) => {
    return (
      <>
      {arr.map(item => <Part key={item.id} name={item.name} exercises={item.exercises}/>)}
      </>
      
    )
  }
  
  const Total = ({arr}) => {
    const val = arr.reduce((sum, item) => sum + item.exercises,0)
    return (
      <>
      <p>total of {val} exercises</p>
      </>
    )
  }
  
  
  const Course = (props) => {
    return (
      <div>
        <Header name={props.course.name}/>
        <Content arr={props.course.parts}/>
        <Total arr={props.course.parts}/>
      </div>
      
    )
  }
  
export default Course