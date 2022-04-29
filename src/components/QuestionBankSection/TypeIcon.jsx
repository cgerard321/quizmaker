import React from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import description from "../../assets/icons/icon-description.svg";
import essay from "../../assets/icons/icon-essay.svg";
import truefalse from "../../assets/icons/icon-truefalse.svg";

export const TypeIcon = (props) => {
  if (props.droppable) {
    return <FolderOpenIcon />;
  }

  switch (props.questionType) {
    case "description":
      return <img src={description} alt="Description" />;
    case "essay":
      return <img src={essay} alt="Essay" />;
      case "truefalse":
        return <img src={truefalse} alt="True-False" />;
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