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
export const onErrorToast = (toastText, toastTime = null) =>
  toast.error(<ErrorToast toastText={toastText} toastTime={toastTime} />, {
    hideProgressBar: true,
  });

export const onSuccessToast = (toastText, toastTime = null) =>
  toast.success(<SuccessToast toastText={toastText} toastTime={toastTime} />, {
    hideProgressBar: true,
  });
