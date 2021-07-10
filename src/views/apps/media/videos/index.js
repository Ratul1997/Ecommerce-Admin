/* eslint-disable  */
import React, { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";

export default function Videos() {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Videos"
        breadCrumbParent="Media"
        breadCrumbActive="Videos"
      />
    </Fragment>
  );
}
