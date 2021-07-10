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
  CardText
} from "reactstrap";

import { Menu, Item, useContextMenu } from "react-contexify";
import { Plus, Trash } from "react-feather";
import SweetAlert from "../../common/SweetAlert";

export default function FMediaView({ titles, fileType }) {
  const [files, setFiles] = useState([]);
  const { show } = useContextMenu({
    id: "menu_id"
  });

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
            <Col sm="12">
              {files.length > 0 &&
                files.map((item, key) => {
                  return (
                    <>
                      {/* <Card    width="170"
                        height="110">  */}
                      <img
                        src={item}
                        alt="featured img"
                        width="170"
                        height="110"
                        key={key}
                        className="img-fluid rounded m-1 shadow "
                        //   onClick={e=>console.log(e.target)}
                        onContextMenu={show}
                        outline
                      />
                      <Menu id="menu_id">
                        <Item onClick={SweetAlert(confirmDeleteText, onDelete)}>
                          Delete
                        </Item>
                        <Item>Preview</Item>
                      </Menu>
                      {/* <CardBody>
                        <CardText>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </CardText>
                      </CardBody>
                    </Card> */}
                    </>
                  );
                })}
            </Col>
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
    </>
  );
}
