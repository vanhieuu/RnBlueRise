import {
  API_KEY,
  GET_BY_SCID,
  GET_CATEGORY,
  GET_CURRENT_AIR_QUALITY,
  GET_CURRENT_UVI,
  GET_DETAIL_TOPIC,
  GET_FORECAST_5DAYS,
  GET_FORECAST_WEATHER,
  GET_ITEM_BY_CATEGORY,
  GET_LIST_ADS,
  GET_LIST_AUTHOR,
  GET_LIST_TAGS,
  GET_POST_BY_AUTHOR,
  GET_SEARCH_RESULTS,
  GET_SPEECH_NEWS,
  GET_SUMMARY_AI,
  GET_TOP_READING,
  GET_WEATHER_BY_LOCATION,
} from '@config/api';
import axios from 'axios';


export const sendNotificationToken = async (token:string) => {
  try {
      const response = await axios.post(
          'https://soft.vnptmedia.vn/service/api/notification/token',
          {
              token: token,
              type: 1,
              scUnitMapId: "80808080932f331b01933e2ba8300031"
          },
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Cookie': 'JSESSIONID=0C83A10D0ECCFA415D5764AC5FF0DE77'
              }
          }
      );
      console.log(response.data);
  } catch (error) {
      console.error(error);
  }
};

export const appApis = {
  getWeatherByLocation(lat: number, lon: number) {
    return axios
      .get(GET_WEATHER_BY_LOCATION(lat, lon, API_KEY))
      .then(res => res.data);
  },
  getForeCastWeatherByLocation(lat: number, lon: number) {
    return axios
      .get(GET_FORECAST_WEATHER(lat, lon, API_KEY))
      .then(res => res.data);
  },
  getForecast5Days(lat: number, lon: number) {
    return axios
      .get(GET_FORECAST_5DAYS(lat, lon, API_KEY))
      .then(res => res.data);
  },
  getAirPollution(lat: number, lon: number) {
    return axios
      .get(GET_CURRENT_AIR_QUALITY(lat, lon, API_KEY))
      .then(res => {console.log(res.data),console.log(res.headers)})
      .catch(error => {
        console.error('Air Pollution API Error:', error);
        throw error;
      });
  },

  getUVIndex(lat: number, lon: number) {
    return axios
      .get(GET_CURRENT_UVI(lat, lon, API_KEY))
      .then(res => res.data)
      .catch(error => {
        console.error('UV Index API Error:', error.message);
        throw error;
      });
  },

  getCategory() {
    return axios.get(GET_CATEGORY).then(res => res.data);
  },
  getItemByCategory({
    cateId,
    first,
    pageSize,
  }: {
    cateId: string;
    first: number;
    pageSize: number;
  }) {
    return axios
      .get(
        GET_ITEM_BY_CATEGORY + `${cateId}&first=${first}&pageSize=${pageSize}`,
      )
      .then(res => res.data);
  },
  getTopViewsTopic(day: any) {
    return axios.get(GET_TOP_READING + day).then(res => res.data);
  },
  getDetailTopic(id: string) {
    return axios.get(GET_DETAIL_TOPIC + id).then(res => res.data);
  },
  getSearchResult(searchQuery: string) {
    return axios.get(GET_SEARCH_RESULTS(searchQuery)).then(res => res.data);
  },
  getPostCastResult(id: string) {
    return axios.get(GET_BY_SCID(id)).then(res => res.data);
  },
  getSpeechNews(first: number) {
    return axios.get(GET_SPEECH_NEWS(first)).then(res => res.data);
  },
  getListAds() {
    return axios.get(GET_LIST_ADS).then(res => res.data);
  },
  getListAuthor(page: number) {
    return axios
      .post(
        GET_LIST_AUTHOR,
        {
          scUnitMapId: 'e7837c02845ffd04018473e6df282e92',
          keySearch: '',
          page: page,
          pageSize: 10,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => res.data)
      .catch(error => {
        console.error(
          'Error fetching list author:',
          error.response ? error.response.data : error.message,
        );
        throw error;
      });
  },
  getAuthor(page: number, keySearch: string) {
    return axios
      .post(
        GET_LIST_AUTHOR,
        {
          scUnitMapId: 'e7837c02845ffd04018473e6df282e92',
          keySearch: keySearch,
          page: page,
          pageSize: 10,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => res.data)
      .catch(error => {
        console.error(
          'Error fetching list author:',
          error.response ? error.response.data : error.message,
        );
        throw error;
      });
  },
  getListTags(page: number) {
    return axios
      .post(
        GET_LIST_TAGS,
        {
          scUnitMapId: 'e7837c02845ffd04018473e6df282e92',
          keySearch: '',
          page: page,
          pageSize: 10,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => res.data)
      .catch(error => {
        console.error(
          'Error fetching list author:',
          error.response ? error.response.data : error.message,
        );
        throw error;
      });
  },
  getPostByAuthor(authorName: string, page: number) {
    return axios
      .post(
        GET_POST_BY_AUTHOR,
        {
          scUnitMapId: 'e7837c02845ffd04018473e6df282e92',
          keySearch: '',
          page: page,
          pageSize: 10,
          authorName: authorName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => res.data)
      .catch(error => {
        console.error(
          'Error fetching list author:',
          error.response ? error.response.data : error.message,
        );
        throw error;
      });
  },
  getSummary:(id:string) =>{
    return axios.get(GET_SUMMARY_AI(id)).then(res => res.data);
  }
};
