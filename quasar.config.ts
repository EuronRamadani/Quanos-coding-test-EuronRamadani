import { configure } from 'quasar/wrappers';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default configure(() => {
  return {
    boot: ['axios'],

    css: ['app.scss'],

    extras: ['roboto-font', 'material-icons'],

    build: {
      target: { browser: ['es2022', 'firefox115', 'chrome115', 'safari14'] },
      typescript: { strict: true, vueShim: true },
      vueRouterMode: 'history',
      env: {
        OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY ?? '',
      },
    },

    devServer: {
      open: false,
      host: '0.0.0.0',
      port: 9000,
    },

    framework: {
      config: {},
      plugins: ['Notify', 'Loading'],
    },

    animations: [],

    ssr: { pwa: false },

    pwa: {
      workboxMode: 'GenerateSW',
    },
  };
});
