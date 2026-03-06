# Weather Forecast App

A Vue 3 application built with the Quasar framework that allows users to search for a location and view the current weather forecast.

## Features

- Search for any city worldwide
- View current weather conditions including temperature, humidity, wind, and visibility
- Toggle between metric (°C, m/s) and imperial (°F, mph) units
- Refresh weather data on demand
- Responsive layout with a modern glassmorphism design
- Error handling with user-friendly messages

## Tech Stack

- **Vue 3** with Composition API
- **Quasar Framework** for UI components and layout
- **Pinia** for state management
- **Axios** for HTTP requests
- **TypeScript** for type safety
- **OpenWeatherMap API** for weather data

## Prerequisites

- Node.js 18+ (recommended: 20)
- npm 6+
- An [OpenWeatherMap API key](https://openweathermap.org/api) (free tier works)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example environment file and add your API key:

```bash
cp .env.example .env
```

Edit `.env` and replace `your_api_key_here` with your OpenWeatherMap API key:

```
OPENWEATHERMAP_API_KEY=your_actual_api_key
```

### 3. Run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:9000](http://localhost:9000).

### 4. Build for production

```bash
npm run build
```

## Docker

### Build and run with Docker Compose

```bash
# Set your API key in the .env file first, then:
docker compose up --build
```

The app will be available at [http://localhost:9000](http://localhost:9000).

### Build and run with Docker directly

```bash
docker build -t weather-app .
docker run -p 9000:9000 -e OPENWEATHERMAP_API_KEY=your_api_key weather-app
```

## Environment Variables

| Variable                  | Description                      | Required |
| ------------------------- | -------------------------------- | -------- |
| `OPENWEATHERMAP_API_KEY`  | OpenWeatherMap API key           | Yes      |

## Project Structure

```
src/
├── boot/
│   └── axios.ts              # Axios instance configuration
├── components/
│   ├── SearchLocation.vue     # Location search input
│   ├── UnitToggle.vue         # Metric/Imperial toggle
│   ├── WeatherCard.vue        # Weather data display card
│   └── WeatherStat.vue       # Individual weather statistic
├── composables/
│   └── useWeather.ts          # Weather logic composable
├── css/
│   └── app.scss               # Global styles
├── layouts/
│   └── MainLayout.vue         # App layout shell
├── pages/
│   ├── IndexPage.vue          # Main page
│   └── ErrorNotFound.vue      # 404 page
├── router/
│   ├── index.ts               # Router setup
│   └── routes.ts              # Route definitions
├── services/
│   └── weather.service.ts     # OpenWeatherMap API service
├── stores/
│   └── weather.store.ts       # Pinia weather store
├── types/
│   └── weather.ts             # TypeScript type definitions
└── utils/
    └── temperature.ts         # Formatting utilities
```

## CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

1. Installs dependencies
2. Runs linting
3. Builds the project

The pipeline runs on every push and pull request to the `main` branch.

## Linting

```bash
npm run lint
```

## Formatting

```bash
npm run format
```

## License

MIT
