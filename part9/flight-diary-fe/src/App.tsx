import { useState, useEffect } from 'react';
import type { DiaryEntry } from './types';
import { getAllEntries } from './services/diaryServie';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, []);

  return (
    <div>
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
