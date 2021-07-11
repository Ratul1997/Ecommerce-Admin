/* eslint-disable */
import React, { useState, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  CardBody,
  Input,
  Row,
  Col,
  CardText,
  CardImg,
  CardFooter
} from "reactstrap";

import { size, toArray } from "lodash";

import { Menu, Item, useContextMenu } from "react-contexify";
import { Plus, Trash } from "react-feather";
import SweetAlert from "../../common/SweetAlert";
import UploadProgress from "../../common/upload/UploadProgress/UploadProgress";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
  setUploadFile,
  closeUpload
} from "../../common/upload/store/action/uploadFile.actions";

import pdf from "@src/assets/images/icons/file-icons/pdf.png";
import doc from "@src/assets/images/icons/file-icons/doc.png";
import zip from "@src/assets/images/icons/file-icons/zip.png";
import excel from "@src/assets/images/icons/file-icons/excel.png";

export default function FMediaView({ titles, fileType }) {
  const [files, setFiles] = useState([]);
  const { show } = useContextMenu({
    id: "menu_id"
  });

  const dispatch = useDispatch();
  const store = useSelector(store => store.UploadFile);
  console.log(store);
  const confirmDeleteText = {
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    confirmIcon: "success",
    confirmTitle: "Deleted!",
    confirmText: "Your file has been deleted."
  };

  const onDelete = () => {
    console.log("ss");
  };

  const onClose = () => {
    const flag = false;
    toArray(store).map(item => {
      if (item.progress) {
        flag = true;
        return;
      }
    });
    dispatch(closeUpload());
  };

  const handleFileChosen = async file => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        console.log(fileReader.result);

        resolve(fileReader.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsDataURL(file);
    });
  };

  const convertObjectToArray = objects => {
    let arr = [];
    for (const [key, value] of Object.entries(objects)) {
      arr.push(value);
    }
    return arr;
  };
  const onMultipleChange = async e => {
    const selectedFiles = e.target.files;
    dispatch(setUploadFile(selectedFiles));
    const AllFiles = convertObjectToArray(selectedFiles);
    const results = await Promise.all(
      AllFiles.map(async file => {
        const fileContents = await handleFileChosen(file);
        return fileContents;
      })
    );
    console.log(results, files);
    // setImagesPath([...imagesPath, ...AllFiles]);
    setFiles([...files, ...results]);
  };
  return (
    <>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">{titles}</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button
              className="ml-2"
              color="primary"
              onClick={e => document.getElementById("fileSelect").click()}
            >
              <Plus size={15} />
              <span className="align-middle ml-50">Add {titles}</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            {files.length > 0 &&
              files.map((item, key) => {
                return (
                  <div
                    className="img-fluid rounded m-1 shadow  bg-lighten-5 align-items-center"
                    style={{ width: 150, height: 150 }}
                  >
                    <img
                      src={excel}
                      alt="featured img"
                      width="150"
                      height="110"
                      key={key}
                      className="shadow"
                      //   onClick={e=>console.log(e.target)}
                      onContextMenu={show}
                      outline
                    />
                    <p
                      className="font-weight-normal pl-1"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                      }}
                    >
                      Image Name .font-weight-normal.font-weight-normal .png
                    </p>
                    <Menu id="menu_id">
                      <Item onClick={SweetAlert(confirmDeleteText, onDelete)}>
                        Delete
                      </Item>
                      <Item>Preview</Item>
                    </Menu>
                  </div>
                );
              })}
          </Row>
        </CardBody>
      </Card>
      <Input
        type="file"
        id="fileSelect"
        name="customFiles"
        onChange={onMultipleChange}
        accept={fileType}
        multiple
        className="d-none"
      />
      <UploadProgress onClose={onClose} />
    </>
  );
}

{
  /* */
}
