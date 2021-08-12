/* eslint-disable */
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Button, CustomInput, Label, FormGroup } from "reactstrap";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import BlogSidebar from "../../../pages/blog/BlogSidebar";
import ProductDetailsForm from "../../../pages/blog/edit";
import ProductDetailsEdit from "./ProductDetailsEdit";
import WizardVertical from "../../../forms/wizard/WizardVertical";
import MoreInfo from "./MoreInfo";
import { urls } from "@urls";

import { Link, useHistory } from "react-router-dom";
import Select from "react-select";

import { selectThemeColors } from "@utils";

import htmlToDraft from "html-to-draftjs";

import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import axios from "axios";
import MoreInfoForVariantProduct from "./MoreInfo/MoreInfoForVariantProduct";

export const ProductDataContext = React.createContext();
const AddProduct = () => {
  const initialContent = ``;
  const history = useHistory();

  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );

  const getOptionsForProductType = [
    { value: 1, label: "Single Product" },
    { value: 2, label: "Product With Variants" },
  ];
  const editorState = EditorState.createWithContent(contentState);

  const initialState = {
    sku: "",
    name: "",
    short_description: editorState,
    long_description: editorState,
    product_status_id: "",
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
    variations: [],
    stock_threshold: null,
    allowBackOrders: { value: 1, label: "Do not allow" },
    shipping_cost: 0.0,
    inventory_status: { value: 1, label: "In Stock" },
    productType: getOptionsForProductType[0],
  };

  const [productData, setProductData] = useState(initialState);
  console.table(productData.attributesList);
  const productContextValue = { productData, setProductData };
  const removeKeyFromImageObject = image => {
    if (!image) return { file_name: null, file_id: null };
    const updateImage = {
      file_name: image.file_name,
      file_id: image.file_id,
    };
    return updateImage;
  };
  const getFormattedProductOptionsAndAttributes = () => {
    const options = [];
    const attributes = [];
    productData.attributesList.map(item => {
      const { selectedOptions } = item;
      attributes.push({
        attribute_id: item.attribute_id,
        attribute_name: item.attribute_name,
      });
      selectedOptions.map(optionItem => {
        options.push(optionItem.value);
      });
    });
    return { options: options, attributes: attributes };
  };

  const onSave = e => {
    e.preventDefault();
    const optionsAndAttributes = getFormattedProductOptionsAndAttributes();
    const dataOfProduct = {
      ...productData,
      discount_price:
        productData.discount_price === (0.0 || 0)
          ? productData.discount_price
          : 0,
      short_description: stateToHTML(
        productData.short_description.getCurrentContent()
      ),
      long_description: stateToHTML(
        productData.long_description.getCurrentContent()
      ),

      featured_img: JSON.stringify(
        removeKeyFromImageObject(productData.featured_img)
      ),

      product_gallery: JSON.stringify(
        productData.product_gallery.map(item => removeKeyFromImageObject(item))
      ),

      productType: productData.productType.value,
      product_options:
        optionsAndAttributes.options.length > 0
          ? optionsAndAttributes.options
          : null,

      attributesList:
        optionsAndAttributes.attributes.length > 0
          ? optionsAndAttributes.attributes
          : null,

      variations:
        productData.variations.length > 0 ? productData.variations : null,

      inventory_status: productData.inventory_status.value,
      product_status_id: productData.product_status_id.value,
      allowBackOrders: productData.allowBackOrders.value,
    };
    console.log(dataOfProduct);
    history.replace("/apps/ecommerce/products");
    // uploadProduct(dataOfProduct);
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

        <FormGroup row>
          <Col sm="5">
            <Label>Product Type</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              value={productData.productType}
              options={getOptionsForProductType}
              onChange={data =>
                setProductData({
                  ...productData,
                  productType: data,
                })
              }
            />
          </Col>
        </FormGroup>

        <Row>
          <Col sm="12">
            {productData.productType.value === 1 ? (
              <MoreInfo
                productData={productData}
                setProductData={setProductData}
              />
            ) : (
              <MoreInfoForVariantProduct
                productData={productData}
                setProductData={setProductData}
              />
            )}
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
