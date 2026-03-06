<template>
  <div class="glass weather-card">
    <div class="card-header">
      <div>
        <div class="location-name">{{ locationDisplay }}</div>
        <div class="condition-text">{{ weather.condition.description }}</div>
      </div>
      <q-btn
        flat
        round
        dense
        icon="refresh"
        size="md"
        class="refresh-btn"
        :loading="refreshing"
        @click="$emit('refresh')"
      >
        <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 8]">
          Refresh
        </q-tooltip>
      </q-btn>
    </div>

    <div class="temp-section">
      <img
        :src="iconUrl"
        :alt="weather.condition.description"
        class="weather-icon-img"
      />
      <div class="temp-info">
        <div class="temp-main">{{ formattedTemp }}</div>
        <div class="temp-detail">Feels like {{ formattedFeelsLike }}</div>
        <div class="temp-range">
          <q-icon name="arrow_downward" size="12px" />
          {{ formattedMin }}
          <span class="range-divider">&bull;</span>
          <q-icon name="arrow_upward" size="12px" />
          {{ formattedMax }}
        </div>
      </div>
    </div>

    <div class="divider" />

    <div class="stats-grid">
      <WeatherStat icon="water_drop" label="Humidity" :value="`${weather.humidity}%`" />
      <WeatherStat icon="air" label="Wind" :value="formattedWind" />
      <WeatherStat icon="compress" label="Pressure" :value="`${weather.pressure} hPa`" />
      <WeatherStat icon="visibility" label="Visibility" :value="formattedVisibility" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherData, UnitSystem } from 'src/types/weather';
import {
  formatTemperature,
  formatWindSpeed,
  getWeatherIconUrl,
  formatVisibility,
  degreesToDirection,
} from 'src/utils/temperature';
import { computed } from 'vue';
import WeatherStat from './WeatherStat.vue';

const props = defineProps<{
  weather: WeatherData;
  unit: UnitSystem;
  refreshing?: boolean;
}>();

defineEmits<{
  refresh: [];
}>();

const locationDisplay = computed(
  () => `${props.weather.location}, ${props.weather.country}`,
);

const formattedTemp = computed(() =>
  formatTemperature(props.weather.temperature, props.unit),
);

const formattedFeelsLike = computed(() =>
  formatTemperature(props.weather.feelsLike, props.unit),
);

const formattedMin = computed(() =>
  formatTemperature(props.weather.tempMin, props.unit),
);

const formattedMax = computed(() =>
  formatTemperature(props.weather.tempMax, props.unit),
);

const formattedWind = computed(() => {
  const speed = formatWindSpeed(props.weather.windSpeed, props.unit);
  const direction = degreesToDirection(props.weather.windDeg);
  return `${speed} ${direction}`;
});

const formattedVisibility = computed(() =>
  formatVisibility(props.weather.visibility),
);

const iconUrl = computed(() =>
  getWeatherIconUrl(props.weather.condition.icon),
);
</script>

<style lang="scss" scoped>
.weather-card {
  padding: 28px;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
}

.location-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.condition-text {
  font-size: 14px;
  color: var(--text-secondary);
  text-transform: capitalize;
  margin-top: 4px;
}

.refresh-btn {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: var(--accent-light);
    transform: rotate(45deg);
  }
}

.temp-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.temp-info {
  flex: 1;
}

.temp-main {
  font-size: 56px;
  font-weight: 300;
  color: var(--text-primary);
  line-height: 1;
  letter-spacing: -0.03em;
}

.temp-detail {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 6px;
}

.temp-range {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;

  .range-divider {
    margin: 0 4px;
    opacity: 0.4;
  }
}

.divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 30%,
    rgba(255, 255, 255, 0.1) 70%,
    transparent 100%
  );
  margin-bottom: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
