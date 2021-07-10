/* eslint-disable  */
import React, { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";

export default function Images() {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Images"
        breadCrumbParent="Media"
        breadCrumbActive="Images"
      />
    </Fragment>
  );
}
// ".jpg, .png, .gif .jpeg"