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

const CustomOptions = ({ row, orderList, setOrderList }) => {
  const onDelete = async () => {
    try {
      await axiosInstance().delete(urls.REMOVE_INVOICE_BY_ID + row.invoice_id);
      // const updatedList = orderList
      // updatedList.splice(row.invoice_id,1)
      // setOrderList([...updatedList])

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
export const columns = (orderList, setOrderList) => {
  return [
    {
      name: "#",
      minWidth: "107px",
      selector: "id",
      cell: row => (
        <Link
          to={`/apps/ecommerce/orders/preview/${row.id}`}
          target="_blank"
        >{`#${row.id}`}</Link>
      ),
    },

    {
      name: "User Info",
      minWidth: "250px",
      sortable: true,
      cell: row => {
        const name = `${row.user_fullname || ""}`,
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
      name: "Status",
      selector: "order_status",
      sortable: true,
      minWidth: "164px",
      cell: row => {
        console.log(orderStatusObj[row.order_status]);
        return (
          <Badge color={orderStatusObj[row.order_status].color} pill>
            {row.order_status}
          </Badge>
        );
      },
    },
    {
      name: "Total",
      selector: "total_price",
      sortable: true,
      minWidth: "150px",
      cell: row => <span>{row.total_price || 0} BDT</span>,
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
      selector: "pay_phoneNumber",
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
      name: "Transaction Id",
      selector: "transactionId",
      sortable: true,
      minWidth: "164px",
      cell: row => {
        return (
          <Badge color="light-warning" pill>
            {row.transactionId}
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
        />
      ),
    },
  ];
};
