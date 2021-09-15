/* eslint-disable*/
// ** React Imports
import { Fragment } from "react";

import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip,
} from "reactstrap";

import { generateId } from "@utils";
import { onErrorToast, onSuccessToast } from "../../../common/Toaster";
import { convertTimeStampToString } from "../../media/files/utils/utils";
import consoleLog from "@console";
// ** Table columns
export const columns = (setOnSelectShipping, toggleSideBar) => {
  return [
    {
      name: "#",
      maxWidth: "107px",
      selector: "id",
      cell: row => (
        <Link
          onClick={() => {
            setOnSelectShipping(row.shipping_class_id);
            toggleSideBar();
          }}
        >{`#${row.shipping_class_id}`}</Link>
      ),
    },

    {
      name: "Name",
      minWidth: "107px",
      selector: "shipping_class_name",
      cell: row => (
        <Link
          onClick={() => {
            setOnSelectShipping(row.shipping_class_id);
            toggleSideBar();
          }}
        >{`${row.shipping_class_name}`}</Link>
      ),
    },
    {
      name: "Shipping Rate",
      minWidth: "107px",
      selector: "shipping_rate",
    },
    {
      name: "Shipping Zone",
      minWidth: "107px",
      selector: "shipping_zone",
    },

    {
      name: "Shipping Type",
      minWidth: "107px",
      selector: "shipping_type",
    },
  ];
};
