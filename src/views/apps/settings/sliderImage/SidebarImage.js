/* eslint-disable  */
// ** React Import
import { useState, useEffect, Fragment, useContext } from "react";

import Select, { components } from "react-select";
// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import {
  Button,
  FormGroup,
  Label,
  FormText,
  Form,
  Input,
  Row,
  Col,
  CardHeader,
  CardTitle,
} from "reactstrap";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { checkImageTypeOrNot } from "../../media/files/utils/utils";
import { Upload, Plus } from "react-feather";

import UploadProgress from "../../../common/upload/UploadProgress/UploadProgress";
import {
  setUploadFile,
  closeUpload,
} from "../../../common/upload/store/action";
import { findIndexToTheArray, addToArray, removeFromArray } from "@utils";
import { urls } from "@urls";
const IMAGE_INDEX_THRESHOLD = -1;
const SidebarImage = ({
  open,
  toggleSidebar,
  slider_gallery,
  setSliderGallery,
}) => {
  const mediaFiles = useSelector(store => store.mediaReducer);
  const dispatch = useDispatch();
  const images = mediaFiles.files.filter(item => {
    if (checkImageTypeOrNot(item.mime_type)) return item;
  });

  const onClose = () => {
    dispatch(closeUpload());
  };

  if (!open) {
    onClose();
  }
  const onMultipleChange = async e => {
    const files = e.target.files;

    dispatch(setUploadFile(files));
    // setSelectedFiles(files);
  };

  const onClickOnImagesList = item => e => {
    const index = findIndexToTheArray(slider_gallery, item);
    var updatedSelectedList = [];
    if (index > IMAGE_INDEX_THRESHOLD) {
      updatedSelectedList = removeFromArray(slider_gallery, index);
    } else {
      updatedSelectedList = addToArray(slider_gallery, item);
    }
    setSliderGallery(updatedSelectedList);
  };
  return (
    <Sidebar
      size="lg"
      open={open}
      title=""
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      //   style={{BA    }}
    >
      <Row>
        <Col>
          <h4>Gallery</h4>
        </Col>
        <Col>
          <div className="d-flex mt-md-0 mt-0 justify-content-end">
            <Button
              className="ml-2"
              color="primary"
              onClick={e => document.getElementById("fileSelect").click()}
            >
              <Plus size={15} />
              <span className="align-middle ml-50">Add</span>
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        {images.length > 0 &&
          images.map((item, key) => (
            <div
              className={
                findIndexToTheArray(slider_gallery, item) >
                IMAGE_INDEX_THRESHOLD
                  ? "img-fluid rounded m-1 bg-lighten-5 border-primary"
                  : "img-fluid rounded m-1 bg-lighten-5 "
              }
              style={{
                width: "100",
                height: "100",
              }}
              key={key}
            >
              <LazyLoadImage
                src={urls.UPLOADED_LINK + item.file_name}
                alt={item.file_name}
                width="100"
                height="100"
                className="bg-primary"
                effect="blur"
                onClick={onClickOnImagesList(item)}
              />
            </div>
          ))}
      </Row>
      <Input
        type="file"
        id="fileSelect"
        name="customFilesUpload"
        onChange={onMultipleChange}
        accept="images/*"
        multiple
        className="d-none"
      />

      <UploadProgress onClose={onClose} />
    </Sidebar>
  );
};

export default SidebarImage;
