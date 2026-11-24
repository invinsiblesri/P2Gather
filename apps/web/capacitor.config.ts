import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.p2gather.app',
  appName: 'P2Gather',
  webDir: 'dist',
  android: {
    backgroundColor: '#02060E',
    allowMixedContent: true,
  },
};

export default config;
