import * as React from "react";

import {t} from "@lingui/macro";
import {I18n, I18nProvider} from "@lingui/react";
import Helmet from "react-helmet";

import {i18n as i18nConfig} from "configs/i18n";

export const App = () => {
  return (
    <I18nProvider i18n={i18nConfig} language="en">
        <Helmet
          titleTemplate="Slang — %s"
        >
        <I18n>
          {({i18n}) => (
            <>
              <title>{i18n._(t`Go beyond basic English`)}</title>
              <meta
                name="description"
                content={i18n._(t`
                  This is the largest platform for learning professional and specialized English.
                  We help people, companies, and universities go beyond basic English.
                `)}
              />
            </>
          )}
        </I18n>
        </Helmet>
        <h1> WELCOME TO THE LATEST SLANG PROJECT!! </h1>
    </I18nProvider>
  );
};
