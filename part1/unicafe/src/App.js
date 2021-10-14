import React, { useState } from 'react'

const Button = ({ btnText, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{btnText}</button>
    </>
  )
}

const Header = ({ headerText }) => {
  return (
    <>
      <h1>{headerText}</h1>
    </>
  )
}


const Statistics = ({ good, neutral, bad, all, average }) => {
  if (all === 0) {
    return (
      <>
        <p>No Feedback given</p>
      </>
    )
  }
  return (
    <>
      <table>
        <thead></thead>
        <tbody>
          <StatisticLine statName='good' statValue={good}></StatisticLine>
          <StatisticLine statName='neutral' statValue={neutral}></StatisticLine>
          <StatisticLine statName='bad' statValue={bad}></StatisticLine>
          <StatisticLine statName='all' statValue={all}></StatisticLine>
          <StatisticLine statName='average' statValue={all / 3}></StatisticLine>
          <StatisticLine statName='positve percentage' statValue={(good / all) * 100}></StatisticLine>
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({ statName, statValue }) => {
  return (
    <tr>
      <td>{statName}</td>
      <td>{statValue}</td>
    </tr>
  )
}
const App = () => {
  //state variables
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)


  //increment functions
  const increaseGood = () => {
    setGood(good + 1);
    setTotal(total + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1)

  }

  const increaseBad = () => {
    setBad(bad + 1);
    setTotal(total + 1)

  }


  return (
    <>
      <Header headerText='Give Feedback'></Header>
      <div>
        <Button onClick={increaseGood} btnText='good' />
        <Button onClick={increaseNeutral} btnText='neutral'></Button>
        <Button onClick={increaseBad} btnText='bad' />
      </div>
      <Header headerText='Statistics'></Header>
      <Statistics good={good} neutral={neutral} bad={bad} all={total}></Statistics>
    </>

  )
}

export default App