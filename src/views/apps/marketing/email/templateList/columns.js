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
import {
  Eye,
  TrendingUp,
  Send,
  MoreVertical,
  Download,
  Edit,
  Trash,
  Copy,
  CheckCircle,
  Save,
  ArrowDownCircle,
  Info,
  PieChart,
} from "react-feather";
import { generateId } from "@utils";
import { onErrorToast, onSuccessToast } from "../../../../common/Toaster";
import { convertTimeStampToString } from "../../../media/files/utils/utils";

const START_INDEX_OF_INVOICE = "5";
// ** Vars
const orderStatusObj = {
  "On hold": { color: "light-secondary" },
  Completed: { color: "light-success" },
  Processing: { color: "light-primary" },
  Downloaded: { color: "light-info" },
  Cancelled: { color: "light-danger" },
  Refunded: { color: "light-warning" },
  Failed: { color: "light-warning" },
  "Pending Payment": { color: "light-warning" },
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
      content={row.user_fullname ? row.user_fullname : "John Doe"}
      initials
    />
  );
};

const CustomOptions = ({ row, templateList, setTemplateList }) => {
  const onDelete = async () => {
    try {
      await axiosInstance().delete(urls.REMOVE_INVOICE_BY_ID + row.invoice_id);
      // const updatedList = templateList
      // updatedList.splice(row.invoice_id,1)
      // setTemplateList([...updatedList])

      onSuccessToast("Successfully Removed!");
      window.location.reload();
    } catch (error) {
      onErrorToast(error.data.massage);
    }
  };
  return (
    <div className="column-action d-flex align-items-center">
      {/* <Send size={17} id={`send-tooltip-${row.invoice_id}`} />
        <UncontrolledTooltip
          placement="top"
          target={`send-tooltip-${row.invoice_id}`}
        >
          Send Mail
        </UncontrolledTooltip> */}
      <Link
        to={`/apps/ecommerce/orders/preview/${row.id}`}
        target="_blank"
        id={`pw-tooltip-${row.id}`}
      >
        <Eye size={17} className="mx-1" />
      </Link>
      <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
        Preview Order
      </UncontrolledTooltip>
      {/* <UncontrolledDropdown>
        <DropdownToggle tag="span">
          <MoreVertical size={17} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/apps/invoice/edit/${row.invoice_id}`}
            className="w-100"
          >
            <Edit size={14} className="mr-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem>
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
      </UncontrolledDropdown> */}
    </div>
  );
};
// ** Table columns
export const columns = (templateList, setTemplateList) => {
  return [
    {
      name: "Template Name",
      selector: "template_name",
      minWidth: "250px",
      sortable: true,
    },
    {
      name: "Action",
      minWidth: "110px",
      selector: "",
      sortable: true,
      cell: row => (
        <CustomOptions
          row={row}
          templateList={templateList}
          setTemplateList={setTemplateList}
        />
      ),
    },
  ];
};
