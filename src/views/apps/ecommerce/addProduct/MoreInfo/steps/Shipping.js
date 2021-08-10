/* eslint-disable */
import { Fragment, React, useContext } from "react";
import { Form, FormGroup, Label, Col, CustomInput, Input } from "reactstrap";
import { ProductDataContext } from "../..";
export default function Shipping() {
  const { productData, setProductData } = useContext(ProductDataContext);
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Shipping Details</h5>
      </div>
      <Form>
        <FormGroup row>
          <Label sm="3" for="manage_stock">
            Shipping Status
          </Label>
          <Col sm="9">
            <CustomInput
              type="checkbox"
              id="shipping-status"
              defaultChecked={true}
              onChange={e =>
                setProductData({
                  ...productData,
                  hasFreeShipping: e.target.checked,
                })
              }
              label="Enable Product Free Shipping"
            />
          </Col>
        </FormGroup>
        {!productData.hasFreeShipping && (
          <FormGroup row>
            <Label sm="3" for="shipping_cost">
              Shipping Cost
            </Label>
            <Col sm="9">
              <Input
                type="number"
                name="shipping_cost"
                id="shipping_cost"
                placeholder="Amount"
                onChange={e => {
                  setProductData({
                    ...productData,
                    shipping_cost: e.target.checked,
                  });
                }}
              />
            </Col>
          </FormGroup>
        )}
      </Form>
    </Fragment>
  );
}
