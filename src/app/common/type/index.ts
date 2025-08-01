import {Platform} from 'react-native';

type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export type CustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const isIos = Platform.OS === 'ios';
export const onCheckType = (
  source: any,
  type: TypesBase,
): source is TypesBase => {
  return typeof source === type;
};




export type ListAdsResponse = {
  item: ItemAdsResponse[]
  object_id_cate: string
  modifier: string
  description: string
  sc_unit_map_id: string
  title: string
  clone_source_id: string
  object_id_article: string
  last_update: string
  width: string
  id: string
  position: string
  create_date: string
  block_mode: string
  show_interval: number
  height: string
  status: string
}


export type ItemAdsResponse =  {
  end_date: string
  banner_content: string
  begin_date: string
  modifier: string
  sc_unit_map_id: string
  title: string
  type: string
  file_size: string
  start_time: string
  clone_source_id: string
  file_ext: string
  stats_url_scheme: string
  file_type: string
  last_update: string
  width: string
  creater: string
  link_url: string
  banner_url: string
  id: string
  position: number
  create_date: string
  height: string
  status: string
}
export interface WeatherResponse {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  rain: Rain
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

export interface Coord {
  lon: number
  lat: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

export interface Wind {
  speed: number
  deg: number
  gust: number
}

export interface Rain {
  [key:string]: number
}

export interface Clouds {
  all: number
}

export interface Sys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}
export interface ForeCastWeatherResponse {
  cod: string
  message: number
  cnt: number
  list: List[]
  city: City
}

export interface List {
  dt: number
  main: Main
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility?: number
  pop: number
  rain?: Rain
  sys: Sys
  dt_txt: string
}
export interface City {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}