import React from "react";
import { makeStyles } from "@material-ui/core";
import ProgrammingLanguagesList from "../../components/Home/ProgrammingLanguagesList";

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.welcomeMessage}>
        Welcome to the Code Editor App Stranger.{" "}
        <strong>
          Example data to Sign In to App: Email adress: test@gmail.com,
          Password: Test1234! It's only auth0 :)
        </strong>{" "}
        Please, open workspace, add some file with extensions bottom and try it!{" "}
        <br />
        Ps. working only auto-save :)
      </div>
      <ProgrammingLanguagesList />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.background,
  },
  welcomeMessage: {
    textAlign: "center",
    padding: "15px",
    fontSize: "30px",
    color: theme.font,
  },
}));

export default Home;
