import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.sonoto.travelbudget',
  appName: 'Travel Budget Planner',
  webDir: 'dist',
  server: {
    iosScheme: 'https',
    hostname: 'travelbudget.ensibf-holdings.fr'
  }
};


export default config;
