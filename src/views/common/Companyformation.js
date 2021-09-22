/* eslint-disable  */
import React, { useEffect, useState } from "react";

import { Card, CardBody, CardText, Row, Col, Table } from "reactstrap";
import logo from "@src/assets/images/logo/logos.png";
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
export default function Companyformation() {
  const [companyInfo, setCompanyInfo] = useState(null);
  useEffect(() => {
    loadCompanyInfo();
  }, []);

  const loadCompanyInfo = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_ADMIN_INFO);
      setCompanyInfo(res.data.results);
    } catch (error) {}
  };

  return (
    companyInfo && (
      <div>
        <div className="logo-wrapper">
          <img src={logo} style={{ height: 40, width: 40 }} />
          <h3 className="text-primary invoice-logo">Notlens</h3>
        </div>
        <CardText className="mb-25">{companyInfo.info.address}</CardText>
        <CardText className="mb-25">{companyInfo.info.email}</CardText>
        <CardText className="mb-0">{companyInfo.info.contact_no}</CardText>
      </div>
    )
  );
}
