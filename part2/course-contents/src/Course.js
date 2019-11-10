import React from 'react'

const Header = ({ text }) => {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </div>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  )
}

const Sum = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0) // '0' is defaultValue, prevents type mismatch

  return <div style={{ fontWeight: 'bold' }}>Total of {total}</div>
}

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
    </>
  )
}

export default Course
