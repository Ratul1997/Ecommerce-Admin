/* eslint-disable */
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";

import { selectThemeColors } from "@utils";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
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
  Button
} from "reactstrap";

import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import SidebarImage from "./SideBar";

const ProductDetailsEdit = ({ productData, setProductData }) => {
  const initialCheckBoxState = {
    "positive-checkbox": false,
    "negative-checkbox": false
  };
  const store = useSelector(store => store.ecommerce);
  const { categories } = store;

  const [slug, setSlug] = useState("");
  const [featuredImageKey, setfeaturedImageKey] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [isChecked, setIsChecked] = useState(initialCheckBoxState);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  //`${stateToHTML(productData.description.getCurrentContent())}`

  const getOptions = () => {
    const options =
      categories &&
      categories.map(item => {
        return { value: item.category_id, label: item.name };
      });

    return options;
  };

  const onSelectFeaturedImage = (item, key) => e => {
    e.preventDefault();
    setfeaturedImageKey(item);
  };

  const getWebsiteView = isChecked => {
    if (!isChecked["negative-checkbox"] && !isChecked["positive-checkbox"])
      return null;
    if (isChecked["negative-checkbox"]) return false;
    if (isChecked["positive-checkbox"]) return true;
  };
  const onCheckBoxValueChange = e => {
    const { name, checked } = e.target;
    console.log(name, checked);
    const newIsChecked = {
      ...isChecked,
      [name]: checked
    };
    setIsChecked({
      ...newIsChecked
    });
    setProductData({
      ...productData,
      view_on_website: getWebsiteView(newIsChecked)
    });
  };

  const onRemove = key => e => {
    const updatedImages = images;

    updatedImages.splice(key, 1);
    setImages([...updatedImages]);
    setfeaturedImageKey(updatedImages[0]);
  };

  return (
    <div className="blog-edit-wrapper">
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Form className="mt-2" onSubmit={e => e.preventDefault()}>
                <Row>
                  <Col md="6">
                    <FormGroup className="mb-2">
                      <Label for="blog-edit-title">Title</Label>
                      <Input
                        id="blog-edit-title"
                        value={productData.name}
                        onChange={e =>
                          setProductData({
                            ...productData,
                            name: e.target.value
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-2">
                      <Label for="blog-edit-category">Category</Label>
                      <Select
                        id="blog-edit-category"
                        isClearable={false}
                        theme={selectThemeColors}
                        value={productData.categories}
                        isMulti
                        name="colors"
                        options={getOptions()}
                        className="react-select"
                        classNamePrefix="select"
                        onChange={data =>
                          setProductData({ ...productData, categories: data })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-2">
                      <Label for="blog-edit-slug">Slug</Label>
                      <Input
                        id="blog-edit-slug"
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-2">
                      <Label for="blog-edit-status">Status</Label>
                      <Input
                        type="select"
                        id="blog-edit-status"
                        value={productData.productStatusId.toString()}
                        onChange={e =>
                          setProductData({
                            ...productData,
                            productStatusId: parseInt(e.target.value)
                          })
                        }
                      >
                        <option value="1">Published</option>
                        <option value="2">Draft</option>
                        <option value="3">UnPublished</option>
                        <option value="4">Pending</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="12" lg="9" xl="9">
                    <FormGroup className="mb-2">
                      <Label>Content</Label>
                      <Editor
                        editorState={productData.description}
                        onEditorStateChange={data =>
                          setProductData({
                            ...productData,
                            description: data
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col className="mb-2 " sm="12" md="12" lg="3" xl="3">
                    <FormGroup>
                      <Label>Featured Image</Label>
                      <div
                        className="border rounded"
                        style={{ width: 210, height: 210 }}
                      >
                        {featuredImageKey && (
                          <img
                            className="rounded m-1"
                            src={require(`@uploads/${featuredImageKey.file_name}`).default}
                            alt="featured img"
                            width="180"
                            height="180"
                          />
                        )}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col>
                    <Card sm="12" className="border rounded p-2">
                      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
                        <CardTitle tag="h4">Gallery</CardTitle>
                        <div className="d-flex mt-md-0 mt-1">
                          <Button
                            className="ml-2"
                            color="primary"
                            onClick={
                              toggleSidebar
                              // document
                              //   .getElementById("multipleFileSelect")
                              //   .click()
                            }
                          >
                            <Plus size={15} />
                            <span className="align-middle ml-50">
                              Add Image
                            </span>
                          </Button>
                        </div>
                      </CardHeader>
                      <Row className="p-1">
                        {images.length > 0 &&
                          images.map((item, key) => (
                            <div
                              className={
                                item === featuredImageKey
                                  ? "rounded m-1  border-warning shadow "
                                  : "rounded m-1"
                              }
                              style={{
                                width: "170",
                                height: "110"
                              }}
                              key={key}
                            >
                              <X
                                className="float-right bg-primary"
                                color="white"
                                size={15}
                                style={{
                                  position: "absolute",
                                  borderRadius: 50
                                }}
                                onClick={onRemove(key)}
                              />
                              <img
                                src={
                                  require(`@uploads/${item.file_name}`).default
                                }
                                alt="featured img"
                                width="170"
                                height="110"
                                key={key}
                                onClick={onSelectFeaturedImage(item)}
                              ></img>
                            </div>
                          ))}
                      </Row>
                    </Card>
                  </Col>
                  <Col sm="12">
                    <FormGroup row>
                      <Col sm="6">
                        <Label sm="6" for="check-box-for-website-positive">
                          Do you want to publish into website?
                          <span className="text-danger">*</span>
                        </Label>
                      </Col>

                      <Col sm="3" className="p-0.5">
                        <CustomInput
                          type="checkbox"
                          id="check-box-for-website-positive"
                          defaultChecked={false}
                          label="Yes"
                          disabled={isChecked["negative-checkbox"]}
                          name="positive-checkbox"
                          onChange={onCheckBoxValueChange}
                        />
                      </Col>

                      <Col sm="3">
                        <CustomInput
                          type="checkbox"
                          id="check-box-for-website-negative"
                          defaultChecked={false}
                          disabled={isChecked["positive-checkbox"]}
                          label="No"
                          name="negative-checkbox"
                          onChange={onCheckBoxValueChange}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <SidebarImage
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        selectedImages={images}
        setSelectedImages={setImages}
      />
    </div>
  );
};

export default ProductDetailsEdit;
