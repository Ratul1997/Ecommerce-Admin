/* eslint-disable semi */
import { Fragment, useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import BlogSidebar from "../../../pages/blog/BlogSidebar";
import ProductDetailsForm from "../../../pages/blog/edit";
import ProductDetailsEdit from "./ProductDetailsEdit";
import WizardVertical from "../../../forms/wizard/WizardVertical";
import MoreInfo from "./MoreInfo";

const AddProduct = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Blog Edit"
        breadCrumbParent="Pages"
        breadCrumbParent2="Blog"
        breadCrumbActive="Edit"
      />
      <Row>
        <Col sm="12">
          <ProductDetailsEdit />
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <MoreInfo />
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
