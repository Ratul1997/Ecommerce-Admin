/* eslint-disable */
import {
  Fragment,
  React,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  Form,
  FormGroup,
  Label,
  Col,
  CustomInput,
  Button,
  Spinner,
} from "reactstrap";
import { ProductDataContext } from "../..";
import { useSelector } from "react-redux";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import consoleLog from "@console";
import axiosInstance from "../../../../../../configs/axiosInstance";
import { urls } from "../../../../../../utility/Urls";
import { onErrorToast, onSuccessToast } from "../../../../../common/Toaster";
import productServices from "../../../../../../services/productServices";
export default function Shipping() {
  const { productData, setProductData, isEditable, id } =
    useContext(ProductDataContext);
  const shipping = useSelector(store => store.shippingReducer.shipping);
  const [shippingClasses, setShippingClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newShippingStatus, setNewShippingStatus] = useState(false);
  useEffect(() => {
    if (isEditable) {
      setShippingClasses(
        productData.shipping_cost.map(shipping => ({
          value: shipping.shipping_class_id,
          label: shipping.shipping_class_name,
        }))
      );
      setNewShippingStatus(productData.hasFreeShipping);
    }
  }, [isEditable, productData.shipping_cost]);
  const shippingOptions = useMemo(() => {
    return shipping.map(item => {
      return { value: item.shipping_class_id, label: item.shipping_class_name };
    });
  }, [shipping]);

  const onUpdate = () => {
    let newShippingClass = shippingClasses.map(item => item.value);
    let oldShippingClass = productData.shipping_cost.map(
      item => item.shipping_class_id
    );
    let newLyData = oldShippingClass
      .filter(x => !newShippingClass.includes(x))
      .concat(newShippingClass.filter(x => !oldShippingClass.includes(x)));

    const deletedId = productData.shipping_cost
      .filter(
        item => newLyData.findIndex(x => x === item.shipping_class_id) > -1
      )
      .map(item => item.shipping_class_id);

    const insertedId = newLyData.filter(
      x =>
        productData.shipping_cost.findIndex(
          item => item.shipping_class_id === x
        ) === -1
    );

    updateShipping(deletedId, insertedId);
  };

  const updateShipping = async (deletedId, insertedId) => {
    setIsLoading(true);
    try {
      const res = await productServices.updateProductShippingById(id, {
        deletedProductShipping: deletedId,
        insertedProductShipping: insertedId,
        newHasFreeShipping: newShippingStatus,
        previousHasFreeShipping: productData.hasFreeShipping,
      });
      onSuccessToast("Updated!");
      setIsLoading(false);
      if (newShippingStatus === true && productData.hasFreeShipping === false) {
        setProductData({
          ...productData,
          shipping_cost: [],
          hasFreeShipping: true,
        });
      } else {
        setProductData({
          ...productData,
          shipping_cost: res.data.results,
          hasFreeShipping: false,
        });
      }
    } catch (error) {
      onErrorToast(error.data.massage);
      setIsLoading(false);
      consoleLog(error.data.massage);
    }
  };
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
              checked={
                isEditable ? newShippingStatus : productData.hasFreeShipping
              }
              onChange={e => {
                isEditable
                  ? setNewShippingStatus(e.target.checked)
                  : setProductData({
                      ...productData,
                      hasFreeShipping: e.target.checked,
                    });
              }}
              label="Enable Product Free Shipping"
            />
          </Col>
        </FormGroup>
        {((!productData.hasFreeShipping && !isEditable) ||
          (!newShippingStatus && isEditable)) && (
          <FormGroup row>
            <Label sm="3" for="shipping_cost">
              Shipping Class
            </Label>
            <Col sm="9">
              <Select
                options={shippingOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                isMulti
                value={isEditable ? shippingClasses : productData.shipping_cost}
                onChange={data =>
                  isEditable
                    ? setShippingClasses(data)
                    : setProductData({ ...productData, shipping_cost: data })
                }
              />
            </Col>
          </FormGroup>
        )}
        {isEditable && (
          <Button.Ripple color="primary" className="mt-1" onClick={onUpdate}>
            {isLoading && <Spinner color="white" size="sm" />} Update
          </Button.Ripple>
        )}
      </Form>
    </Fragment>
  );
}
