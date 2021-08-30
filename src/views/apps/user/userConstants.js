/*eslint-disable*/
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
export const roleObj = {
  Customer: {
    class: "text-primary",
    icon: User,
  },
  Staff: {
    class: "text-success",
    icon: Database,
  },
  Admin: {
    class: "text-danger",
    icon: Slack,
  },
};
export const roleOptions = [
  {
    value: 1,
    label: "Customer",
  },
  {
    value: 2,
    label: "Staff",
  },
  {
    value: 3,
    label: "Admin",
  },
];
