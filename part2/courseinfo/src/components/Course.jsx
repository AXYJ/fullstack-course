const Course = ({ course }) => {
  return (
    <>
      <Header props={course} />
      <Content props={course} />
    </>
  )
}

export default Course

const Header = (props) => {
  return (
    <>
      <h1>{props.props.name}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.props.map(course => (
          <Detail key={course.name} name={course.name} children={course.parts} />
        ))}

    </>
  )
}

const Detail = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <ul>
        {props.children.map(e => (
          <Part key={e.name} name={e.name} exercises={e.exercises}/>
        ))}
        <Total exercises={props.children}/>
      </ul>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Total = (props) => {
  console.log(props);
  console.log("total", props.exercises);
  const total = props.exercises.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Total of {total} exercices</p>
}