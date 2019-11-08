import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Stats = ({ feedback: { good, neutral, bad } }) => {
  // We spread feedback from props and then spread it to individual numbers
  return good | neutral | bad ? (
    <div>
      <h1>Stats:</h1>
      <table>
        <tbody>
          <Statistic text='Good' value={good} />
          <Statistic text='Neural' value={neutral} />
          <Statistic text='Bad' value={bad} />
          <tr />
          <Statistic text='Average' value={(good - bad) / (good + neutral + bad)} />
          <Statistic text='Positive' value={(good / (good + neutral + bad)) * 100 + '%'} />
        </tbody>
      </table>
    </div>
  ) : (
    <div>No feedback given yet!</div>
  )
}

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 })
  return (
    <>
      <div>
        <h1>Give feedback!</h1>
        <Button onClick={() => setFeedback({ ...feedback, good: feedback.good + 1 })} text='Good' />
        <Button onClick={() => setFeedback({ ...feedback, neutral: feedback.neutral + 1 })} text={'Neutral'} />
        <Button onClick={() => setFeedback({ ...feedback, bad: feedback.bad + 1 })} text={'Bad'} />
      </div>
      <Stats feedback={feedback} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
