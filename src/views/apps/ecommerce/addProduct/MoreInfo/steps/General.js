/* eslint-disable semi */
import { Fragment } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Label, FormGroup, Row, Col, Input, Form, Button } from "reactstrap";

const General = ({ stepper, type }) => {
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">General Details</h5>
      </div>
      <Form onSubmit={e => e.preventDefault()}>
        <Row>
          <FormGroup tag={Col} md="6">
            <Label className="form-label" for={`regular_price-${type}`}>
              Regular Price
            </Label>
            <Input
              type="text"
              name={`regular_price-${type}`}
              id={`regular_price-${type}`}
              placeholder="Amount"
            />
          </FormGroup>
          <FormGroup tag={Col} md="6">
            <Label className="form-label" for={`selling_price-${type}`}>
              Selling Price
            </Label>
            <Input
              type="text"
              name={`selling_price-${type}`}
              id={`selling_price-${type}`}
              placeholder="Amount"
            />
          </FormGroup>
        </Row>
      </Form>
    </Fragment>
  );
};

export default General;
