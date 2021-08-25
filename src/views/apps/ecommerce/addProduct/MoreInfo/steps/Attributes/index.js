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
  const { productData, setProductData, isEditable, id, attributeListForData } =
    useContext(ProductDataContext);

  const [attributesList, setAttributesList] = useState([]);
  const [selectedAttributeOptions, setSelectedAttributeOptions] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState([]);
  const getOptions = () => {
    return attributesList.map(item => {
      return { value: item.attribute_id, label: item.attribute_name };
    });
  };

  console.log(id);
  useEffect(() => {
    loadAttributes();
    if (id) {
      console.log("asas", attributeListForData);
    }
  }, []);

  const loadAttributes = async () => {
    try {
      const res = await axios.get(urls.GET_ATTRIBUTES);
      setAttributesList(res.data.results);
      if (id) {
        setSelectedAttributeOptions(attributeListForData.attributes);
        onGetAttributeOptions(attributeListForData, res.data.results);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  const onSave = () => {
    console.table(selectedAttribute);
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
    console.log(attributes);
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
