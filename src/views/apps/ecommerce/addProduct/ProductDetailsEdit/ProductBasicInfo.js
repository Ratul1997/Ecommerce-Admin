/* eslint-disable */
import { useState, useEffect } from "react";
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
} from "reactstrap";

import { urls } from "@urls";
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";

import defaultFeaturedImage from "@src/assets/images/icons/image.png";
export default function ProductBasicInfo({
  productData,
  setProductData,
  getOptions,
  toggleSidebar,
  slug,
  setSlug,
  featured_img,
  isChecked,
  onCheckBoxValueChange,
  onSelectFeaturedImage,
  product_gallery,
  getOptionsForStatus,
  onRemove,
}) {
  const slugFormat = slug => {
    return slug.replace(/\s/g, "-");
  };
  return (
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
                          name: e.target.value,
                          slug: slugFormat(e.target.value.toLowerCase()),
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mb-2">
                    <Label>Category</Label>
                    <Select
                      isClearable={false}
                      theme={selectThemeColors}
                      value={productData.categories}
                      isMulti
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
                    <Label>Slug</Label>
                    <Input
                      value={productData.slug}
                      onChange={e =>
                        setProductData({
                          ...productData,
                          slug: e.target.value.toLowerCase(),
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mb-2">
                    <Label for="blog-edit-status">Status</Label>
                    <Select
                      id="blog-edit-status"
                      isClearable={false}
                      theme={selectThemeColors}
                      value={productData.product_status_id}
                      options={getOptionsForStatus()}
                      className="react-select"
                      classNamePrefix="select"
                      onChange={data =>
                        setProductData({
                          ...productData,
                          product_status_id: data,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="9" xl="9">
                  <FormGroup className="mb-2">
                    <Label>Short Description</Label>
                    <Editor
                      editorState={productData.short_description}
                      onEditorStateChange={data =>
                        setProductData({
                          ...productData,
                          short_description: data,
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
                      <img
                        className="rounded m-1"
                        src={
                          featured_img
                            ? urls.UPLOADED_LINK + featured_img.file_name
                            : defaultFeaturedImage
                        }
                        alt='featured image'
                        width="180"
                        height="180"
                      />
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
                          onClick={toggleSidebar}
                        >
                          <Plus size={15} />
                          <span className="align-middle ml-50">Add Image</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <Row className="p-1">
                      {product_gallery &&
                        product_gallery.map((item, key) => (
                          <div
                            className={
                              item === featured_img
                                ? "rounded m-1  border-warning shadow "
                                : "rounded m-1"
                            }
                            style={{
                              width: "170",
                              height: "110",
                            }}
                            key={key}
                          >
                            <X
                              className="float-right bg-primary"
                              color="white"
                              size={15}
                              style={{
                                position: "absolute",
                                borderRadius: 50,
                              }}
                              onClick={onRemove(key)}
                            />
                            <img
                              src={urls.UPLOADED_LINK + item.file_name}
                              alt={item.file_name}
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
                        defaultChecked={isChecked["positive-checkbox"]}
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
                        defaultChecked={isChecked["negative-checkbox"]}
                        disabled={isChecked["positive-checkbox"]}
                        label="No"
                        name="negative-checkbox"
                        onChange={onCheckBoxValueChange}
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup className="mb-2">
                    <Label>Long Description</Label>
                    <Editor
                      editorState={productData.long_description}
                      onEditorStateChange={data =>
                        setProductData({
                          ...productData,
                          long_description: data,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
