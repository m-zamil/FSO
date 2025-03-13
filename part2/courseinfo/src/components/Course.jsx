const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  );
};

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);
const Total = (props) => {
  const sum = props.parts.reduce((sum, parts) => {
    return sum + parts.exercises;
  }, 0);

  return (
    <div>
      <strong>total of {sum} exercises</strong>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
