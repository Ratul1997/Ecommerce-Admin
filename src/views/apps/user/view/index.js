/*eslint-disable*/
// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
import { getUser } from "../store/action";
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import PlanCard from "./PlanCard";
import UserInfoCard from "./UserInfoCard";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";
export default function UserInfo() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_USERS_BY_ID + id);
      // setUserInfo(res.data.results);
      setUserDetails(res.data.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  if (isLoading) return <SpinnerComponent />;
  return userDetails.length > 0 ? (
    <div className="app-user-view">
      <Row>
        <Col xl="12" lg="12" md="12">
          <UserInfoCard selectedUser={userDetails[0]} />
        </Col>
        {/* <Col xl='3' lg='4' md='5'>
          <PlanCard selectedUser={store.selectedUser} />
        </Col> */}
      </Row>
      {/* <Row>
        <Col md='6'>
          <UserTimeline />
        </Col>
        <Col md='6'>
          <PermissionsTable />
        </Col>
      </Row> */}
      {/* <Row>
        <Col sm='12'>
          <InvoiceList />
        </Col>
      </Row> */}
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User with id: {id} doesn't exist. Check list of all Users:{" "}
        <Link to="/apps/user/list">Users List</Link>
      </div>
    </Alert>
  );
}
