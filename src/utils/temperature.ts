import type { UnitSystem } from 'src/types/weather';

export function formatTemperature(value: number, unit: UnitSystem): string {
  const rounded = Math.round(value);
  const symbol = unit === 'metric' ? '°C' : '°F';
  return `${rounded}${symbol}`;
}

export function formatWindSpeed(value: number, unit: UnitSystem): string {
  if (unit === 'metric') {
    return `${value.toFixed(1)} m/s`;
  }
  return `${value.toFixed(1)} mph`;
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function formatVisibility(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${meters} m`;
}

export function degreesToDirection(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}
