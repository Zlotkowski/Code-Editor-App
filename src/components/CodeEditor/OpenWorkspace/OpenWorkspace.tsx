import React, { AriaAttributes, DOMAttributes, useRef } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { commonColors } from "../../../theme/colors";
import { useAppDispatch } from "../../../store/hooks";
import readFiles from "../../../store/thunks/readFiles/readFiles";

const OpenWorkspace = () => {
  const classes = useStyles();
  const directoryInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const onClick = () => {
    directoryInputRef.current?.click();
  };
  const onFileUploaded = async () => {
    try {
      const files = directoryInputRef.current?.files as FileList;
      await dispatch(readFiles(files));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button className={classes.button} onClick={onClick}>
        Open Workspace
      </Button>
      <input
        type="file"
        className={classes.input}
        directory=""
        webkitdirectory=""
        ref={directoryInputRef}
        onChange={onFileUploaded}
      />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  button: {
    color: commonColors.white,
  },
  input: {
    display: "none",
  },
}));

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}

export default OpenWorkspace;
