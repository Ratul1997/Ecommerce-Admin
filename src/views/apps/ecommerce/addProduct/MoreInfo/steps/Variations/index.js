/* eslint-disable */
import React, { useContext, Fragment, useState, useMemo } from "react";
import { Button, Col, FormGroup, Label } from "reactstrap";
import { ProductDataContext } from "../../..";
import IndividualVariants from "./IndividualVariants";

export default function Variations({ stepper }) {
  const { productData, setProductData } = useContext(ProductDataContext);
  const { attributesList } = productData;

  const [combinationsList, setCombinationList] = useState([]);

  const getOptions = useMemo(() => {
    const options = [];
    console.log('updated')
    attributesList.map(item =>
      item.selectedOptions.map(item2 => options.push(item2))
    );
    return options;
  }, [attributesList]);
  const allPossibleCases = arr => {
    if (arr.length == 1) {
      return arr[0];
    } else {
      var result = [];
      var allCasesOfRest = allPossibleCases(arr.slice(1)); // recur with the rest of array
      for (var i = 0; i < allCasesOfRest.length; i++) {
        for (var j = 0; j < arr[0].length; j++) {
          result.push(arr[0][j] + allCasesOfRest[i]);
        }
      }
      return result;
    }
  };
  const combinations = () => {
    if (attributesList.length < 1) return [];
    const optionsArray = attributesList.map(item =>
      item.selectedOptions.map(item2 => item2.value.toString())
    );
    return allPossibleCases(optionsArray);
  };

  const onGenerate = () => {
    const combinationResults = combinations();
    alert(`Generated ${combinationResults.length} variations`);
    setCombinationList(combinationResults);
  };
  if (productData.attributesList.length < 1)
    return (
      <>
        <FormGroup row>
          <Label sm="9">No Attributes Found</Label>
          <Button.Ripple
            color="primary"
            className="ml-3"
            onClick={() => stepper.previous()}
          >
            Select Attributes
          </Button.Ripple>
        </FormGroup>
      </>
    );
  return (
    <>
      <FormGroup row>
        <Label sm="9" for="attribute_options">
          Generate Variations from the Selected Attributes
        </Label>
        <Col sm="3">
          <Button color="primary" onClick={onGenerate}>
            Generate
          </Button>
        </Col>
      </FormGroup>
      {combinationsList.map((item, key) => {
        return (
          <IndividualVariants
            combinations={item}
            key={key}
            getOptions={getOptions}
          />
        );
      })}
      {/* <h1>asd</h1> */}
    </>
  );
}
