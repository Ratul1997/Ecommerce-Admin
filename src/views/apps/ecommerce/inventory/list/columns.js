/* eslint-disable*/
// ** React Imports
import { Fragment } from "react";

import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
// ** Third Party Components
import { Badge } from "reactstrap";
import { Eye, MoreVertical, Star, Trash } from "react-feather";
import { generateId } from "@utils";
import { onErrorToast, onSuccessToast } from "@src/views/common/Toaster";
import { convertTimeStampToString } from "@src/views/apps/media/files/utils/utils";

// ** Third Party Components
import classnames from "classnames";

// ** Table columns
export const columns = (
  inventoryList,
  setInventoryList,
  updateInventoryList
) => {
  return [
    {
      name: "Name",
      selector: "time",
      sortable: true,
      minWidth: "100px",
      cell: row => {
        return (
          <div className="text-truncate">
            <span className="d-block  text-truncate">{row.product_name}</span>
          </div>
        );
      },
    },
    {
      name: "Quantity",
      selector: "quantity",
      sortable: true,
      minWidth: "107px",
    },

    {
      name: "Allow Back Orders?",
      minWidth: "107px",
      selector: "allowBackOrders",
    },
    {
      name: "Status",
      minWidth: "100px",
      cell: row => {
        const onUpdate = async () => {
          try {
            await axiosInstance().patch(
              urls.GET_REVIEWS_BY_ID + row.product_review_id,
              {
                params: row.isApproved === 1 ? false : true,
              }
            );
            // updatePopular(row.product_id, "Featured");
            updateInventoryList(row.product_review_id);
            onSuccessToast("Updated");
          } catch (error) {
            onErrorToast(error.data.massage);
          }
        };
        return (
          <div className="text-truncate d-inline">
            <Badge
              color={
                row.inventory_status === "In Stock"
                  ? "light-success"
                  : "light-danger"
              }
              pill
              // onClick={onUpdate}
            >
              {row.inventory_status}
            </Badge>
          </div>
        );
      },
    },
  ];
};
