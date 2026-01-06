import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.sonoto.travelbudgetplanner',
  appName: 'Travel Budget Planner',
  webDir: 'dist',
  
  server: {
    url: 'https://travelbudget.ensbf-holdings.com',
    cleartext: false,
  },
};


export default config;
