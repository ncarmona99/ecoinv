import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'eco_inv',
  webDir: 'www',
  plugins: {
    LiveUpdates: {
      appId: 'b3a71cfb',
      channel: 'Production',
      autoUpdateMethod: 'none',
      maxVersions: 3,
    },
  },
};

export default config;
