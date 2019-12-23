import * as React from "react";
import Helmet from "react-helmet";

export const App = () => {
  return (
    <React.Fragment>
      <Helmet
        titleTemplate="Slang — %s"
      >
        <React.Fragment>
          <title>Go beyond basic English</title>
          <meta
            name="description"
            content={`
              This is the largest platform for learning professional and specialized English.
              We help people, companies, and universities go beyond basic English.
            `}
          />
        </React.Fragment>
      </Helmet>
      <h1> WELCOME TO THE LATEST SLANG PROJECT!! </h1>
    </React.Fragment>
  );
};
