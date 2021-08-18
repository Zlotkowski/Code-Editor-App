import React from "react";
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toggleDarkMode } from "../../../store/dark-mode/reducer";
import DarkModeIcon from "@material-ui/icons/Brightness2";
import { Switch } from "@material-ui/core";
import UnauthenticatedButtons from "./UnauthenticatedButtons";
import AuthenticatedButtons from "./AuthenticatedButtons";

const Header = () => {
  const { isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.darkMode);
  const onChangeDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  const classes = useStyles();
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Code Editor App
        </Typography>
        <DarkModeIcon />
        <Switch
          onChange={onChangeDarkMode}
          color="default"
          checked={darkMode}
        />
        {isAuthenticated ? (
          <AuthenticatedButtons />
        ) : (
          <UnauthenticatedButtons />
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
  },
}));

export default Header;
