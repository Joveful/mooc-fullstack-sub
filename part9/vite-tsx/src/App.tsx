import type { ReactNode } from "react"


interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  description: string,
  requirements: string[],
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = ({ name }: { name: string }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <div>
      {courses.map((c: CoursePart): ReactNode => {
        switch (c.kind) {
          case 'basic':
            return (
              <div>
                <p><b>{c.name} {c.exerciseCount}</b><br />
                  <i>{c.description}</i></p>
              </div>
            )
          case 'group':
            return (
              <div>
                <p><b>{c.name} {c.exerciseCount}</b><br />
                  project exercises {c.groupProjectCount}</p>
              </div>
            )
          case 'background':
            return (
              <div>
                <p><b>{c.name} {c.exerciseCount}</b><br />
                  <i>{c.description}</i><br />
                  submit to {c.backgroundMaterial}</p>
              </div>)
          case 'special':
            return (
              <div>
                <p><b>{c.name} {c.exerciseCount}</b><br />
                  <i>{c.description}</i><br />
                  requirements: {c.requirements.map((r: string) => r + ' ')}</p>
              </div>
            )
          default:
            break;
        }
      })}
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
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
