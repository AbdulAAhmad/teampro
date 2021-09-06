/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "http://192.168.1.50:5000/api",
    AuthApiUrl: "http://192.168.1.50:5000/api/auth",
    socketUrl: "http://192.168.1.50:5000/",
    putTokenUrl: "http://192.168.1.50:5000/api/users",
  },
  staging: {
    apiUrl: "http://192.168.1.50:5000/api",
    AuthApiUrl: "http://192.168.1.50:5000/api/auth",
    socketUrl: "http://192.168.1.50:5000/",
  },
  prod: {
    apiUrl: "http://192.168.1.50:5000/api",
    AuthApiUrl: "http://192.168.1.50:5000/api/auth",
    socketUrl: "http://192.168.1.50:5000/",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;
