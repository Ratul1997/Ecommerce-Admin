/* eslint-disable  */
// ** React Import
import { useState, useEffect, useMemo } from "react";

import Select, { components } from "react-select";
// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import {
  Button,
  FormGroup,
  Label,
  FormText,
  Form,
  Input,
  Spinner,
} from "reactstrap";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import TextareaCounter from "@src/views/forms/form-elements/textarea/TextareaCounter";
import axios from "axios";
import { urls } from "@urls";

import { toast } from "react-toastify";
import {
  ErrorToast,
  onErrorToast,
  onSuccessToast,
  SuccessToast,
} from "../../../common/Toaster";
import axiosInstance from "../../../../configs/axiosInstance";
import divisionJson from "@src/assets/data/bangladesh_division.json";
import consoleLog from "@console";

import { selectThemeColors } from "@utils";
import { shippingClassOption } from "../../constatant";
import {
  addShippingClass,
  deleteShippingClass,
  updateShippingClass,
} from "./store/action";
import { Trash2 } from "react-feather";

const SidebarShipping = ({
  open,
  toggleSidebar,
  onSelectShipping,
  setOnSelectShipping,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [shipping_type, setShippingType] = useState(shippingClassOption[0]);
  const [shipping_name, setShippingName] = useState("");
  const [shipping_zone, setShippingZone] = useState([]);
  const [shipping_rate, setShippingRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnDeleteLoading, setOnDeleteLoading] = useState(false);
  const dispatch = useDispatch();
  const shipping = useSelector(state => state.shippingReducer.shipping);
  const { register, errors, handleSubmit } = useForm();
  const divisionOption = useMemo(() => {
    return divisionJson.districts.map(item => {
      return { value: item.id, label: item.name };
    });
  }, [divisionJson]);

  useEffect(() => {
    if (onSelectShipping) {
      const shippingData = shipping.filter(
        item => item.shipping_class_id === onSelectShipping
      )[0];
      consoleLog(shippingData);

      setShippingType(
        shippingClassOption.filter(
          item => item.label === shippingData.shipping_type
        )[0]
      );
      setShippingRate(shippingData.shipping_rate);
      setShippingName(shippingData.shipping_class_name);
      let zones = [];
      shippingData.shipping_zone.map(shipping_zone =>
        divisionOption.map(division => {
          if (division.label === shipping_zone) zones.push(division);
        })
      );
      setShippingZone(zones);
      setIsEdit(true);
    }
  }, [onSelectShipping]);
  const onEdit = () => {
    if (shipping_name.trim().length === 0) {
      onErrorToast("Shipping Name Required!");
      return;
    }
    onUpdateShippingClass();
  };
  const onSubmit = () => {
    if (shipping_name.trim().length === 0) {
      onErrorToast("Shipping Name Required!");
      return;
    }
    onAddShippingClass();
  };

  const resetState = () => {
    setShippingName("");
    setShippingRate(0);
    setShippingType(shippingClassOption[0]);
    setShippingZone([]);
    toggleSidebar();
  };

  const onUpdateShippingClass = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance().patch(
        urls.UPDATE_SHIPPING_CLASS + onSelectShipping,
        {
          shipping_name: shipping_name,
          shipping_type: shipping_type.value,
          shipping_zone: shipping_zone.map(item => item.label),
          shipping_rate: shipping_rate,
        }
      );
      consoleLog(response);
      onSuccessToast("Successfully Updated!");
      dispatch(
        updateShippingClass({
          shipping_class_id: onSelectShipping,
          shipping_class_name: shipping_name,
          shipping_type: shipping_type.label,
          shipping_zone: shipping_zone.map(item => item.label),
          shipping_rate: shipping_rate,
        })
      );
      toggleSidebar();
      setIsLoading(false);
    } catch (error) {
      onSuccessToast(error.data.massage);
      consoleLog(error);
      setIsLoading(false);
    }
  };

  const onAddShippingClass = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance().post(urls.POST_SHIPPING_CLASS, {
        shipping_name: shipping_name,
        shipping_type: shipping_type.value,
        shipping_zone: shipping_zone.map(item => item.label),
        shipping_rate: shipping_rate,
      });
      consoleLog(response);
      onSuccessToast("Successfully Inserted!");
      dispatch(
        addShippingClass({
          shipping_class_id: response.data.results.shipping_class_id,
          shipping_class_name: shipping_name,
          shipping_type: shipping_type.label,
          shipping_zone: shipping_zone.map(item => item.label),
          shipping_rate: shipping_rate,
        })
      );
      resetState();
      setIsLoading(false);
    } catch (error) {
      onSuccessToast(error.data.massage);
      consoleLog(error);
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    setOnDeleteLoading(true);
    try {
      const response = await axiosInstance().delete(
        urls.REMOVE_SHIPPING_CLASS + onSelectShipping
      );
      onSuccessToast('Deleted!')
      dispatch(deleteShippingClass(onSelectShipping));
      setOnDeleteLoading(false);
      resetState();
    } catch (error) {
      setOnDeleteLoading(false);
      onErrorToast(error.data.massage);
    }
  };

  const onCloseSideBar = () => {
    resetState();
    toggleSidebar();
    setOnSelectShipping(null);
  };
  return (
    <Sidebar
      size="lg"
      open={open}
      title={isEdit ? "Edit Shipping Class" : "New Shipping Class"}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={onCloseSideBar}
    >
      <Form
        onSubmit={
          isLoading
            ? null
            : isEdit
            ? handleSubmit(onEdit)
            : handleSubmit(onSubmit)
        }
      >
        <FormGroup>
          <Label for="shipping-name">
            Shipping Name <span className="text-danger">*</span>
          </Label>
          <Input
            name="shipping-name"
            id="shipping-name"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["shipping-name"] })}
            value={shipping_name}
            onChange={e => setShippingName(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <Label for="select-parentCategory">Shipping Type</Label>
          <Select
            options={shippingClassOption}
            className="react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
            value={shipping_type}
            onChange={data => {
              setShippingType(data);
              setShippingZone([]);
            }}
          />
        </FormGroup>
        {shipping_type.value === 1 && (
          <FormGroup className="mb-2">
            <Label for="select-parentCategory">Shipping Zone</Label>
            <Select
              options={divisionOption}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              isMulti
              value={shipping_zone}
              onChange={data => setShippingZone(data)}
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label for="shipping-name">Shipping Rate</Label>
          <Input
            type="number"
            placeholder="Amount"
            name="shipping-rate"
            id="shipping-rate"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["shipping-rate"] })}
            value={shipping_rate}
            onChange={e => setShippingRate(e.target.value)}
          />
        </FormGroup>
        {isEdit ? (
          <>
            <Button type="submit" className="mr-1" color="primary">
              {isLoading && <Spinner color="white" size="sm" />}
              Update
            </Button>

            <Button
              type="reset"
              color="primary"
              outline
              onClick={onDelete}
              className="mr-1"
            >
              {isOnDeleteLoading && <Spinner color="red" size="sm" />}
              Delete
            </Button>
            <Button
              type="reset"
              color="secondary"
              outline
              onClick={onCloseSideBar}
              className="mr-1"
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            {" "}
            <Button type="submit" className="mr-1" color="primary">
              {isLoading && <Spinner color="white" size="sm" />}
              Submit
            </Button>
            <Button
              type="reset"
              color="secondary"
              outline
              onClick={onCloseSideBar}
            >
              Cancel
            </Button>
          </>
        )}
      </Form>
    </Sidebar>
  );
};

export default SidebarShipping;
