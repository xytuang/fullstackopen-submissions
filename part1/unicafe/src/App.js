import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <>
    <button onClick={handleClick}>{text}</button>
    </>
  )
}

const StatisticLine = ({text,value}) => {
  if (text == "positive") {
    return (
      <>
      <p>{text} {value}%</p>
      </>
    )
  }
  return (
    <>
    <p>{text} {value}</p>
    </>
  )
}
const Statistics = ({good,neutral,bad}) => {
  if (good === 0 && neutral === 0 && bad === 0){
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
    <h1>statistics</h1>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="average" value={(good * 1 + bad * -1)/(good + neutral + bad)}/>
    <StatisticLine text="positive" value={good/(good+neutral+bad)}/>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad+ 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


export default App;
