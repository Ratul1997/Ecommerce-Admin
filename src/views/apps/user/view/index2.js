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
import UserTimeline from "./UserTimeline";
import InvoiceList from "../../invoice/list";
import PermissionsTable from "./PermissionsTable";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";

// ** Styles
import "@styles/react/apps/app-users.scss";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";

const UserView = props => {
  // ** Vars
  const { id } = useParams();
  const [user, setUser] = useState([]);
  // ** Get suer on mount
  // useEffect(() => {
  //   dispatch(getUser(parseInt(id)));
  // }, [dispatch]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_USERS_BY_ID + id);
      // setUserInfo(res.data.results);
      setUser(res.data.results);
      console.log(res.data.results);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };
  return user.length > 0 ? (
    <div className="app-user-view">
      <Row>
        <Col xl="12" lg="12" md="12">
          <UserInfoCard selectedUser={user[0]} />
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
};
export default UserView;
