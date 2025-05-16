import type { ReactNode } from "react"

interface CourseProps {
  name: string,
  exerciseCount: number
}

interface Courses {
  courses: CourseProps[]
}

const Header = ({ name }: { name: string }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ courses }: Courses) => {
  return (
    <div>
      {courses.map((c: CourseProps): ReactNode =>
        <p>{c.name}</p>
      )}
    </div>
  )
}

const Total = ({ totalExercises }: { totalExercises: number }) => {
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
