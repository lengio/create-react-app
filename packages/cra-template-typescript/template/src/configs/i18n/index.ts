import {setupI18n} from "@lingui/core";

export const i18n = setupI18n({
  catalogs: {
    en: require("@lingui/loader!locales/en/messages.po"),
    es: require("@lingui/loader!locales/es/messages.po"),
    pt: require("@lingui/loader!locales/pt/messages.po"),
  },
});
