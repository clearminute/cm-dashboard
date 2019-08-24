import isProduction from 'clearminute/common/utils/isProduction';

export const extensionId_PROD = 'pcenfiemkfldlchmgcohjkfhppckocne'; // eslint-disable-line camelcase

// The extensionId for development is variable. After you load the extension for development in Chrome,
// copy the extension ID and save it in this variable
export const extensionId_DEV = 'cggpdkfiehiiccgpimmhiacgnljppcem'; // eslint-disable-line camelcase

export default function postMessage(type, message) {
  const extensionId = isProduction() ? extensionId_PROD : extensionId_DEV; // eslint-disable-line camelcase

  return new Promise((resolve, reject) => {
    window.chrome.runtime.sendMessage(
      extensionId, {
        type,
        message,
      },
      response => resolve(response),
    );
  });
}
