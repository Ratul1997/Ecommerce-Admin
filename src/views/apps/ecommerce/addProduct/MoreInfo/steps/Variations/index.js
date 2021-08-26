/* eslint-disable */
import React, {
  useContext,
  Fragment,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { Button, Col, FormGroup, Label } from "reactstrap";
import { ProductDataContext } from "../../..";
import SidebarImage from "./SideBar";
import IndividualVariants from "./IndividualVariants";
import { VariantsModel } from "./VairantsModel";

export default function Variations({ stepper }) {
  const { productData, setProductData, isEditable, id } =
    useContext(ProductDataContext);
  const { attributesList } = productData;
  const variantIndex = useRef(null);

  const [combinationsList, setCombinationList] = useState(
    productData.variations
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ** Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) variantIndex.current = null;
  };

  const getOptions = useMemo(() => {
    const options = [];

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
    setCombinationList(
      combinationResults.map(item => VariantsModel({ combinations: item }))
    );
  };

  const onClickOnImagesList = item => e => {
    const targetedValue = {
      ...combinationsList[variantIndex.current],
      featured_img: item,
    };
    combinationsList[variantIndex.current] = targetedValue;
    setCombinationList([...combinationsList]);
  };
  const onChange =
    (index, type = null, nameOfSelect = null) =>
    e => {
      let targetedValue;
      if (type === "select") {
        targetedValue = {
          ...combinationsList[index],
          [nameOfSelect]: e,
        };
      } else if (type === "image") {
        toggleSidebar();
        variantIndex.current = index;
        targetedValue = {
          ...combinationsList[index],
        };
      } else {
        const { name, value, checked } = e.target;
        targetedValue = {
          ...combinationsList[index],
          [name]: name === "manageStock" ? checked : value,
        };
      }
      combinationsList[index] = targetedValue;
      setCombinationList([...combinationsList]);
    };

  const onRemove = index => e => {
    combinationsList.splice(index, 1);
    setCombinationList([...combinationsList]);
  };
  const onSave = () => {
    const formattedVariations = combinationsList.map(item => {
      
      return {
        ...item,
        inventory_status: item.inventory_status.value,
        featured_img: item.featured_img
          ? JSON.stringify(item.featured_img)
          : null,
        allowBackOrders: item.allowBackOrders.value,
      };
    });
    setProductData({ ...productData, variations: formattedVariations });
  };
  if (!isEditable && productData.attributesList.length < 1)
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

  if (isEditable && productData.attributesList.length < 1)
    return (
      <>
        <FormGroup row>
          <Label sm="9">No Attributes Found</Label>
          <Button.Ripple
            color="primary"
            className="ml-3"
            onClick={() => stepper.previous()}
          >
            Load Attributes
          </Button.Ripple>
        </FormGroup>
      </>
    );
    
  return (
    <>
      {!isEditable && (
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
      )}
      {combinationsList.length > 0 &&
        combinationsList.map((item, key) => {
          return (
            <IndividualVariants
              item={item}
              key={key}
              getOptions={getOptions}
              index={key}
              onChange={onChange}
              toggleSidebar={toggleSidebar}
              onRemove={onRemove}
            />
          );
        })}
      {combinationsList.length > 0 && (
        <>
          <SidebarImage
            open={sidebarOpen}
            toggleSidebar={toggleSidebar}
            onClickOnImagesList={onClickOnImagesList}
          />
          {!isEditable && (
            <Button.Ripple color="primary mt-2" onClick={onSave}>
              Save
            </Button.Ripple>
          )}
        </>
      )}
    </>
  );
}
