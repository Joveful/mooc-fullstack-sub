export enum Visibility {
  Great = 'great',
  Good = 'good',
  Okay = 'okay',
  Poor = 'poor'
}

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy'
}

export interface DiaryEntry {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment?: string
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
