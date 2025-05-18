import { useState, useEffect } from 'react';
import type { DiaryEntry, NewDiaryEntry } from './types';
import { createEntry, getAllEntries } from './services/diaryService';
import type { AxiosError } from 'axios';

const Notification = ({ message }: { message: string }) => {
  const notificationStyle = {
    color: 'red'
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, []);

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }

    createEntry(newEntry).then((data: DiaryEntry | AxiosError | string) => {
      if ((data as DiaryEntry).weather !== undefined) {
        setEntries(entries.concat((data as DiaryEntry)))
      } else if ("response" in (data as AxiosError)) {
        setNotificationMessage(String((data as AxiosError).response.data))
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
      } else {
        console.log(data)
      }
    })

    setDate('')
    setComment('')
  }

  return (
    <div>
      <h1>Add diary entry</h1>
      <Notification message={notificationMessage} />
      <form onSubmit={entryCreation}>
        date<input type='date' value={date} onChange={(event) =>
          setDate(event.target.value)} /><br />
        visibility: great<input type='radio' name='vis' onChange={() =>
          setVisibility('great')} />
        good<input type='radio' name='vis' onChange={() =>
          setVisibility('good')} />
        ok<input type='radio' name='vis' onChange={() =>
          setVisibility('ok')} />
        poor<input type='radio' name='vis' onChange={() =>
          setVisibility('poor')} /><br />
        weather: sunny<input type='radio' name='weather' onChange={() =>
          setWeather('sunny')} />
        rainy<input type='radio' name='weather' onChange={() =>
          setWeather('rainy')} />
        cloudy<input type='radio' name='weather' onChange={() =>
          setWeather('cloudy')} />
        stormy<input type='radio' name='weather' onChange={() =>
          setWeather('stormy')} />
        windy<input type='radio' name='weather' onChange={() =>
          setWeather('windy')} /><br />
        comment<input value={comment} onChange={(event) =>
          setComment(event.target.value)} /><br />
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      {entries.map((e) =>
        <div key={e.id}>
          <h2>{e.date}</h2>
          <p>visibility: {e.visibility}<br />weather: {e.weather}</p>
        </div>)}
    </div>
  )
}

export default App
