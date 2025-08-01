export const supportLanguages = () => {
  return [
    {
      name: 'English',
      lang: 'en',
    },
    {
      name: '中文',
      lang: 'cn',
    },
    {
      name: 'Tiếng Việt',
      lang: 'vi',
      
    },
    // {
    //   name: 'العربية',
    //   lang: 'ar',
    // },
    // {
    //   name: 'Deutsch',
    //   lang: 'de',
    // },
    // {
    //   name: 'Français',
    //   lang: 'fr',
    // },
    // {
    //   name: 'हिन्दी',
    //   lang: 'hi',
    // },
    // {
    //   name: 'Bahasa Indonesia',
    //   lang: 'id',
    // },
    // {
    //   name: 'Italiano',
    //   lang: 'it',
    // },
    // {
    //   name: '日本語',
    //   lang: 'ja',
    // },
    // {
    //   name: '한국어',
    //   lang: 'ko',
    // },
    // {
    //   name: 'Português',
    //   lang: 'pt-PT',
    // },
    // {
    //   name: 'Русский язык',
    //   lang: 'ru',
    // },
    {
      name: 'ภาษาไทย',
      lang: 'th',
    },
    // {
    //   name: 'Türkçe',
    //   lang: 'tr',
    // },
  ];
};
export const getLanguageWithCode =( langCode:any) => {
  const languageArray = supportLanguages();
  for (let i = 0; i < languageArray.length; i++) {
    const value = languageArray[i];
    if (value.lang === langCode) {
      return value.name;
    }
  }
  return '';
};
