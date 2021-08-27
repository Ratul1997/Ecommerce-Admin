/*eslint-disable*/
import { Fragment, useState } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
  CardHeader,
  Input,
  Label,
} from "reactstrap";
const GenerateTag = () => {
  const [inputValues, setInputValues] = useState({});
  const [numberOfInput, setNumberOfInput] = useState(1);
  const [tamplateName, setTamplateName] = useState("");
  const handleOnChange = e => {
    const abc = {};
    abc[e.target.name] = e.target.value;
    setInputValues({ ...inputValues, ...abc });
  };
  const handleAddInput = () => {
    setNumberOfInput(numberOfInput + 1);
  };
  const handleSave = () => {
    console.log(inputValues, tamplateName, numberOfInput);
    // callApi
    // save in DB
  };
  console.log(inputValues["input_1"]);
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Generate Tag Template</CardTitle>
              <Input
                className="w-50"
                placeHolder="Template Name"
                onChange={e => setTamplateName(e.target.value)}
              />
            </CardHeader>
            <hr />
            <CardBody>
              {Array.from(Array(numberOfInput)).map((item, index) => {
                return (
                  <Row className="mb-1">
                    <Col xl="1" md="4" sm="6">
                      <Label sm="9" for="attribute_options">
                        Name
                      </Label>
                    </Col>
                    <Col
                      xl="5"
                      md="4"
                      sm="6"
                      className="pl-0 pr-sm-0 mb-md-0 mb-1"
                    >
                      <Input
                        name={`input_${index}`}
                        onChange={handleOnChange}
                        key={item}
                        className={index}
                        type="text"
                      />
                    </Col>
                    {numberOfInput === index + 1 ? (
                      <Col md="2" sm="12">
                        <Button.Ripple
                          color="primary"
                          className="mr-1"
                          onClick={handleAddInput}
                          outline
                        >
                          +
                        </Button.Ripple>
                      </Col>
                    ) : null}
                  </Row>
                );
              })}
              <Button.Ripple
                color="primary"
                className="mr-1"
                outline
                onClick={handleSave}
              >
                Save
              </Button.Ripple>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default GenerateTag;
