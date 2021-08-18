import React from "react";
import { makeStyles } from "@material-ui/core";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import routes from "./routes";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/common/Loading/Loading";
import Header from "../components/common/Header/Header";
import Home from "../pages/Home/Home";

// bug => ./src/App.tsx
// Cannot find file: 'AppRoutes.ts' does not match the corresponding name on disk: '.\src\routes\routes.ts'.
// When have routes.ts and AppRoutes.jsx and call to AppRoutes component from App.tsx in one folder...change name to AppRoutes.tsx

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const classes = useStyles();
  const CodeEditor = () => <div>Code Editor App</div>;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={classes.main}>
      <Header />
      <div className={classes.page}>
        <Switch>
          <ProtectedRoute exact path={routes.codeEditor}>
            {CodeEditor}
          </ProtectedRoute>
          <Route exact path={routes.home}>
            {isAuthenticated ? <Redirect to={routes.codeEditor} /> : <Home />}
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  main: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  page: {
    height: "100%",
  },
}));

export default AppRoutes;
