const APP_CONFIG = {};
  Object.defineProperties(APP_CONFIG,
    {
      API_ROOT_URL: {
        value: `https://${window.location.host}/fxapp`,
        writable: false,
      },
      API_EXT_URL: {
        value: 'http://localhost:8080/fxbot',
        writable: false,
      },
      LINK_PREFIX: {
        value: '/fxapp/app',
        writable: false,
      },
      APP_ROOT_URL: {
        value: '/',
        writable: false,
      },
      APP_ID: {
        value: 'fxapp',
        writable: false,
      },
      APP_TITLE: {
        value: 'symphony-training-fx-app',
        writable: false,
      },
      APP_NAV_BAR_TITLE: {
        value: 'symphony-training-fx-app',
        writable: false,
      },
      APP_ICON_NAME: {
        value: 'favicon.png',
        writable: false,
      },
    });

  window.APP_CONFIG = APP_CONFIG;