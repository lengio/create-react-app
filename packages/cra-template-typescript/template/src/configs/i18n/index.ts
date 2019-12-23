import {setupI18n} from "@lingui/core";

export const i18n = setupI18n({
  catalogs: {
    en: require("locales/en/messages.po"),
    es: require("locales/es/messages.po"),
    pt: require("locales/pt/messages.po"),
  },
});
