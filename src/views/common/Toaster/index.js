/*eslint-disable*/
import { Fragment } from "react";
import { toast } from "react-toastify";
import Avatar from "@components/avatar";
import { Bell, Check, X, AlertTriangle, Info } from "react-feather";
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";

export const SuccessToast = ({ toastText, toastTime }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        <h6 className="toast-title">Success!</h6>
      </div>
      {toastTime && <small className="text-muted">{toastTime}</small>}
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {toastText}
      </span>
    </div>
  </Fragment>
);

export const ErrorToast = ({ toastText, toastTime }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<X size={12} />} />
        <h6 className="toast-title">Error!</h6>
      </div>
      {toastTime && <small className="text-muted">{toastTime}</small>}
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {toastText}
      </span>
    </div>
  </Fragment>
);

export const WarningToast = ({ toastText, toastTime }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="warning" icon={<AlertTriangle size={12} />} />
        <h6 className="toast-title">Warning!</h6>
      </div>
      {toastTime && <small className="text-muted">{toastTime}</small>}
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {toastText}
      </span>
    </div>
  </Fragment>
);
export default function Toaster({}) {
  const notifySuccess = () =>
    toast.success(<SuccessToast />, { hideProgressBar: true });
  const notifyError = () =>
    toast.error(<ErrorToast />, { hideProgressBar: true });
  const notifyWarning = () =>
    toast.warning(<WarningToast />, { hideProgressBar: true });
  const notifyInfo = () => toast.info(<InfoToast />, { hideProgressBar: true });
  const notifySuccessProgress = () => toast.success(<SuccessProgressToast />);
  return (
    <>
      <SuccessToast />
    </>
  );
}
