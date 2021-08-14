/* eslint-disable */
import React, { Fragment, useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Button,
  CustomInput,
  Label,
  FormGroup,
  Spinner,
} from "reactstrap";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import BlogSidebar from "../../../pages/blog/BlogSidebar";
import ProductDetailsForm from "../../../pages/blog/edit";
import ProductDetailsEdit from "./ProductDetailsEdit";
import WizardVertical from "../../../forms/wizard/WizardVertical";
import MoreInfo from "./MoreInfo";
import { urls } from "@urls";
import { toast } from "react-toastify";

import { Link, useHistory } from "react-router-dom";
import Select from "react-select";

import { selectThemeColors } from "@utils";

import htmlToDraft from "html-to-draftjs";

import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import axios from "axios";
import MoreInfoForVariantProduct from "./MoreInfo/MoreInfoForVariantProduct";
import Toaster from "@src/views/common/Toaster";
import { ErrorToast, SuccessToast } from "../../../common/Toaster";

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
    stock_threshold: { value: 1, label: "In Stock" },
    allowBackOrders: { value: 1, label: "Do not allow" },
    shipping_cost: 0.0,
    inventory_status: { value: 1, label: "In Stock" },
    productType: getOptionsForProductType[0],
  };

  const [productData, setProductData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const optionsAndAttributes = getFormattedProductOptionsAndAttributes();
    const dataOfProduct = {
      ...productData,
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
    uploadProduct(dataOfProduct);
  };
  const uploadProduct = async product => {
    try {
      const url = urls.ADD_A_PRODUCT;
      const res = await axios.post(url, { product });
      console.log(res);
      toast.success(
        <SuccessToast toastText="Successfully Inserted A Product" />,
        { hideProgressBar: true }
      );

      history.replace("/apps/ecommerce/products");
    } catch (error) {
      console.log(error.response);

      toast.error(<ErrorToast toastText={error.response.data.massage} />, {
        hideProgressBar: true,
      });
    }
    setIsLoading(false);
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
            {isLoading ? (
              <Button.Ripple color="primary" disabled>
                <Spinner size="sm" />
                <span className="ml-50">Loading...</span>
              </Button.Ripple>
            ) : (
              <>
                <Button.Ripple
                  color="primary"
                  className="mr-1"
                  onClick={onSave}
                >
                  Save
                </Button.Ripple>
                <Button.Ripple color="secondary" outline>
                  Cancel
                </Button.Ripple>
              </>
            )}
          </Col>
        </Row>
      </Fragment>
    </ProductDataContext.Provider>
  );
};
export default AddProduct;
