import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LocalStorageService } from './pages/Setting/SettingIndex';
import { addLocale, locale, updateLocaleOption } from 'primereact/api';
import { languageService } from './service/language/language.service';
import { LANGUAGE_CODES } from './library/utilities/constant';

export const locales = {
  sv: {
    startsWith: 'Börjar med',
    contains: 'Innehåller',
    notContains: 'Innehåller inte',
    endsWith: 'Slutar med',
    equals: 'Lika med',
    notEquals: 'Inte lika med',
    noFilter: 'Inget filter',
    filter: 'Filter',
    lt: 'Mindre än',
    lte: 'Mindre än eller lika med',
    gt: 'Större än',
    gte: 'Större än eller lika med',
    dateIs: 'Datumet är',
    dateIsNot: 'Datumet är inte',
    dateBefore: 'Datumet är tidigare än',
    dateAfter: 'Datumet är senare än',
    custom: 'Anpassad',
    clear: 'Rensa',
    apply: 'Använd',
    matchAll: 'Matcha alla',
    matchAny: 'Matcha något',
    addRule: 'Lägg till regel',
    removeRule: 'Ta bort regel',
    accept: 'Ja',
    reject: 'Nej',
    choose: 'Välj',
    upload: 'Ladda upp',
    cancel: 'Avbryt',
    close: 'Stäng',
    dayNames: [
      'Söndag',
      'Måndag',
      'Tisdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lördag',
    ],
    dayNamesShort: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
    dayNamesMin: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
    monthNames: [
      'Januari',
      'Februari',
      'Mars',
      'April',
      'Maj',
      'Juni',
      'Juli',
      'Augusti',
      'September',
      'Oktober',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Maj',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dec',
    ],
    today: 'Idag',
    weekHeader: 'v',
    firstDayOfWeek: 1,
    dateFormat: 'yy-mm-dd',
    weak: 'Svagt',
    medium: 'Mellan',
    strong: 'Starkt',
    passwordPrompt: 'Fyll i lösenord',
    emptyFilterMessage: 'Inga tillgängliga rader',
    emptyMessage: 'Inga resultat hittades',
    aria: {
      trueLabel: 'Sant',
      falseLabel: 'Falskt',
      nullLabel: 'Ej vald',
      pageLabel: 'Sida',
      firstPageLabel: 'Första sidan',
      lastPageLabel: 'Sista sidan',
      nextPageLabel: 'Nästa sida',
      previousPageLabel: 'Föregående sida',
      selectLabel: 'Markera',
      unselectLabel: 'Avmarkera',
      expandLabel: 'Expandera',
      collapseLabel: 'Fäll ihop',
    },
  },
};

addLocale('sv', locales.sv);
updateLocaleOption('firstDayOfWeek', 1, 'en');

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options

  .init({
    fallbackLng: 'sv',
    debug: false,
    keySeparator: '.',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })
  .then(() => {
    changeLanguageAndFetchTranslations(LocalStorageService.getLanguage());
  });

document.documentElement.lang = i18n.language;

export const changeLanguageAndFetchTranslations = async (language: string) => {
  // Set the locale
  if (LANGUAGE_CODES.includes(language)) {
    locale(language);
  } else {
    locale('sv'); // default swedish language
  }

  // Fetch translations for the selected language
  const translation = await languageService.fetchTranslations(language);

  // Update i18next resources with the fetched translations
  i18n.addResourceBundle(language, 'translation', translation, true);

  // Change the language and return the promise
  i18n.changeLanguage(language);
};

export default i18n;
