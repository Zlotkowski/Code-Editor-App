import filesReducer, {
  addActiveFile,
  initialState,
  removeActiveFile,
  setEditorActiveFile,
  setFiles,
  updateFileCode,
} from "./reducer";
import { PayloadAction } from "@reduxjs/toolkit";

describe("files reducer", () => {
  test("should return the initial state if no know action is provided", () => {
    expect(filesReducer(undefined, {} as PayloadAction)).toEqual(initialState);
  });
  test("should set user files when action is setFiles", () => {
    const userFiles = [
      {
        id: "1",
        name: "index.js",
        relativePath: "test/index.js",
        code: `console.log("Hello world!")`,
        extension: ".js",
      },
    ];
    const expectedState = {
      ...initialState,
      activeFiles: [],
      userFiles,
    };

    expect(filesReducer(initialState, setFiles(userFiles))).toEqual(
      expectedState
    );
  });
  test("should add a new file id when action is addActiveFile", () => {
    const fileId = "1";
    const expectedState = {
      ...initialState,
      activeFiles: [fileId],
    };
    expect(filesReducer(initialState, addActiveFile(fileId))).toEqual(
      expectedState
    );
  });
  test("should remove a file when action is removeActiveFile", () => {
    const fileId = "1";
    const modifiedInitialState = {
      ...initialState,
      activeFiles: [fileId],
    };
    const expectedState = {
      ...initialState,
      activeFiles: [],
    };
    expect(
      filesReducer(modifiedInitialState, removeActiveFile(fileId))
    ).toEqual(expectedState);
  });
  test("should update the code of a file when action is updateFileCode", () => {
    const payload = {
      fileId: "1",
      newCode: `print("Hello world!")`,
    };
    const modifiedInitialState = {
      ...initialState,
      userFiles: [
        {
          id: "1",
          code: `console.log("Hello world!")`,
          name: "index.js",
          relativePath: "test/index.js",
          extension: ".js",
        },
      ],
    };
    const expectedState = {
      ...initialState,
      userFiles: [
        {
          id: "1",
          code: `print("Hello world!")`,
          name: "index.js",
          relativePath: "test/index.js",
          extension: ".js",
        },
      ],
    };
    expect(filesReducer(modifiedInitialState, updateFileCode(payload))).toEqual(
      expectedState
    );
  });

  //--------------------------

  test("should not update the state when updateFileCode reducer dos not find a file", () => {
    const payload = {
      fileId: "2",
      newCode: `print("Hello world!")`,
    };
    const modifiedInitialState = {
      ...initialState,
      userFiles: [
        {
          id: "1",
          code: `console.log("Hello world!")`,
          name: "index.js",
          relativePath: "test/index.js",
          extension: ".js",
        },
      ],
    };
    const expectedState = {
      ...initialState,
      userFiles: [
        {
          id: "1",
          code: `console.log("Hello world!")`,
          name: "index.js",
          relativePath: "test/index.js",
          extension: ".js",
        },
      ],
    };
    expect(filesReducer(modifiedInitialState, updateFileCode(payload))).toEqual(
      expectedState
    );
  });
  test("should set editor's active file when action is setEditorActiveFile", () => {
    const fileId = "1";
    const expectedState = {
      ...initialState,
      editorActiveFile: fileId,
    };
    expect(filesReducer(initialState, setEditorActiveFile(fileId))).toEqual(
      expectedState
    );
  });
});
