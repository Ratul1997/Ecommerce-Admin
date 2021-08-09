/* eslint-disable */
import React from "react";
import AppCollapse from "@components/app-collapse";
import { Col, Label, Row } from "reactstrap";
import { Button } from "bootstrap";
import { X } from "react-feather";
export default function IndividualVariants({ combinations, getOptions }) {
  console.log(getOptions);

  const getOptionName = () => {
    let combo = "";
    for (let char of combinations) {
      const id = parseInt(char);
      combo =
        combo + " " + getOptions.filter(item => item.value === id)[0].label;
    }
    return combo;
  };
  const renderTitle = () => {
    return (
      <Row>
        <Col>
          <Label>Combinations:</Label>
        </Col>
        <Col>
          <Label>{getOptionName()}</Label>
        </Col>
       
      </Row>
    );
  };
  const data = [
    {
      title: renderTitle(),
      content: <p>sasas</p>,
    },
  ];
  return (
    <>
      <AppCollapse data={data} />
    </>
  );
}
