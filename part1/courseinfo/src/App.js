import React, { useState } from 'react'
//HEADER COMPONENT
const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
}

// CONTENT COMPONENT
const Content = (props) => {
  return (
    <>
      <ul>
        <Part part={props.parts[0]}></Part>
        <Part part={props.parts[1]}></Part>
        <Part part={props.parts[2]}></Part>
      </ul>
    </>
  )
}

// PROPS COMPONENT
const Part = (props) => {
  return (
    <>
      <li>{props.part.name} : {props.part.exercises}</li>

    </>
  );
}

// TOTAL COMPONENT
const Total = (props) => {
  return (
    <div>
      <h2>TOTAL: {props.total}</h2>
    </div>
  )
}


//APP COMPONENT
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts} ></Content>
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} ></Total>
    </>
  )
}
export default App