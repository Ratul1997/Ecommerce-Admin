/* eslint-disable */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { stateToHTML } from "draft-js-export-html";
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import SidebarImage from "./SideBar";
import ProductBasicInfo from "./ProductBasicInfo";
import { ProductDataContext } from "..";
import { getOptionsForStatus } from "../Constants";
import consoleLog from "@console";
import axiosInstance from "../../../../../configs/axiosInstance";
import { urls } from "../../../../../utility/Urls";
import { onErrorToast, onSuccessToast } from "../../../../common/Toaster";
import productServices from "../../../../../services/productServices";

const ProductDetailsEdit = () => {
  const { productData, setProductData, isEditable, id } =
    useContext(ProductDataContext);

  const initialCheckBoxState = {
    "positive-checkbox": isEditable
      ? productData.view_on_website === 1
        ? true
        : false
      : false,
    "negative-checkbox": isEditable
      ? productData.view_on_website !== 1
        ? true
        : false
      : false,
  };

  const store = useSelector(store => store.ecommerce);
  const { categories } = store;

  const [slug, setSlug] = useState("");
  const [newCategoryState, setCategoryState] = useState([]);
  const { featured_img, product_gallery } = productData;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(initialCheckBoxState);
  const [isUploading, setIsUploading] = useState(false);
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  //`${stateToHTML(productData.description.getCurrentContent())}`

  const getOptions = () => {
    const options = [];
    categories &&
      categories.filter(item => {
        if (item.parent_id) {
          options.push({ value: item.category_id, label: item.name });
        }
      });

    return options;
  };

  const onSelectFeaturedImage = (item, key) => e => {
    e.preventDefault();
    setProductData({ ...productData, featured_img: item });
  };

  const getWebsiteView = isChecked => {
    if (!isChecked["negative-checkbox"] && !isChecked["positive-checkbox"])
      return null;
    if (isChecked["negative-checkbox"]) return false;
    if (isChecked["positive-checkbox"]) return true;
  };
  const onCheckBoxValueChange = e => {
    const { name, checked } = e.target;

    const newIsChecked = {
      ...isChecked,
      [name]: checked,
    };
    setIsChecked({
      ...newIsChecked,
    });
    setProductData({
      ...productData,
      view_on_website: getWebsiteView(newIsChecked),
    });
  };

  const onRemove = key => e => {
    const updatedImages = product_gallery;
    updatedImages.splice(key, 1);
    setProductData({
      ...productData,
      featured_img: updatedImages[0],
      product_gallery: [...updatedImages],
    });
  };

  const onUpdate = () => {
    if (newCategoryState.length === 0) {
      onErrorToast("Select A Category!");
      return;
    }

    let newCategories = newCategoryState.map(item => item.value);
    let oldCategories = productData.categories.map(item => item.value);
    let newLyData = oldCategories
      .filter(x => !newCategories.includes(x))
      .concat(newCategories.filter(x => !oldCategories.includes(x)));

    const deletedId = productData.categories
      .filter(item => newLyData.findIndex(x => x === item.value) > -1)
      .map(item => item.value);

    const insertedId = newLyData.filter(
      x => productData.categories.findIndex(item => item.value === x) === -1
    );

    const updatedData = {
      product_name: productData.name,
      slug: productData.slug,
      product_gallery: productData.product_gallery
        ? JSON.stringify(productData.product_gallery)
        : [],
      featured_img: productData.featured_img
        ? JSON.stringify(productData.featured_img)
        : null,
      product_status_id: productData.product_status_id.value,
      view_on_website: productData.view_on_website,
      sku: productData.sku,
      short_description: stateToHTML(
        productData.short_description.getCurrentContent()
      ),
      long_description: stateToHTML(
        productData.long_description.getCurrentContent()
      ),
      newCategories: insertedId,
      deletedCategories: deletedId,
    };

    consoleLog(updatedData.product_status_id);
    onUploadUpdatedData(updatedData);
    console.log(updatedData.long_description)
  };

  const onUploadUpdatedData = async updatedData => {
    setIsUploading(true);
    try {
      const response = await productServices.updateProductDetailsById(id, {
        ...updatedData,
      });
      setProductData({
        ...productData,
        categories: newCategoryState,
      });
      onSuccessToast("Updated");
    } catch (error) {
      consoleLog(error);
      onErrorToast("Internal Server Error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="blog-edit-wrapper">
      <ProductBasicInfo
        toggleSidebar={toggleSidebar}
        productData={productData}
        setProductData={setProductData}
        getOptions={getOptions}
        slug={slug}
        setSlug={setSlug}
        featured_img={featured_img}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        onCheckBoxValueChange={onCheckBoxValueChange}
        onSelectFeaturedImage={onSelectFeaturedImage}
        product_gallery={product_gallery}
        getOptionsForStatus={getOptionsForStatus}
        onRemove={onRemove}
        onUpdate={onUpdate}
        newCategoryState={newCategoryState}
        setCategoryState={setCategoryState}
        isUploading={isUploading}
      />
      <SidebarImage open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default ProductDetailsEdit;
