import React, { useCallback, useState } from "react";
import UserFile from "../../../types/UserFile";
import supportedExtentions from "../../../config/supportedExtentions";
import Editor from "@monaco-editor/react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Loading from "../../common/Loading/Loading";
import { debounce } from "lodash";
import { updateFileCode } from "../../../store/reducers/files/reducer";

interface Props {
  activeFile: UserFile;
}

const CustomMonacoEditor = (props: Props) => {
  const {
    activeFile: { id: fileId, extension, code: originalCode },
  } = props;
  const [code, setCode] = useState(originalCode);
  const dispatch = useAppDispatch();
  const language = supportedExtentions[extension];
  const darkMode = useAppSelector((state) => state.darkMode);

  const debouncedSave = useCallback(
    debounce((fileId: string, newCode: string) => {
      dispatch(updateFileCode({ fileId, newCode }));
    }, 1000),
    []
  );

  const onChange = (newCode = "") => {
    setCode(newCode);
    debouncedSave(fileId, newCode);
  };
  return (
    <Editor
      width="100%"
      height="100%"
      language={language}
      theme={darkMode ? "vs-dark" : "vs-light"}
      value={code}
      loading={<Loading />}
      onChange={onChange}
    />
  );
};

export default CustomMonacoEditor;
