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
            content="Enter the description of your project here"
          />
        </React.Fragment>
      </Helmet>
      <h1>You are ready to start coding!!</h1>
    </React.Fragment>
  );
};
