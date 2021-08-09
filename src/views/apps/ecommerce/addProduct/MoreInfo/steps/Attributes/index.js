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

export default function Attributes({ stepper }) {
  const { productData, setProductData } = useContext(ProductDataContext);
  const [attributesList, setAttributesList] = useState([]);
  const [selectedAttributeOptions, setSelectedAttributeOptions] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState([]);
  const getOptions = () => {
    return attributesList.map(item => {
      return { value: item.attribute_id, label: item.attribute_name };
    });
  };

  useEffect(() => {
    loadAttributes();
  }, []);
  const loadAttributes = async () => {
    try {
      const res = await axios.get(urls.GET_ATTRIBUTES);
      setAttributesList(res.data.results);
    } catch (error) {
      console.warn(error);
    }
  };
  const onSave = () => {
    console.log("click");
    console.table(selectedAttribute);
    setProductData({ ...productData, attributesList: [...selectedAttribute] });
    stepper.next();
  };

  const onChange = data => {
    setSelectedAttributeOptions(data);
    onGetAttributeOptions(data);
  };
  const onGetAttributeOptions = selectedAttributesData => {
    const data = selectedAttributesData;
    const attributes = data.map(item => {
      const attribute = attributesList.filter(
        attribute_item => attribute_item.attribute_id === item.value
      );
      return { ...attribute[0], selectedOptions: [] };
    });
    setSelectedAttribute(attributes || []);
  };
  const onGo = e => {
    onGetAttributeOptions(selectedAttributeOptions);
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
          />
        </Col>
        <Col sm="2">
          <Button color="primary" onClick={onGo}>
            Go
          </Button>
        </Col>
      </FormGroup>
      {selectedAttribute.length > 0 && (
        <>
          <Attribute
            attributesList={selectedAttribute}
            setAttributesList={setSelectedAttribute}
          />
          <Button.Ripple color="primary" className="ml-3" onClick={onSave}>
            Save
          </Button.Ripple>
        </>
      )}
    </>
  );
}
