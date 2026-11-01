import { useState } from 'react'

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const addCount = (feedback) => {
    if (feedback === "good") {
      setGood(good + 1)
    } else if (feedback === "neutral") {
      setNeutral(neutral + 1)
    } else if (feedback === "bad") {
      setBad(bad + 1)
    }
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => addCount("good")} children={"good"}></Button>
      <Button handleClick={() => addCount("neutral")} children={"neutral"}></Button>
      <Button handleClick={() => addCount("bad")} children={"bad"}></Button>

      <h1>statistics</h1>
      {total !== 0 ?
        <Statistics good={good} neutral={neutral} bad={bad} total={total} />
        :
        <p>No feedback given</p>
      }
    </div>
  )
}

export default App

const Button = ({ handleClick, children }) => {
  return (
    <button onClick={handleClick}>{children}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  return (
    <table>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.total} />
      <StatisticLine text="average" value={(props.good - props.bad) / props.total} />
      <StatisticLine text="positive" value={props.good / props.total + "%"} />
    </table>
  )

}