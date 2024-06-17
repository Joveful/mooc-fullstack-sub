import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text == "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>      
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all = props.good + props.bad + props.neutral
  const avg = (props.good - props.bad) / 
    (props.good + props.bad + props.neutral)
  const pos = props.good / 
    (props.good + props.bad + props.neutral) * 100
  
  if (all == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={avg} />
      <StatisticLine text="positive" value={pos} />
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}> 
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1>
        Give feedback
      </h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>
        Statistics
      </h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App