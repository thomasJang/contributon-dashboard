import { types, getSnapshot, applySnapshot, flow } from 'mobx-state-tree';
import detector from './language/detector';
import ApiProvider from '../providers/ApiProvider';
import ko from 'i18n/ko';
import en from 'i18n/en';

export const I18nStore = types
  .model('I18nStore', {
    language: types.string,
  })
  .views(self => ({
    get currentLanguage() {
      return self.language;
    },
    get t() {
      switch (self.language) {
        case 'en':
          return en;
        case 'ko':
          return ko;
        default:
          return ko;
      }
    },
  }))
  .actions(self => {
    function changeLanguageTo(toLanguage: string) {
      self.language = toLanguage;
      detector.cacheUserLanguage(toLanguage);
    }

    return {
      changeLanguageTo,
    };
  });

type II18nStoreType = typeof I18nStore.Type;
export interface II18nStore extends II18nStoreType {}

// detect & cache
const language: string = detector.detectLanguage() || 'ko';
detector.cacheUserLanguage(language);

// TODO language detection
const i18nStore = I18nStore.create(
  {
    language,
  },
  { provider: ApiProvider },
);

export default i18nStore;
