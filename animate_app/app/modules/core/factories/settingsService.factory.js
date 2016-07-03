export function settingsServiceFactory($log, DEFAULT_SETTINGS) {
  'ngInject';

  /**** UNCOMMENT TO CLEAR THE STORARE FOR TESTING ****/
  // chrome.storage.local.clear(() => {
  //     $log.info('storage cleared!');
  //   });

  return {

    getAppSetting: (keyString, callback) => {
      chrome.storage.local.get( keyString, (object) => {
        if (Object.keys(object).length === 0) {
          object = DEFAULT_SETTINGS[keyString];
        } else {
          object = object[keyString];
        }
        callback(object);
      });
    },

    storeAppSetting: (object, callback) => {
      chrome.storage.local.set(object, () => {
        $log.info('config stored!');
        if (callback) {
          callback();
        }
      });
    },

    getAllAppSettings: (callback) => {
      return chrome.storage.local.get( null, (items) => {
        for (let defaultItem in DEFAULT_SETTINGS) {
          if (!items.hasOwnProperty(defaultItem)) {
            items[defaultItem] = DEFAULT_SETTINGS[defaultItem];
          }
        }
        $log.debug(items);
        callback(items);
      });
    }
  }
}