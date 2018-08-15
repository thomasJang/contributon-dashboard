import * as LngDetector from 'i18next-browser-languagedetector';

const options = {
  lowerCaseLng: true,
  whitelist: ['ko', 'en'],
};

const params = {
  // order and from where user language should be detected
  // path, cookie, header, querystring, session
  order: ['querystring', 'cookie', 'navigator'],

  // keys or params to lookup language from
  lookupQuerystring: 'language',
  lookupCookie:
    'org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE',

  // cache user language
  caches: ['cookie'],

  // optional expire and domain for set cookie
  cookieMinutes: 60 * 24 * 365,
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatLanguageCode(code: string) {
  // http://www.iana.org/assignments/language-tags/language-tags.xhtml
  if (typeof code === 'string' && code.indexOf('-') > -1) {
    const specialCases = [
      'hans',
      'hant',
      'latn',
      'cyrl',
      'cans',
      'mong',
      'arab',
    ];
    let p = code.split('-');

    if (options.lowerCaseLng) {
      p = p.map(part => part.toLowerCase());
    } else if (p.length === 2) {
      p[0] = p[0].toLowerCase();
      p[1] = p[1].toUpperCase();

      if (specialCases.indexOf(p[1].toLowerCase()) > -1) {
        p[1] = capitalize(p[1].toLowerCase());
      }
    } else if (p.length === 3) {
      p[0] = p[0].toLowerCase();

      // if lenght 2 guess it's a country
      if (p[1].length === 2) {
        p[1] = p[1].toUpperCase();
      }
      if (p[0] !== 'sgn' && p[2].length === 2) {
        p[2] = p[2].toUpperCase();
      }

      if (specialCases.indexOf(p[1].toLowerCase()) > -1) {
        p[1] = capitalize(p[1].toLowerCase());
      }
      if (specialCases.indexOf(p[2].toLowerCase()) > -1) {
        p[2] = capitalize(p[2].toLowerCase());
      }
    }

    return p.join('-');
  }

  return options.lowerCaseLng ? code.toLowerCase() : code;
}

function getLanguagePartFromCode(code: string) {
  if (!code || code.indexOf('-') < 0) {
    return code;
  }

  const p = code.split('-');
  return formatLanguageCode(p[0]);
}

function isWhitelisted(code: string) {
  code = getLanguagePartFromCode(code);
  return (
    !options.whitelist ||
    !options.whitelist.length ||
    options.whitelist.indexOf(code) > -1
  );
}

const detector: any = new LngDetector(
  {
    languageUtils: {
      formatLanguageCode,
      isWhitelisted,
    },
  },
  params,
);

detector.detectLanguage = () => {
  return getLanguagePartFromCode(detector.detect());
};

export default (detector as any) as {
  detect: () => string;
  detectLanguage: () => string;
  cacheUserLanguage: (language: string, options?: any) => void;
};
