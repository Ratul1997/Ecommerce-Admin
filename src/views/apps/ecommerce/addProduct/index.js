/* eslint-disable semi */
import { Fragment, useState, useEffect } from "react";
import { Row, Col, Button, CustomInput, Label } from "reactstrap";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import BlogSidebar from "../../../pages/blog/BlogSidebar";
import ProductDetailsForm from "../../../pages/blog/edit";
import ProductDetailsEdit from "./ProductDetailsEdit";
import WizardVertical from "../../../forms/wizard/WizardVertical";
import MoreInfo from "./MoreInfo";

import htmlToDraft from "html-to-draftjs";

import { EditorState, ContentState } from "draft-js";

const AddProduct = () => {
  const initialContent = ``;

  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const editorState = EditorState.createWithContent(contentState);

  const initialState = {
    sku: "",
    name: "",
    description: editorState,
    productStatusId: "",
    regular_price: 0.0,
    discount_price: 0.0,
    quantity: 0,
    view_on_website: null,
    featured_img: "",
    categories: []
  };

  const [productData, setProductData] = useState(initialState);
  console.log(productData);
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Add Product"
        breadCrumbParent="eCommerce"
        breadCrumbActive="Add Product"
      />

      <Row>
        <Col sm="12">
          <ProductDetailsEdit
            productData={productData}
            setProductData={setProductData}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <MoreInfo productData={productData} setProductData={setProductData} />
        </Col>
      </Row>

      <Row>
        <Col className="mt-50">
          <Button.Ripple color="primary" className="mr-1">
            Save Changes
          </Button.Ripple>
          <Button.Ripple color="secondary" outline>
            Cancel
          </Button.Ripple>
        </Col>
      </Row>
    </Fragment>
  );
};
export default AddProduct;
