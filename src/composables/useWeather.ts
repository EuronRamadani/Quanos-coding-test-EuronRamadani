import { storeToRefs } from 'pinia';
import { useWeatherStore } from 'src/stores/weather.store';
import { computed } from 'vue';
import {
  formatTemperature,
  formatWindSpeed,
  getWeatherIconUrl,
  formatVisibility,
  degreesToDirection,
} from 'src/utils/temperature';

export function useWeather() {
  const store = useWeatherStore();
  const { weatherData, unitSystem, loading, error, hasWeatherData, selectedLocation } =
    storeToRefs(store);

  const formattedTemperature = computed(() => {
    if (!weatherData.value) return '';
    return formatTemperature(weatherData.value.temperature, unitSystem.value);
  });

  const formattedFeelsLike = computed(() => {
    if (!weatherData.value) return '';
    return formatTemperature(weatherData.value.feelsLike, unitSystem.value);
  });

  const formattedTempRange = computed(() => {
    if (!weatherData.value) return '';
    const min = formatTemperature(weatherData.value.tempMin, unitSystem.value);
    const max = formatTemperature(weatherData.value.tempMax, unitSystem.value);
    return `${min} / ${max}`;
  });

  const formattedWind = computed(() => {
    if (!weatherData.value) return '';
    const speed = formatWindSpeed(weatherData.value.windSpeed, unitSystem.value);
    const direction = degreesToDirection(weatherData.value.windDeg);
    return `${speed} ${direction}`;
  });

  const formattedVisibility = computed(() => {
    if (!weatherData.value) return '';
    return formatVisibility(weatherData.value.visibility);
  });

  const weatherIconUrl = computed(() => {
    if (!weatherData.value) return '';
    return getWeatherIconUrl(weatherData.value.condition.icon);
  });

  const locationDisplay = computed(() => {
    if (!weatherData.value) return '';
    return `${weatherData.value.location}, ${weatherData.value.country}`;
  });

  return {
    weatherData,
    unitSystem,
    loading,
    error,
    hasWeatherData,
    selectedLocation,

    formattedTemperature,
    formattedFeelsLike,
    formattedTempRange,
    formattedWind,
    formattedVisibility,
    weatherIconUrl,
    locationDisplay,

    fetchWeather: store.fetchWeather,
    setUnitSystem: store.setUnitSystem,
    refresh: store.refresh,
    clearError: store.clearError,
  };
}
