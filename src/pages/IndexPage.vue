<template>
  <q-page class="index-page">
    <div class="weather-app">
      <div class="q-mb-md">
        <SearchLocation :loading="loading" @search="fetchWeather" />
      </div>

      <div class="row justify-center q-mb-lg">
        <UnitToggle :model-value="unitSystem" @update:model-value="setUnitSystem" />
      </div>

      <transition name="fade" mode="out-in">
        <div v-if="loading && !hasWeatherData" key="loader" class="empty-state">
          <q-spinner-dots color="white" size="40px" />
          <div class="empty-subtitle q-mt-md">Fetching weather data...</div>
        </div>

        <div v-else-if="error" key="error" class="error-banner glass-subtle">
          <q-icon name="error_outline" size="24px" class="error-icon" />
          <div class="error-text">{{ error }}</div>
          <q-btn
            flat
            dense
            no-caps
            label="Dismiss"
            class="error-dismiss"
            @click="clearError"
          />
        </div>

        <WeatherCard
          v-else-if="weatherData"
          key="weather"
          :weather="weatherData"
          :unit="unitSystem"
          :refreshing="loading"
          @refresh="refresh"
        />

        <div v-else key="empty" class="empty-state">
          <q-icon name="cloud_queue" size="64px" class="empty-icon" />
          <div class="empty-title">Search for a city</div>
          <div class="empty-subtitle">
            Enter a location above to see the current weather
          </div>
        </div>
      </transition>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import SearchLocation from 'src/components/SearchLocation.vue';
import WeatherCard from 'src/components/WeatherCard.vue';
import UnitToggle from 'src/components/UnitToggle.vue';
import { useWeather } from 'src/composables/useWeather';

const {
  weatherData,
  unitSystem,
  loading,
  error,
  hasWeatherData,
  fetchWeather,
  setUnitSystem,
  refresh,
  clearError,
} = useWeather();
</script>

<style lang="scss" scoped>
.index-page {
  padding: 16px 20px 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  color: rgba(255, 255, 255, 0.15);
  margin-bottom: 16px;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 6px;
}

.empty-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.3);
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-color: rgba(255, 82, 82, 0.25) !important;
  background: rgba(255, 82, 82, 0.1) !important;
}

.error-icon {
  color: #ff5252;
  flex-shrink: 0;
}

.error-text {
  flex: 1;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.error-dismiss {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  flex-shrink: 0;
}
</style>
