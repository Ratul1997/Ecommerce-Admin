/* eslint-disable*/
// ** React Imports
import { Fragment, useState } from "react";

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
// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import SideBarImage from "./SideBar";

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
      content={row.user_email ? row.user_email: "John Doe"}
      initials
    />
  );
};

const CustomOptions = ({ row, orderList, setOrderList, onPreviewPreOrder }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const onUpdate = status => async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance().patch(
        urls.GET_PRE_ORDERS_BY_ID + row.id,
        { status: status }
      );
      onSuccessToast("Successfully Updated!");
      toggleSidebar();
      window.location.reload();
    } catch (error) {
      onErrorToast(error.data.massage);
    }
    setIsLoading(false);
  };
  const onDelete = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance().delete(
        urls.GET_PRE_ORDERS_BY_ID + row.id,
        { status: status }
      );
      onSuccessToast("Successfully Updated!");
      toggleSidebar();
      window.location.reload();
    } catch (error) {
      onErrorToast(error.data.massage);
    }
    setIsLoading(false);
  };
  return (
    <div className="column-action d-flex align-items-center">
      <div id={`pw-tooltip-${row.id}`}>
        <Eye size={17} className="mx-1" onClick={toggleSidebar} />
      </div>
      <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
        Preview Order
      </UncontrolledTooltip>

      <SideBarImage
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        data={row}
        onUpdate={onUpdate}
        isLoading={isLoading}
        onDelete={onDelete}
      />
    </div>
  );
};
// ** Table columns
export const columns = (orderList, setOrderList, onPreviewPreOrder) => {
  return [
    {
      name: "#",
      minWidth: "107px",
      selector: "id",
      cell: row => (
        <h6>{`#${row.id}`}</h6>
      ),
    },

    {
      name: "User Info",
      minWidth: "250px",
      sortable: true,
      cell: row => {
        const name = `${row.user_fullname} ${row.user_fullname || ""}`,
          email = row.user_email ? row.user_email : "johnDoe@email.com";
        return (
          <div className="d-flex justify-content-left align-items-center">
            {renderClient(row)}
            <div className="d-flex flex-column">
              {/* <h6 className="user-name text-truncate mb-0">{name}</h6> */}
              <small className="text-truncate">{email}</small>
            </div>
          </div>
        );
      },
    },

    {
      name: "Product Name",
      selector: "product_name",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Date",
      selector: "order_date",
      sortable: true,
      minWidth: "200px",
      cell: row => {
        const dates = convertTimeStampToString(row.order_date);

        return (
          <div className="text-truncate">
            <span className="d-block  text-truncate">{dates.stringDate}</span>
          </div>
        );
      },
    },
    {
      name: "Phone Number",
      selector: "user_phoneNumber",
      sortable: true,
      minWidth: "164px",
      //   cell: row => {
      //     return (
      //       <Badge color="light-success" pill>
      //         {row.pay_phoneNumber}
      //       </Badge>
      //     );
      //   },
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      minWidth: "164px",
      cell: row => {
        
        return (
          <Badge color={orderStatusObj[row.status].color} pill>
            {row.status}
          </Badge>
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
          orderList={orderList}
          setOrderList={setOrderList}
          onPreviewPreOrder={onPreviewPreOrder}
        />
      ),
    },
  ];
};
