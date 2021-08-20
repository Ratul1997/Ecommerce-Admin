/* eslint-disable*/
// ** React Imports
import { Fragment } from "react";

import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { deleteInvoice } from "../store/actions";
import { store } from "@store/storeConfig/store";

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
import { convertTimeStampToString } from "../../media/files/utils/utils";
import { generateId } from "@utils";
import { onErrorToast, onSuccessToast } from "../../../common/Toaster";
const START_INDEX_OF_INVOICE = "5";
// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
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
      content={row.customer_name ? row.customer_name : "John Doe"}
      initials
    />
  );
};

const CustomOptions = ({row,invoiceList,setInvoiceList}) =>{
  const onDelete = async() =>{
    try{
      await axiosInstance().delete(urls.REMOVE_INVOICE_BY_ID+row.invoice_id)
      // const updatedList = invoiceList
      // updatedList.splice(row.invoice_id,1)
      // setInvoiceList([...updatedList])

      onSuccessToast("Successfully Removed!")
      window.location.reload();
    }catch(error){
      onErrorToast(error.data.massage)
    }
  }
  return(
    <div className="column-action d-flex align-items-center">
        {/* <Send size={17} id={`send-tooltip-${row.invoice_id}`} />
        <UncontrolledTooltip
          placement="top"
          target={`send-tooltip-${row.invoice_id}`}
        >
          Send Mail
        </UncontrolledTooltip> */}
        <Link
          to={`/apps/invoice/preview/${row.invoice_id}`}
          id={`pw-tooltip-${row.invoice_id}`}
        >
          <Eye size={17} className="mx-1" />
        </Link>
        <UncontrolledTooltip
          placement="top"
          target={`pw-tooltip-${row.invoice_id}`}
        >
          Preview Invoice
        </UncontrolledTooltip>
        <UncontrolledDropdown>
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
        </UncontrolledDropdown>
      </div>
  )
}
// ** Table columns
export const columns =(invoiceList,setInvoiceList) => {
  return [
    {
      name: "#",
      minWidth: "107px",
      selector: "invoice_id",
      cell: row => (
        <Link
          to={`/apps/invoice/preview/${row.invoice_id}`}
        >{`#${generateId(START_INDEX_OF_INVOICE, row.invoice_id)}`}</Link>
      ),
    },
  
    {
      name: "Client",
      minWidth: "250px",
      selector: "client",
      sortable: true,
      cell: row => {
        const name = row.customer_name ? row.customer_name : "John Doe",
          email = row.customer_name ? row.customer_email : "johnDoe@email.com";
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
      name: "Total",
      selector: "total",
      sortable: true,
      minWidth: "150px",
      cell: row => <span>{row.total || 0} BDT</span>,
    },
    {
      name: "Invoice Date",
      selector: "invoice_date",
      sortable: true,
      minWidth: "200px",
      cell: row => {
        const dates = convertTimeStampToString(row.invoice_date);
  
        return (
          <div className="text-truncate">
            <span className="d-block  text-truncate">{dates.stringDate}</span>
          </div>
        );
      },
    },
    {
      name: "Reference",
      selector: "reference",
      sortable: true,
      minWidth: "164px",
      cell: row => {
        return (
          <Badge color="light-success" pill>
            {row.reference}
          </Badge>
        );
      },
    },
    {
      name: "Action",
      minWidth: "110px",
      selector: "",
      sortable: true,
      cell: row => <CustomOptions row={row} invoiceList={invoiceList} setInvoiceList ={setInvoiceList}/>
    },
  ];
}
