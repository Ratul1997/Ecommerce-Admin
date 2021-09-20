/* eslint-disable */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";

import { selectThemeColors } from "@utils";
import { Editor } from "react-draft-wysiwyg";
import { Plus, X } from "react-feather";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  FormGroup,
  CustomInput,
  CardHeader,
  CardTitle,
  Button,
  CardImg,
} from "reactstrap";

import { urls } from "@urls";
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import useToggle from "@hooks/useToggle";
import defaultFeaturedImage from "@src/assets/images/icons/image.png";

import Spinner from "reactstrap/lib/Spinner";
import SidebarImage from "./SidebarImage";
import consoleLog from "@console";
import axiosInstance from "@configs/axiosInstance";
import {
  ErrorToast,
  onErrorToast,
  onSuccessToast,
  SuccessToast,
} from "../../../common/Toaster";
export default function SliderImage() {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useToggle(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  };
  const onRemove = key => e => {
    const updatedImages = images;
    updatedImages.splice(key, 1);
    setImages([...updatedImages]);
  };

  useEffect(() => {
    loadSliders();
  }, []);

  const loadSliders = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_SLIDER);
      setImages(
        res.data.images.map(item => {
          return {
            file_name: item.image,
            file_id: item.id,
          };
        })
      );
    } catch (error) {
      consoleLog(error);
    }
  };

  const onSave = () => {
    const sliders = images.map(item => {
      return {
        id: item.file_id,
        image: item.file_name,
      };
    });
    console.log(sliders);
    consoleLog(sliders);
    onUpdate(sliders);
  };
  const onUpdate = async sliders => {
    try {
      const res = await axiosInstance().patch(urls.UPDATE_SLIDER, {
        sliders,
      });
      onSuccessToast("Updated");
    } catch (error) {
      consoleLog(error);
      onErrorToast(error.data.massage);
    }
  };
  return (
    <>
      <Card sm="12" className="border rounded p-2">
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">Slider Images</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ml-2" color="primary" onClick={toggleSidebar}>
              <Plus size={15} />
              <span className="align-middle ml-50">Add Image</span>
            </Button>
          </div>
        </CardHeader>
        <Row className="p-1">
          {images &&
            images.map((item, key) => (
              <Col sm="6">
                <div className="rounded m-1" key={key}>
                  <X
                    className="float-right bg-primary"
                    color="white"
                    size={15}
                    onClick={onRemove(key)}
                  />
                  <CardImg
                    src={urls.UPLOADED_LINK + item.file_name}
                    alt={item.file_name}
                    key={key}
                  ></CardImg>
                </div>
              </Col>
            ))}
        </Row>
      </Card>
      <SidebarImage
        open={open}
        toggleSidebar={toggleSidebar}
        slider_gallery={images}
        setSliderGallery={setImages}
      />
      <Button color="primary" onClick={onSave}>
        Update
      </Button>
    </>
  );
}
