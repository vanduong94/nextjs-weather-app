interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number,
  deg: number,
  gust: number
}

interface Rain {
  "3h": number;
}

interface Sys {
  pod: string
}

export interface ForecastData {
  clouds: Clouds;
  dt: number;
  dt_txt: string;
  main: Main;
  pop: number;
  rain: Rain;
  sys: Sys;
  visibility: number;
  weather: Weather[];
  wind: Wind;
}