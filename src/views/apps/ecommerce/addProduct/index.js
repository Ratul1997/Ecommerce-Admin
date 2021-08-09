/* eslint-disable */
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Button, CustomInput, Label } from "reactstrap";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import BlogSidebar from "../../../pages/blog/BlogSidebar";
import ProductDetailsForm from "../../../pages/blog/edit";
import ProductDetailsEdit from "./ProductDetailsEdit";
import WizardVertical from "../../../forms/wizard/WizardVertical";
import MoreInfo from "./MoreInfo";
import { urls } from "@urls";

import htmlToDraft from "html-to-draftjs";

import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import axios from "axios";

export const ProductDataContext = React.createContext();
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
    manageStock: false,
    hasFreeShipping: true,
    view_on_website: null,
    featured_img: null,
    categories: [],
    product_gallery: [],
    attributesList: [],
  };

  const [productData, setProductData] = useState(initialState);
  console.table(productData.attributesList);
  const productContextValue = { productData, setProductData };
  const removeKeyFromImageObject = image => {
    const updateImage = {
      file_name: image.file_name,
      file_id: image.file_id,
    };
    return updateImage;
  };
  //`${}`
  const onSave = e => {
    e.preventDefault();
    const dataOfProduct = {
      ...productData,
      description: stateToHTML(productData.description.getCurrentContent()),
      featured_img: removeKeyFromImageObject(productData.featured_img),
      product_gallery: productData.product_gallery.map(item =>
        removeKeyFromImageObject(item)
      ),
    };
    uploadProduct(dataOfProduct);
  };

  const uploadProduct = async product => {
    try {
      const url = urls.ADD_A_PRODUCT;
      const res = await axios.post(url, { product });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductDataContext.Provider value={productContextValue}>
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
            <MoreInfo
              productData={productData}
              setProductData={setProductData}
            />
          </Col>
        </Row>

        <Row>
          <Col className="mt-50">
            <Button.Ripple color="primary" className="mr-1" onClick={onSave}>
              Save
            </Button.Ripple>
            <Button.Ripple color="secondary" outline>
              Cancel
            </Button.Ripple>
          </Col>
        </Row>
      </Fragment>
    </ProductDataContext.Provider>
  );
};
export default AddProduct;
