/* eslint-disable */
import React, { Fragment, useContext } from "react";
import { FormGroup, Label, Col, Card, CustomInput } from "reactstrap";
import { X } from "react-feather";
import Select from "react-select";

import { selectThemeColors } from "@utils";
import { ProductDataContext } from "../../..";

export default function AttributeOption({ attribute, index, onChange }) {
  const { productData, setProductData, isEditable, id, attributeListForData } =
    useContext(ProductDataContext);
  const getOptions = () => {
    return attribute.options.map(item => {
      return { value: item.option_id, label: item.option_name };
    });
  };

  return (
    <div>
      <Card className="p-1">
        <FormGroup row>
          <Label sm="3" for="attribute_name">
            Attribute Name
          </Label>
          <Label sm="7" for="attribute_name">
            {attribute.attribute_name}
          </Label>
        </FormGroup>
        {/* <FormGroup row>
          <Label sm="3" for="enable_for_variants">
            Variation
          </Label>
          <Col sm="9">
            <CustomInput
              type="checkbox"
              id="enable-variations"
              defaultChecked={true}
              label="Enable For Variants"
            />
          </Col>
        </FormGroup> */}
        <FormGroup row>
          <Label sm="3" for="attribute_options">
            Attribute Options
          </Label>
          <Col sm="9">
            <Select
              id="blog-edit-category"
              theme={selectThemeColors}
              isMulti
              name="colors"
              value={attribute.selectedOptions}
              options={getOptions()}
              onChange={onChange(index)}
              className="react-select"
              classNamePrefix="select"
              isDisabled={isEditable ? true : false}
            />
          </Col>
        </FormGroup>
      </Card>
    </div>
  );
}
