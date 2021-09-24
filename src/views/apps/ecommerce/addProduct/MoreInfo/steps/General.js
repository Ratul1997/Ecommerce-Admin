/* eslint-disable */
import { Fragment, useState, useRef, useContext } from "react";
import { ArrowLeft, ArrowRight, Plus } from "react-feather";
import {
  Label,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Spinner,
} from "reactstrap";
import { ProductDataContext } from "../..";
import axiosInstance from "../../../../../../configs/axiosInstance";
import { urls } from "../../../../../../utility/Urls";
import consoleLog from "@console";
import { onErrorToast, onSuccessToast } from "../../../../../common/Toaster";
import productServices from "../../../../../../services/productServices";
const General = ({ stepper, type }) => {
  const { productData, setProductData, isEditable, id } =
    useContext(ProductDataContext);

  const [isLoading, setIsLoading] = useState(false);
  const onUpdate = async () => {
    setIsLoading(true);
    try {
      await productServices.updateProductPriceById(id, {
        regular_price: productData.regular_price,
        discount_price: productData.discount_price,
      });
      onSuccessToast("Updated!");
      setIsLoading(false);
    } catch (error) {
      consoleLog(error);
      onErrorToast("Internal Server Error");
      setIsLoading(false);
    }
  };
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
              type="number"
              name={`regular_price-${type}`}
              id={`regular_price-${type}`}
              placeholder="Amount"
              onChange={e =>
                setProductData({
                  ...productData,
                  regular_price: parseFloat(e.target.value),
                })
              }
              value={productData.regular_price}
            />
          </FormGroup>
          <FormGroup tag={Col} md="6">
            <Label className="form-label" for={`selling_price-${type}`}>
              Selling Price
            </Label>
            <Input
              type="number"
              name={`selling_price-${type}`}
              id={`selling_price-${type}`}
              placeholder="Amount"
              onChange={e =>
                setProductData({
                  ...productData,
                  discount_price: parseFloat(e.target.value),
                })
              }
              value={productData.discount_price}
            />
          </FormGroup>
        </Row>

        {isEditable && (
          <Button color="primary" onClick={isLoading ? null : onUpdate}>
            {isLoading && <Spinner color="white" size="sm" />}
            Update
          </Button>
        )}
      </Form>
    </Fragment>
  );
};

export default General;
