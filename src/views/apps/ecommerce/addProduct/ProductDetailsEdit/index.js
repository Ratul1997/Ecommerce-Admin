/* eslint-disable */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";

import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import SidebarImage from "./SideBar";
import ProductBasicInfo from "./ProductBasicInfo";
import { ProductDataContext } from "..";

const ProductDetailsEdit = () => {
	const { productData, setProductData } = useContext(ProductDataContext);
	const initialCheckBoxState = {
    "positive-checkbox": false,
    "negative-checkbox": false,
  };
  const store = useSelector(store => store.ecommerce);
  const { categories } = store;

  const [slug, setSlug] = useState("");

  const { featured_img, product_gallery } = productData;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(initialCheckBoxState);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  //`${stateToHTML(productData.description.getCurrentContent())}`

  const getOptionsForStatus = () => {
    const options = [
      { value: 2, label: "Draft" },
      { value: 1, label: "Published" },
      { value: 3, label: "UnPublished" },
      { value: 4, label: "Pending" },
    ];
    return options;
  };
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
      />
      <SidebarImage
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default ProductDetailsEdit;
