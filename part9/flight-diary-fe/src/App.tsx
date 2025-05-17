import { useState, useEffect } from 'react';
import type { DiaryEntry, NewDiaryEntry } from './types';
import { createEntry, getAllEntries } from './services/diaryServie';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

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
    createEntry(newEntry).then(data => {
      setEntries(entries.concat(data))
    })

    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <div>
      <h1>Add diary entry</h1>
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
        poor<input type='radio' name='weather' onChange={() =>
          setWeather('stormy')} />
        windy<input type='radio' name='weather' onChange={() =>
          setWeather('windy')} /><br />
        comment<input value={comment} onChange={(event) =>
          setComment(event.target.value)} /><br />
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      {entries.map((e) =>
        <div>
          <h2>{e.date}</h2>
          <p>visibility: {e.visibility}<br />weather: {e.weather}</p>
        </div>)}
    </div>
  )
}

export default App
