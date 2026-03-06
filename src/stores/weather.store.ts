import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UnitSystem, WeatherData } from 'src/types/weather';
import { weatherService } from 'src/services/weather.service';

export const useWeatherStore = defineStore('weather', () => {
  const selectedLocation = ref('');
  const weatherData = ref<WeatherData | null>(null);
  const unitSystem = ref<UnitSystem>('metric');
  const loading = ref(false);
  const error = ref<string | null>(null);

  const hasWeatherData = computed(() => weatherData.value !== null);

  async function fetchWeather(location?: string) {
    const query = location ?? selectedLocation.value;
    if (!query.trim()) {
      error.value = 'Please enter a location to search.';
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      weatherData.value = await weatherService.fetchWeather(query, unitSystem.value);
      selectedLocation.value = query;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response: { status: number } }).response;
        if (response.status === 404) {
          error.value = `Location "${query}" not found. Please try a different search.`;
        } else if (response.status === 401) {
          error.value = 'Invalid API key. Please check your configuration.';
        } else {
          error.value = 'Unable to fetch weather data. Please try again later.';
        }
      } else {
        error.value = 'Network error. Please check your connection and try again.';
      }
      weatherData.value = null;
    } finally {
      loading.value = false;
    }
  }

  async function setUnitSystem(unit: UnitSystem) {
    unitSystem.value = unit;
    if (selectedLocation.value) {
      await fetchWeather();
    }
  }

  async function refresh() {
    if (selectedLocation.value) {
      await fetchWeather();
    }
  }

  function clearError() {
    error.value = null;
  }

  return {
    selectedLocation,
    weatherData,
    unitSystem,
    loading,
    error,
    hasWeatherData,
    fetchWeather,
    setUnitSystem,
    refresh,
    clearError,
  };
});
