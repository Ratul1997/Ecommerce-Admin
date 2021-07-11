/* eslint-disable  */
import React, { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import FMediaView from "../FMediaView";

import "react-contexify/dist/ReactContexify.min.css";
import "@styles/react/libs/context-menu/context-menu.scss";
export default function Videos() {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Videos"
        breadCrumbParent="Media"
        breadCrumbActive="Videos"
      />
      <FMediaView titles="Video" fileType= "video/*" />
    </Fragment>
  );
}
