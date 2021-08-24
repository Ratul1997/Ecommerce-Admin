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

import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import Select from "react-select";

import { selectThemeColors } from "@utils";

import htmlToDraft from "html-to-draftjs";

import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import axios from "axios";
import MoreInfoForVariantProduct from "./MoreInfo/MoreInfoForVariantProduct";
import Toaster from "@src/views/common/Toaster";
import {
  ErrorToast,
  onErrorToast,
  onSuccessToast,
  SuccessToast,
} from "../../../common/Toaster";
import axiosInstance from "../../../../configs/axiosInstance";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";

const stockOptions = [
  { value: 1, label: "In Stock" },
  { value: 2, label: "Out Of Stock" },
];

const backOrdersOptions = [
  { value: 1, label: "Do not allow" },
  { value: 2, label: "Allow, but notify customer" },
  { value: 3, label: "Allow" },
];
const getOptionsForStatus = [
  { value: 1, label: "Published" },
  { value: 2, label: "Draft" },
  { value: 3, label: "UnPublished" },
  { value: 4, label: "Pending" },
];
export const ProductDataContext = React.createContext();
const AddProduct = () => {
  const initialContent = ``;
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );

  const getOptionsForProductType = [
    { value: 1, label: "Single Product" },
    { value: 2, label: "Product With Variants" },
  ];

  const editorState = EditorState.createWithContent(contentState);

  const getProductTypeOptionForEdit = type => {
    return getOptionsForProductType.filter(item => item.label === type)[0];
  };
  const convertHtmlToState = initialContent => {
    const contentBlock = htmlToDraft(initialContent);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);

    return editorState;
  };
  const initialState = {
    slug: "",
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

  const [errorCode, setErrorCode] = useState(null);
  const [productData, setProductData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFetch, setIsLoadingFetch] = useState(true);

  const [isEditable, setIsEditable] = useState(false);
  const productContextValue = {
    productData,
    setProductData,
    isEditable,
    id: params.id,
  };
  useEffect(() => {
    if (location.pathname.includes("edit")) {
      const { id } = params;
      loadProduct(id);
    } else {
      setIsLoadingFetch(false);
    }
  }, []);

  const loadProduct = async id => {
    try {
      console.log(id);
      const res = await axiosInstance().get(urls.GET_PRODUCTS_ADMIN_BY_ID + id);
      console.log(res);
      setStateForProduct(res.data.results);
    } catch (error) {
      setErrorCode(error);
    }
    setIsLoadingFetch(false);
  };

  const getStatus = status => {
    return getOptionsForStatus.filter(item => item.value === status);
  };
  const getAllowBackOrders = allowBackOrders => {
    return backOrdersOptions.filter(item => item.label === allowBackOrders);
  };
  const getStockStatus = stock => {
    return stockOptions.filter(item => item.label === stock);
  };
  const setStateForProduct = data => {
    console.log(data.attributes);
    setIsEditable(true);
    setProductData({
      ...productData,
      slug: data.slug,
      sku: data.sku,
      name: data.product_name,
      short_description: convertHtmlToState(data.short_description),
      long_description: convertHtmlToState(data.long_description),
      product_status_id: getStatus(data.product_status_id),
      regular_price: data.regular_price,
      discount_price: data.discount_price,
      quantity: data.manageStock ? data.inventory.quantity : 0,
      manageStock: data.manageStock ? true : false,
      hasFreeShipping: data.hasFreeShipping,
      view_on_website: data.view_on_website,
      featured_img: data.featured_img ? JSON.parse(data.featured_img) : null,
      categories: data.categories.map(item => {
        return { value: item.category_id, label: item.name };
      }),
      product_gallery: data.product_gallery
        ? JSON.parse(data.product_gallery)
        : [],
      attributesList: data.attributes ,
      variations: data.variants || [],
      stock_threshold: data.hasFreeShipping
        ? null
        : data.inventory.stock_threshold,
      allowBackOrders: data.manageStock
        ? { value: 1, label: "Do not allow" }
        : getAllowBackOrders(data.shipping.allowBackOrders),
      shipping_cost: data.hasFreeShipping ? 0.0 : data.shipping.shipping_cost,
      inventory_status: getStockStatus(data.inventory_status),
      productType: getProductTypeOptionForEdit(data.productType),
    });
  };

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
      const res = await axiosInstance().post(url, { product });

      onSuccessToast("Successfully Inserted A Product");

      history.replace("/apps/ecommerce/products");
    } catch (error) {
      onErrorToast(error.data.massage);
    }
    setIsLoading(false);
  };
  // if (isEditable && isLoading) {
  //   return <SpinnerComponent />;
  // }
  return isEditable && isLoadingFetch ? (
    <SpinnerComponent />
  ) : (
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
