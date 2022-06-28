import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Learn2Earn.luckyDraw',
  appName: 'luckyDraw',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["facebook.com", "google.com"],
    },
  },
};

export default config;
