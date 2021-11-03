import React from "react";


const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0)
  
    return (
      <h4>Total of {sum} exercises</h4>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
        <Total course={course}></Total>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <>
        <Header course={course}></Header>
        <Content course={course}></Content>
      </>
    )
  }
  
  export default Course;