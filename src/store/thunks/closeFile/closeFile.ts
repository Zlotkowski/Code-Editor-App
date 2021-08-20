import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
  removeActiveFile,
  setEditorActiveFile,
} from "../../reducers/files/reducer";

const getNewActiveFileId = (
  activeFilesIds: string[],
  activeFilesLength: number,
  fileId: string
) => {
  const fileToBeRemoveIndex = activeFilesIds.indexOf(fileId);
  if (fileToBeRemoveIndex + 1 === activeFilesLength) {
    return activeFilesIds[fileToBeRemoveIndex - 1];
  }
  return activeFilesIds[fileToBeRemoveIndex + 1];
};

const closeFile =
  (fileId: string) => (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const { activeFiles, editorActiveFile } = state.files;
    const activeFilesLength = activeFiles.length;
    if (activeFilesLength >= 2) {
      const newActiveFileId = getNewActiveFileId(
        activeFiles,
        activeFilesLength,
        fileId
      );
      if (editorActiveFile === fileId || editorActiveFile === newActiveFileId) {
        dispatch(setEditorActiveFile(newActiveFileId));
      } else {
      }
    } else {
      dispatch(setEditorActiveFile(null));
    }
    dispatch(removeActiveFile(fileId));
  };

export default closeFile;
