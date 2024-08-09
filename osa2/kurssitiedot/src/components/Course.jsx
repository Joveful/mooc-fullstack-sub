const Course = ({course}) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
  </div>
)
  
const Header = ({name}) => (
  <div>
      <h2>{name}</h2>
  </div>
)

const Part = ({part}) => (
  <div>
    <p>{part.name} {part.exercises}</p>
  </div>
)

const Content = ({parts}) => (
  <div>    
    {parts.map(part =>
        <Part key={part.id} part={part} />
    )}
    <Total arr={parts.map(part => part.exercises)} />
  </div>
)


const Total = ({arr}) => (
  <div>
    <p>
      <b>Total number of exercises {arr.reduce((acc, val) => acc + val, 0)}</b>
    </p>
  </div>
)

export default Course