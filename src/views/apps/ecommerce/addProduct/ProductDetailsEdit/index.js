/* eslint-disable semi */
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Avatar from "@components/avatar";
import htmlToDraft from "html-to-draftjs";
import { selectThemeColors } from "@utils";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Media,
  Form,
  Label,
  Input,
  FormGroup,
  CustomInput,
  Button
} from "reactstrap";

import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";

const ProductDetailsEdit = () => {
  const initialContent = ``;

  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const editorState = EditorState.createWithContent(contentState);

  const [data, setData] = useState(null),
    [title, setTitle] = useState(""),
    [slug, setSlug] = useState(""),
    [status, setStatus] = useState(""),
    [content, setContent] = useState(editorState),
    [blogCategories, setBlogCategories] = useState([]),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState("banner.jpg");

  useEffect(() => {
    axios.get("/blog/list/data/edit").then(res => {
      setData(res.data);
      setTitle(res.data.blogTitle);
      setSlug(res.data.slug);
      setBlogCategories(res.data.blogCategories);
      setFeaturedImg(res.data.featuredImage);
      setStatus(res.data.status);
    });
  }, []);

  const categories = [
    { value: "fashion", label: "Fashion" },
    { value: "gaming", label: "Gaming" },
    { value: "quote", label: "Quote" },
    { value: "video", label: "Video" },
    { value: "food", label: "Food" }
  ];

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files;
    setImgPath(files[0].name);
    reader.onload = function() {
      setFeaturedImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
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
                        value={title}
                        onChange={e => setTitle(e.target.value)}
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
                        value={blogCategories}
                        isMulti
                        name="colors"
                        options={categories}
                        className="react-select"
                        classNamePrefix="select"
                        onChange={data => setBlogCategories(data)}
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
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                      >
                        <option value="Published">Published</option>
                        <option value="Pending">Pending</option>
                        <option value="Draft">Draft</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup className="mb-2">
                      <Label>Content</Label>
                      <Editor
                        editorState={content}
                        onEditorStateChange={data => setContent(data)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="mb-2" sm="12">
                    <div className="border rounded p-2">
                      <h4 className="mb-1">Featured Image</h4>
                      <Media className="flex-column flex-md-row">
                        <img
                          className="rounded mr-2 mb-1 mb-md-0"
                          src={featuredImg}
                          alt="featured img"
                          width="170"
                          height="110"
                        />
                        <Media body>
                          <small className="text-muted">
                            Required image resolution 800x400, image size 10mb.
                          </small>

                          <p className="my-50">
                            <a href="/" onClick={e => e.preventDefault()}>
                              {`C:/fakepath/${imgPath}`}
                            </a>
                          </p>
                          <div className="d-inline-block">
                            <FormGroup className="mb-0">
                              <CustomInput
                                type="file"
                                id="exampleCustomFileBrowser"
                                name="customFile"
                                onChange={onChange}
                                accept=".jpg, .png, .gif"
                              />
                            </FormGroup>
                          </div>
                        </Media>
                      </Media>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailsEdit;
