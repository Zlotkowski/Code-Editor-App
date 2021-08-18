import React, { ComponentType, PropsWithChildren } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/common/Loading/Loading";
import { Route } from "react-router-dom";

const ProtectedRoute = (props: PropsWithChildren<{ [key: string]: any }>) => {
  const { children, ...args } = props;
  return (
    <Route
      component={withAuthenticationRequired(children as ComponentType, {
        onRedirecting: () => <Loading />,
      })}
      {...args}
    />
  );
};

export default ProtectedRoute;
