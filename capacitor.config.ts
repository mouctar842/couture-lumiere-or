
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.13fbe742b13d426aac072dbda66f5775',
  appName: 'Fadims',
  webDir: 'dist',
  server: {
    url: 'https://13fbe742-b13d-426a-ac07-2dbda66f5775.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;
