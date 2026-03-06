import { api } from 'src/boot/axios';
import type { OpenWeatherMapResponse, UnitSystem, WeatherData } from 'src/types/weather';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

function mapResponseToWeatherData(response: OpenWeatherMapResponse): WeatherData {
  return {
    location: response.name,
    country: response.sys.country,
    temperature: response.main.temp,
    feelsLike: response.main.feels_like,
    tempMin: response.main.temp_min,
    tempMax: response.main.temp_max,
    humidity: response.main.humidity,
    pressure: response.main.pressure,
    windSpeed: response.wind.speed,
    windDeg: response.wind.deg,
    visibility: response.visibility,
    clouds: response.clouds.all,
    condition: response.weather[0],
    sunrise: response.sys.sunrise,
    sunset: response.sys.sunset,
    timezone: response.timezone,
    fetchedAt: Date.now(),
  };
}

export const weatherService = {
  async fetchWeather(location: string, units: UnitSystem): Promise<WeatherData> {
    const { data } = await api.get<OpenWeatherMapResponse>('/weather', {
      params: {
        q: location,
        units,
        appid: API_KEY,
      },
    });

    return mapResponseToWeatherData(data);
  },
};
