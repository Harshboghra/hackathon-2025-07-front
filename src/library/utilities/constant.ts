export const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;

export const VALIDATION_LINK_LOG_ACTION_TYPE = Object.freeze({
  PAGE_LOAD: 'pageLoad',
  SUBMIT_CHANGED_PASSWORD: 'submitChangePassword',
});

export const VALIDATION_LINK_TYPE = Object.freeze({
  RESET_PASSWORD: 'resetPassword',
});

export const LOGIN_TYPE = {
  FRESH_LOGIN: 'fresh-login',
  RE_LOGIN: 're-login',
};

export const LANGUAGE_CODES = [
  'af', // Afrikaans
  'sq', // Albanian
  'am', // Amharic
  'ar', // Arabic
  'hy', // Armenian
  'az', // Azerbaijani
  'eu', // Basque
  'be', // Belarusian
  'bn', // Bengali
  'bs', // Bosnian
  'bg', // Bulgarian
  'ca', // Catalan
  'ceb', // Cebuano
  'ny', // Chichewa
  'zh', // Chinese
  'co', // Corsican
  'hr', // Croatian
  'cs', // Czech
  'da', // Danish
  'nl', // Dutch
  'en', // English
  'eo', // Esperanto
  'et', // Estonian
  'tl', // Filipino
  'fi', // Finnish
  'fr', // French
  'fy', // Frisian
  'gl', // Galician
  'ka', // Georgian
  'de', // German
  'el', // Greek
  'gu', // Gujarati
  'ht', // Haitian Creole
  'ha', // Hausa
  'haw', // Hawaiian
  'iw', // Hebrew
  'hi', // Hindi
  'hmn', // Hmong
  'hu', // Hungarian
  'is', // Icelandic
  'ig', // Igbo
  'id', // Indonesian
  'ga', // Irish
  'it', // Italian
  'ja', // Japanese
  'jv', // Javanese
  'kn', // Kannada
  'kk', // Kazakh
  'km', // Khmer
  'ko', // Korean
  'ku', // Kurdish (Kurmanji)
  'ky', // Kyrgyz
  'lo', // Lao
  'la', // Latin
  'lv', // Latvian
  'lt', // Lithuanian
  'lb', // Luxembourgish
  'mk', // Macedonian
  'mg', // Malagasy
  'ms', // Malay
  'ml', // Malayalam
  'mt', // Maltese
  'mi', // Maori
  'mr', // Marathi
  'mn', // Mongolian
  'my', // Myanmar (Burmese)
  'ne', // Nepali
  'no', // Norwegian
  'ps', // Pashto
  'fa', // Persian
  'pl', // Polish
  'pt', // Portuguese
  'pa', // Punjabi
  'ro', // Romanian
  'ru', // Russian
  'sm', // Samoan
  'gd', // Scots Gaelic
  'sr', // Serbian
  'st', // Sesotho
  'sn', // Shona
  'sd', // Sindhi
  'si', // Sinhala
  'sk', // Slovak
  'sl', // Slovenian
  'so', // Somali
  'es', // Spanish
  'su', // Sundanese
  'sw', // Swahili
  'sv', // Swedish
  'tg', // Tajik
  'ta', // Tamil
  'te', // Telugu
  'th', // Thai
  'tr', // Turkish
  'uk', // Ukrainian
  'ur', // Urdu
  'uz', // Uzbek
  'vi', // Vietnamese
  'cy', // Welsh
  'xh', // Xhosa
  'yi', // Yiddish
  'yo', // Yoruba
  'zu', // Zulu
];

export enum Pattern {
  email = 'email',
  password = 'password',
}
export enum FILE_SIZE {
  MAX_FILE_SIZE = 1000000,
}

export enum ORDER_TYPE {
  DESC = 'DESC',
}

export enum BUTTON_TYPE {
  PRIMARY = 'Primary',
  SECONDARY = 'Secondary',
  SUCCESS = 'Success',
  CHECK = 'Check',
  DELETE = 'Delete',
  CANCEL = 'Cancel',
  BACK = 'Back',
  EDIT = 'Edit',
  NEXT = 'Next',
  PREVIOUS = 'Previous',
  ADD = 'Add',
  PERMISSION = 'Permission',
  MORE_LOAD = 'More Load',
}

export enum FILE_TYPE {
  DOCX = 1,
  PPTX = 2,
  XLSX = 3,
  PDF = 4,
}

export enum USE_USER_FORM {
  MY_PROFILE = 'myProfile',
  EDIT_USER = 'editUser',
}

export enum AUTO_COMPLETE_SELECT_COMMON_TYPE {
  DROPDOWN = 'dropdown',
  TABLE = 'table',
}

export enum ROLE_TYPE {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
}

export enum SEARCH_MODE {
  EXACT = 'Exact',
  WILD = 'Wild',
}

export enum IFormFieldType {
  NO_LABEL = 'no-label',
  TOP_LABEL = 'top-label',
}

export const DEFAULT_LABEL_VALUE = {
  HANDLE_LABEL: 'Handle',
  HANDLE_VALUE: 'Header',
  NO_MORE_RECORD_LABEL: 'NoMoreRecord',
  NO_MORE_RECORD_VALUE: 'NoRecord',
};

export const PROVIDER_TYPE = Object.freeze({
  SHOP_MANAGER: 'shop',
  STOCK_MANAGER: 'stock',
});

export const FLOW_TYPE = Object.freeze({
  ORDER_SYNC: 'orderSync',
  STATUS_UPDATE: 'updateStatus',
  STOCK_SYNC: 'stockSync',
});

export const EXTRA_FIELD_TYPE = Object.freeze({
  SELECT: 'select',
  TEXT: 'text',
});

export const SHOP_PROVIDERS = Object.freeze({
  SHOPIFY: 'shopify',
});

export const STOCK_PROVIDERS = Object.freeze({
  MINTSOFT: 'mintsoft',
});

export const INTEGRATION_LOG_STATUS = Object.freeze({
  SUCCESS: 'Success',
  FAILED: 'Failed',
});

export const ACTIVE_FLOWS = [FLOW_TYPE.ORDER_SYNC, FLOW_TYPE.STOCK_SYNC];

export const FLOW_NAME = {
  [FLOW_TYPE.ORDER_SYNC]: 'Order Sync',
  [FLOW_TYPE.STOCK_SYNC]: 'Stock Sync',
};
