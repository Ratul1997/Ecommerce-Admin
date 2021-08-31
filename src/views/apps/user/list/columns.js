/* eslint-disable */
// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { getUser, deleteUser } from "../store/action";
import { store } from "@store/storeConfig/store";

// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";
import { roleObj } from "../userConstants";

// ** Renders Client Columns
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
      color={color || "primary"}
      className="mr-1"
      content={`${row.first_name} ${row.last_name || ""}`}
      initials
    />
  );
};

// ** Renders Role Columns
const renderRole = row => {
  const Icon = roleObj[row.user_role] ? roleObj[row.user_role].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${
          roleObj[row.user_role] ? roleObj[row.user_role].class : ""
        } mr-50`}
      />
      {row.user_role}
    </span>
  );
};

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

export const columns = [
  {
    name: "User",
    minWidth: "297px",
    selector: "fullName",
    sortable: true,
    cell: row => {
      
      return (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={`/apps/user/view/${row.id}`}
              className="user-name text-truncate mb-0"
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="font-weight-bold">
                {row.first_name} {row.last_name || ""}
              </span>
            </Link>
            <small >{row.email}</small>
          </div>
        </div>
      );
    },
  },
  {
    name: "Contact Number",
    minWidth: "320px",
    selector: "phone_number",
    sortable: true,
    cell: row => row.phone_number,
  },
  {
    name: "Role",
    minWidth: "172px",
    selector: "role",
    sortable: true,
    cell: row => renderRole(row),
  },
  // {
  //   name: "Plan",
  //   minWidth: "138px",
  //   selector: "currentPlan",
  //   sortable: true,
  //   cell: row => <span className="text-capitalize">{row.currentPlan}</span>,
  // },
  // {
  //   name: "Status",
  //   minWidth: "138px",
  //   selector: "status",
  //   sortable: true,
  //   cell: row => (
  //     <Badge className="text-capitalize" color={statusObj[row.status]} pill>
  //       {row.status}
  //     </Badge>
  //   ),
  // },
  {
    name: "Actions",
    minWidth: "100px",
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/apps/user/view/${row.id}`}
            className="w-100"
            // onClick={() => store.dispatch(getUser(row.id))}
          >
            <FileText size={14} className="mr-50" />
            <span className="align-middle">Details</span>
          </DropdownItem>
          {/* <DropdownItem
            tag={Link}
            to={`/apps/user/edit/${row.id}`}
            className="w-100"
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <Archive size={14} className="mr-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem> */}
          {/* <DropdownItem
            className="w-100"
            onClick={() => store.dispatch(deleteUser(row.id))}
          >
            <Trash2 size={14} className="mr-50" />
            <span className="align-middle">Delete</span>
          </DropdownItem> */}
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
];
