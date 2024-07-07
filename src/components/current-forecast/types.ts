interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface Main {
  feels_like: number;
  grnd_level?: number; // Optional, as it may not always be present
  humidity: number;
  pressure: number;
  sea_level?: number; // Optional, as it may not always be present
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

interface Coord {
  lon: number;
  lat: number;
}

export interface WeatherData {
  base: string;
  clouds: Clouds;
  cod: number;
  coord: Coord;
  dt: number;
  id: number;
  main: Main;
  name: string;
  sys: Sys;
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: Wind;
}