/* eslint-disable  */
import React, { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import FMediaView from "../FMediaView";

import "react-contexify/dist/ReactContexify.min.css";
import "@styles/react/libs/context-menu/context-menu.scss";
export default function Images() {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Images"
        breadCrumbParent="Media"
        breadCrumbActive="Images"
      />
      <FMediaView titles="Images" fileType= ".jpg, .png, .gif .jpeg" />
    </Fragment>
  );
}
// ".jpg, .png, .gif .jpeg"