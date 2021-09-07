/* eslint-disable */
import React from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Menu, Item } from "react-contexify";
import SweetAlert from "@src/views/common/SweetAlert";
import {
  checkImageTypeOrNot,
  checkApplicationType,
} from "../files/utils/utils";
import { urls } from "@urls";
import FileItem from "./FileItem";
export default function FileAsGrid({
  files,
  show,
  confirmDeleteText,
  onDelete,
}) {
  return (
    files.length > 0 &&
    files.map((file, key) => {
      return (
        <div
          className="img-fluid rounded m-1 shadow  bg-lighten-5 align-items-center"
          style={{ width: 150, height: 150 }}
          key={key}
          onContextMenu={show}
        >
         <FileItem file={file}/>
        </div>
      );
    })
  );
}
