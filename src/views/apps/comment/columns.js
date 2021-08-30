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
import { Eye, MoreVertical, Star, Trash } from "react-feather";
import { generateId } from "@utils";
import { onErrorToast, onSuccessToast } from "../../common/Toaster";
import { convertTimeStampToString } from "../media/files/utils/utils";

// ** Third Party Components
import classnames from "classnames";
const ExpandableTable = ({ data }) => {
  console.log("sd", data);
  return (
    <div className="expandable-content p-2">
      <p>
        <span className="font-weight-bold">Comment:</span> {data.comment}
      </p>
    </div>
  );
};
// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
      "light-primary",
      "light-secondary",
    ],
    color = states[stateNum];

  return (
    <Avatar
      color={color}
      className="mr-50"
      content={`${row.first_name} ${row.last_name || ""}`}
      initials
    />
  );
};
const CustomOptions = ({ row, reviewList, setReviewsList }) => {
  const onDelete = async () => {
    try {
      await axiosInstance().delete(
        urls.REMOVE_REVIEWS_BY_ID + row.product_review_id
      );
      onSuccessToast("Successfully Removed!");
      window.location.reload();
    } catch (error) {
      onErrorToast(error.data.massage);
    }
  };
  return (
    <div className="column-action d-flex align-items-center">
      <UncontrolledDropdown>
        <DropdownToggle tag="span">
          <MoreVertical size={17} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag="a"
            href="/"
            className="w-100"
            onClick={e => {
              e.preventDefault();
              onDelete();
            }}
          >
            <Trash size={14} className="mr-50" />
            <span className="align-middle">Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};
// ** Table columns
export const columns = (reviewList, setReviewsList, updateCommentList) => {
  return [
    {
      name: "Date",
      selector: "time",
      sortable: true,
      minWidth: "150px",
      cell: row => {
        const dates = convertTimeStampToString(row.time);

        return (
          <div className="text-truncate">
            <span className="d-block  text-truncate">{dates.stringDate}</span>
          </div>
        );
      },
    },
    {
      name: "User Info",
      minWidth: "250px",
      sortable: true,
      cell: row => {
        const name = `${row.first_name} ${row.last_name || ""}`,
          email = row.user_email ? row.user_email : "johnDoe@email.com";
        return (
          <div className="d-flex justify-content-left align-items-center">
            {renderClient(row)}
            <div className="d-flex flex-column">
              <h6 className="user-name text-truncate mb-0">{name}</h6>
              <small className="text-truncate text-muted mb-0">{email}</small>
            </div>
          </div>
        );
      },
    },
    {
      name: "Comment",
      selector: "comment",
      sortable: true,
      minWidth: "307px",
      maxWidth: "307px",
    },
    {
      name: "Ratings",
      minWidth: "107px",
      selector: "ratings",
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
            updateCommentList(row.product_review_id);
            onSuccessToast("Updated");
          } catch (error) {
            onErrorToast(error.data.massage);
          }
        };
        return (
          <div className="text-truncate d-inline">
            <Badge
              color={row.isApproved === 1 ? "light-success" : "light-danger"}
              pill
              onClick={onUpdate}
            >
              {row.isApproved === 1 ? "Approved" : "On Hold"}
            </Badge>
          </div>
        );
      },
    },
    {
      name: "Action",
      minWidth: "110px",
      selector: "",
      sortable: true,
      cell: row => (
        <CustomOptions
          row={row}
          reviewList={reviewList}
          setReviewsList={setReviewsList}
        />
      ),
    },
  ];
};
export default ExpandableTable;
