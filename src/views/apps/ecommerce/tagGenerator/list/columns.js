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
import priceTagServices from "../../../../../services/priceTagServices";

const CustomOptions = ({ row, tagsList, setTagsList }) => {
  const onDelete = async () => {
    try {
      await priceTagServices.deletePriceTagById(row.prduct_info_price_tag_id);
      onSuccessToast("Successfully Removed!");
      window.location.reload();
    } catch (error) {
      onErrorToast(error.data.massage);
    }
  };
  return (
    <div className="column-action d-flex align-items-center">
      {/* <Send size={17} id={`send-tooltip-${row.prduct_info_price_tag_id}`} />
        <UncontrolledTooltip
          placement="top"
          target={`send-tooltip-${row.prduct_info_price_tag_id}`}
        >
          Send Mail
        </UncontrolledTooltip> */}
      <Link
        to={`/apps/ecommerce/tag-generator/preview/${row.prduct_info_price_tag_id}`}
        id={`pw-tooltip-${row.prduct_info_price_tag_id}`}
      >
        <Eye size={17} className="mx-1" />
      </Link>
      <UncontrolledTooltip
        placement="top"
        target={`pw-tooltip-${row.prduct_info_price_tag_id}`}
      >
        Preview Tags
      </UncontrolledTooltip>
      <UncontrolledDropdown>
        <DropdownToggle tag="span">
          <MoreVertical size={17} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          {/* <DropdownItem
            tag={Link}
            to={`/apps/invoice/edit/${row.prduct_info_price_tag_id}`}
            className="w-100"
          >
            <Edit size={14} className="mr-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem> */}
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
export const columns = (tagsList, setTagsList) => {
  return [
    {
      name: "#",
      minWidth: "107px",
      selector: "prduct_info_price_tag_id",
      cell: row => (
        <Link
          to={`/apps/ecommerce/tag-generator/preview/${row.prduct_info_price_tag_id}`}
        >{`#${row.prduct_info_price_tag_id}`}</Link>
      ),
    },

    {
      name: "Tag Name",
      selector: "tag_name",
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
          tagsList={tagsList}
          setTagsList={setTagsList}
        />
      ),
    },
  ];
};
