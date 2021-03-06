import React from "react";
import { makeStyles } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import selectFileViewerData from "../../../store/selectors/selectActiveFiles/selectFileViewerData/selectFileViewerData";
import FileViewerStructure from "../../../types/FileViewerStructure";
import { TreeItem, TreeView } from "@material-ui/lab";
import ExtensionIcon from "../ExtensionIcon/ExtensionIcon";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import FolderIcon from "@material-ui/icons/Folder";
import openFile from "../../../store/thunks/openFile/openFile";

const FileViewer = () => {
  const classes = useStyles();
  const fileViewerData = useAppSelector(selectFileViewerData);
  const dispatch = useAppDispatch();

  const onSelectNode = (node: FileViewerStructure) => {
    dispatch(openFile(node));
  };

  const renderTree = (node: FileViewerStructure) => {
    const { id: nodeID, name: nodeName, extension } = node;
    return (
      <TreeItem
        className={classes.treeItem}
        key={nodeID}
        nodeId={nodeID}
        label={nodeName}
        onDoubleClick={() => onSelectNode(node)}
        endIcon={<ExtensionIcon extension={extension} />}
      >
        {Array.isArray(node.children)
          ? node.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  if (!Object.keys(fileViewerData).length) {
    return (
      <div className={classes.emptyMessage}>
        No files :( Please, <strong>OPEN WORKSPACE </strong>and add some folder
        from your computer with supported extensions
      </div>
    );
  }

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<FolderOpenIcon />}
      defaultExpandIcon={<FolderIcon />}
    >
      {renderTree(fileViewerData)}
    </TreeView>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px 10px 10px",
    height: "100%",
    width: "100%",
  },
  treeItem: {
    padding: "2px",
    color: theme.font,
  },
  emptyMessage: {
    color: theme.font,
    textAlign: "center",
  },
}));

export default FileViewer;
