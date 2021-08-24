/* eslint-disable  */
import React from "react";

import { Card, CardBody, CardText, Row, Col, Table } from "reactstrap";
import logo from '@src/assets/images/logo/logos.png'
export default function Companyformation() {
  return (
    <div>
      <div className="logo-wrapper">
      <img src={logo} style={{height:40,width:40}}/>
        <h3 className="text-primary invoice-logo">Bay of Style</h3>
      </div>
      <CardText className="mb-25">
        Office 149, 450 South Brand Brooklyn
      </CardText>
      <CardText className="mb-25">San Diego County, CA 91905, USA</CardText>
      <CardText className="mb-0">
        +1 (123) 456 7891, +44 (876) 543 2198
      </CardText>
    </div>
  );
}
