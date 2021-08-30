/*eslint-disable*/
import { Fragment, useState, useEffect } from "react";
import Tabs from "./Tabs";
import axios from "axios";
import InfoTabContent from "./InfoTabContent";
import Breadcrumbs from "@components/breadcrumbs";
import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap";

import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";
import PaymentContent from "./PaymentContent";

import { urls } from "@urls";
import { findValueInArray } from "@utils";
import axiosInstance from "@configs/axiosInstance.js";
import SpinnerComponent from "../../../@core/components/spinner/Fallback-spinner";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("1"),
    [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const toggleTab = tab => {
    setActiveTab(tab);
  };

  useEffect(() => {
    loadInformation();
  }, []);

  const onChangeInfo = e => {
    const { name, value } = e.target;
    setData({
      ...data,
      info: {
        ...data.info,
        [name]: value,
      },
    });
  };
  const loadInformation = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_ADMIN_INFO);
      setData(res.data.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onCancel = () => {
    window.location.reload();
  };

  const changeStatus = id => () => {
    const paymentInfo = data.paymentDetails;
    const index = findValueInArray(paymentInfo, id, "payment_id");
    console.log(index);
    if (index > -1) {
      paymentInfo[index] = {
        ...paymentInfo[index],
        status: paymentInfo[index].status === 0 ? 1 : 0,
      };
    }
    console.log(paymentInfo[index]);
    setData({
      ...data,
      paymentDetails: [...paymentInfo],
    });
  };

  const onChangePaymentInfo = id => e => {
    const { name, value } = e.target;
    const paymentInfo = data.paymentDetails;
    const index = findValueInArray(paymentInfo, id, "payment_id");
    console.log(index);
    if (index > -1) {
      paymentInfo[index] = {
        ...paymentInfo[index],
        [name]: value,
      };
    }
    setData({
      ...data,
      paymentDetails: [...paymentInfo],
    });
  };

  if (isLoading) return <SpinnerComponent />;
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Account Settings"
        breadCrumbActive="Account Settings"
      />
      {data !== null ? (
        <Row>
          <Col className="mb-2 mb-md-0" md="3">
            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
          </Col>
          <Col md="9">
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <InfoTabContent
                      data={data.info}
                      onChange={onChangeInfo}
                      onCancel={onCancel}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <PaymentContent
                      data={data.paymentDetails}
                      onChange={onChangePaymentInfo}
                      onCancel={onCancel}
                      changeStatus={changeStatus}
                    />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  );
};

export default AccountSettings;
