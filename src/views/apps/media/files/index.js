/* eslint-disable  */
import React, { Fragment,useEffect } from "react";
import Breadcrumbs from "@components/breadcrumbs";
import FMediaView from "../FMediaView";

import "react-contexify/dist/ReactContexify.min.css";
import "@styles/react/libs/context-menu/context-menu.scss";

export default function Files() {

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="All Files"
        breadCrumbParent="Media"
        breadCrumbActive="All Files"
      />
      <FMediaView titles="Files" fileType= "application/*,.doc" />
    </Fragment>
  );
}
