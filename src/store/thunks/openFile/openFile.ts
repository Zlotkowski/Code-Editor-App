import FileViewerStructure from "../../../types/FileViewerStructure";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import supportedExtentions from "../../../config/supportedExtentions";
import {
  addActiveFile,
  setEditorActiveFile,
} from "../../reducers/files/reducer";

const openFile =
  (node: FileViewerStructure) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const { extension: fileExtension = "", id: fileId, children } = node;
    if (children || !supportedExtentions[fileExtension]) {
      return;
    }
    const state = getState();
    const activeFiles = state.files.activeFiles;
    if (!activeFiles.includes(fileId)) {
      dispatch(addActiveFile(fileId));
    }
    dispatch(setEditorActiveFile(fileId));
  };

export default openFile;
