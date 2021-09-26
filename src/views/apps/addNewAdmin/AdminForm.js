/*eslint-disable*/
import { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Avatar from "@components/avatar";
import Spinner from "@components/spinner/Fallback-spinner"; // Uncomment if your require content fallback

import {
  Alert,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Input,
  Form,
  Button,
  CustomInput,
  Label,
} from "reactstrap";
import { toast, Slide } from "react-toastify";
import { Check } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import classnames from "classnames";
import axiosInstance from "../../../configs/axiosInstance";
import { urls } from "@urls";
import adminServices from "@services/adminServices";
const SuccessToast = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        <h6 className="text-success ml-50 mb-0">Success!</h6>
      </div>
      <small className="text-muted"> 1 Min Ago</small>
    </div>
    <div className="toastify-body">
      <span>New Admin Created.</span>
    </div>
  </Fragment>
);
const HorizontalForm = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState("Admin");
  const [password, setPassword] = useState(null);
  const [retypePassword, setRetypePassword] = useState(null);
  const { register, errors, handleSubmit } = useForm();
  const [passError, setPassError] = useState();
  const [resError, setResError] = useState(null);
  const notifySticky = () =>
    toast.success(<SuccessToast />, {
      autoClose: false,
      hideProgressBar: true,
    });

  const onSubmit = async () => {
    if (password === retypePassword) {
      try {
        setLoading(true);
        const adminData = JSON.parse(localStorage.getItem("userData"));
        const adminEmail = adminData.email;
        const adminRole = adminData.role;
        const resData = await adminServices.createAdmin({
          adminRole: adminRole,
          adminEmail: adminEmail,
          newStaffUsername: username,
          newStaffEmail: email,
          newStaffPassword: password,
          newStaffRole: role,
        });
        history.push("/add-new-admin");
        setLoading(false);
        notifySticky();
      } catch (err) {
        setResError(err.data.error.message);
        setLoading(false);
      }
    } else {
      setPassError("Passsword and Retype password need to be same");
    }
  };
  return (
    <Fragment>
      {loading ? (
        <div className="m-auto">
          <Spinner />
        </div>
      ) : (
        <Card className="w-100">
          <CardHeader>
            <CardTitle tag="h4">Add New Admin</CardTitle>
          </CardHeader>

          <CardBody>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label for="select-basic">Select Role</Label>
                <Input
                  type="select"
                  name="role"
                  id="select-basic"
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                  {/* <option>Other</option> */}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  autoFocus
                  type="email"
                  value={email}
                  id="login-email"
                  name="email"
                  placeholder="john@example.com"
                  onChange={e => {
                    setEmail(e.target.value);
                    setResError(null);
                  }}
                  className={classnames({
                    "is-invalid": errors["login-email"],
                  })}
                  innerRef={register({
                    required: true,
                    validate: value => value !== "",
                  })}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="username">
                  Username
                </Label>
                <Input
                  autoFocus
                  type="text"
                  value={username}
                  id="username"
                  name="username"
                  placeholder="Admin19"
                  onChange={e => {
                    setUserName(e.target.value);
                    setResError(null);
                  }}
                  className={classnames({
                    "is-invalid": errors["username"],
                  })}
                  innerRef={register({
                    required: true,
                    validate: value => value !== "",
                  })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <InputPasswordToggle
                  value={password}
                  id="password"
                  name="password"
                  className="input-group-merge"
                  onChange={e => {
                    setPassword(e.target.value);
                    setPassError(null);
                  }}
                  className={classnames({
                    "is-invalid": errors["password"],
                  })}
                  innerRef={register({
                    required: true,
                    validate: value => value !== "",
                  })}
                />
              </FormGroup>
              <FormGroup>
                <Label>Retype Password:</Label>
                <InputPasswordToggle
                  value={retypePassword}
                  id="login-password"
                  name="login-password"
                  className="input-group-merge"
                  onChange={e => {
                    setRetypePassword(e.target.value);
                    setPassError(null);
                  }}
                  className={classnames({
                    "is-invalid": errors["login-password"],
                  })}
                  innerRef={register({
                    required: true,
                    validate: value => value !== "",
                  })}
                />
              </FormGroup>
              {passError ? (
                <Alert color="primary">
                  <div className="alert-body font-small-2">
                    <p>
                      <strong>{passError} </strong>{" "}
                    </p>
                  </div>
                </Alert>
              ) : null}
              {resError ? (
                <Alert color="primary">
                  <div className="alert-body font-small-2">
                    <p>
                      {" "}
                      <strong>{resError} </strong>
                    </p>
                  </div>
                </Alert>
              ) : null}

              <Button.Ripple type="submit" color="primary" block>
                Sign in
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      )}
    </Fragment>
  );
};
export default HorizontalForm;
