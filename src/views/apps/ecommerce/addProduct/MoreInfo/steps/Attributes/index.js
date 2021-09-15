/* eslint-disable */
import { Fragment, React, useEffect, useState, useContext } from "react";
import Attribute from "./Attributes";
import axios from "axios";
import { urls } from "@urls";
import { Button, Label, FormGroup, Col } from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { findItemInArray } from "@utils";
import { ProductDataContext } from "../../..";
import axiosInstance from "../../../../../../../configs/axiosInstance";
import consoleLog from "@console";
export default function Attributes({ stepper }) {
  const { productData, setProductData, isEditable, id, attributeListForData } =
    useContext(ProductDataContext);

  const [attributesList, setAttributesList] = useState([]);
  const [selectedAttributeOptions, setSelectedAttributeOptions] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState([]);
  const [productAttributeOptions, setProductAttributeOptions] = useState([]);

  const getOptions = () => {
    return attributesList.map(item => {
      return { value: item.attribute_id, label: item.attribute_name };
    });
  };
  useEffect(() => {
    loadAttributes();
  }, []);

  const loadProductAttributes = async (id, attribute) => {
    try {
      const res = await axiosInstance().get(
        urls.GET_PRODUCT_ATTRIBUTES_BY_ID + id
      );
      setProductAttributeOptions(res.data.results);
      setSelectedAttributeOptions(res.data.results.attributes);
      res.data.results.attributes &&
        onGetAttributeOptions(res.data.results, attribute);
    } catch (error) {}
  };
  const loadAttributes = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_ATTRIBUTES);
      setAttributesList(res.data.results);
      if (id) {
        loadProductAttributes(id, res.data.results);
      }
    } catch (error) {
      consoleLog(error);
    }
  };
  const onSave = () => {
    setProductData({ ...productData, attributesList: [...selectedAttribute] });
    stepper.next();
  };

  const onChange = data => {
    setSelectedAttributeOptions(data);
    onGetAttributeOptions(data);
  };
  const onGetAttributeOptions = (selectedAttributesData, attribute = null) => {
    const data = attribute
      ? selectedAttributesData.attributes
      : selectedAttributesData;
    const temp_attributeList = attribute || attributesList;

    const attributes = data.map(item => {
      const attribute = temp_attributeList.filter(attribute_item => {
        return attribute_item.attribute_id === item.value;
      });
      let selectOptions = [];
      if (attribute && selectedAttributesData.options) {
        attribute[0].options.filter(option_item => {
          selectedAttributesData.options.filter(selected_option_item => {
            if (selected_option_item.value === option_item.option_id) {
              selectOptions.push(selected_option_item);
            }
          });
        });
      }
      return { ...attribute[0], selectedOptions: selectOptions };
    });
    attribute &&
      setProductData({
        ...productData,
        attributesList: [...attributes],
      });
    // setProductData({ ...productData, attributesList: [...attributes] });
    setSelectedAttribute(attributes || []);
  };
  const onGo = e => {
    onGetAttributeOptions(selectedAttributeOptions);
  };

  const onUpdate = () => {
    consoleLog(selectedAttribute);
    consoleLog("asd");
    consoleLog(productAttributeOptions);
  };

  return (
    <>
      <FormGroup row>
        <Label sm="3" for="attribute_options">
          Attribute
        </Label>
        <Col sm="7">
          <Select
            theme={selectThemeColors}
            isMulti
            name="colors"
            options={getOptions()}
            className="react-select"
            value={selectedAttributeOptions}
            isMulti
            classNamePrefix="select"
            onChange={onChange}
            isDisabled={isEditable}
          />
        </Col>
        {/* <Col sm="2">
          {!isEditable && (
            <Button color="primary" onClick={onGo}>
              Go
            </Button>
          )}
        </Col> */}
      </FormGroup>
      {selectedAttribute.length > 0 && (
        <>
          <Attribute
            attributesList={selectedAttribute}
            setAttributesList={setSelectedAttribute}
          />
          {!isEditable ? (
            <Button.Ripple color="primary" className="ml-3" onClick={onSave}>
              Save
            </Button.Ripple>
          ) : (
            <Button.Ripple color="primary" className="ml-3" onClick={onUpdate}>
              Update
            </Button.Ripple>
          )}
        </>
      )}
    </>
  );
}
