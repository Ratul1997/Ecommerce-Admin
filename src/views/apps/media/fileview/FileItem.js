/*eslint-disable*/
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
export default function FileItem({file}) {

  const onDeleteClick = (file_id)=>() => {
    console.log(file_id)
    // return SweetAlert(confirmDeleteText, onDelete(file_id));
  };
  return (
    <>
      <LazyLoadImage
        src={
          checkImageTypeOrNot(file.mime_type)
            ? urls.UPLOADED_LINK + file.file_name
            : checkApplicationType(file.mime_type)
        }
        effect="blur"
        alt={file.file_name}
        width="150"
        height="110"
        className="shadow"
        outline
      />
      <p
        className="font-weight-normal pl-1"
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {file.file_name}
      </p>
      <Menu id="menu_id">
        <Item onClick={onDeleteClick(file.file_id)}>Delete</Item>
        {/* <Item>Preview</Item> */}
      </Menu>
    </>
  );
}
