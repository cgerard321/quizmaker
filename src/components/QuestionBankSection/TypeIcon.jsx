import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import description from "../../assets/icons/icon-description.svg";
import essay from "../../assets/icons/icon-essay.svg";

export const TypeIcon = (props) => {
  if (props.droppable) {
    return <FolderIcon />;
  }

  switch (props.fileType) {
    case "description":
      return <img src={description} alt="Description" />;
    case "essay":
      return <img src={essay} alt="Essay" />;
    case "image":
      return <ImageIcon />;
    case "csv":
      return <ListAltIcon />;
    case "text":
      return <DescriptionIcon />;
    default:
      return <DescriptionIcon />;
  }
};