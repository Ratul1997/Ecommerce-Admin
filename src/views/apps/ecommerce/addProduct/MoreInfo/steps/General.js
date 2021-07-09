/* eslint-disable */
import { Fragment, useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import {
  Label,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Media,
  CustomInput,
  Card,
  CardBody,
  CardHeader,
  CardTitle
} from "reactstrap";

const General = ({ stepper, type }) => {
  const [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState("banner.jpg");

  const handleFileChosen = async file => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        console.log(fileReader.result);

        resolve(fileReader.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsDataURL(file);
    });
  };

  const convertObjectToArray = objects => {
    let arr = [];
    for (const [key, value] of Object.entries(objects)) {
      arr.push(value);
    }
    return arr;
  };
  const onChange = async e => {
    const reader = new FileReader(),
      files = e.target.files;
    const AllFiles = convertObjectToArray(files);
    setImgPath(files[0].name);
    const results = await Promise.all(
      AllFiles.map(async file => {
        const fileContents = await handleFileChosen(file);
        return fileContents;
      })
    );
    console.log(results);
    setFeaturedImg(results);
    // reader.onload = function() {
    //   console.log(reader.result);
    //   setFeaturedImg(reader.result);
    // };
    // reader.readAsDataURL(files[0]);
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
            />
          </FormGroup>
        </Row>

     
        <FormGroup className="mb-0">
          <Input
            type="file"
            id="multipleFileSelect"
            name="customFile"
            onChange={onChange}
            accept=".jpg, .png, .gif"
            multiple
            className="d-none"
          />
        </FormGroup>
        <Row>
          <Col>
            <Card sm="12">
              <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
                <CardTitle tag="h4">Gallery</CardTitle>
                <div className="d-flex mt-md-0 mt-1">
                  <Button
                    className="ml-2"
                    color="primary"
                    onClick={e =>
                      document.getElementById("multipleFileSelect").click()
                    }
                  >
                    {/* <Plus size={15} /> */}
                    <span className="align-middle ml-50">Add Image</span>
                  </Button>
                </div>
              </CardHeader>
              <Row className="p-2">
                {featuredImg &&
                  featuredImg.map(item => (
                    <Col sm="3">
                      <img
                        className="rounded mr-2 mb-1 mb-md-0"
                        src={item}
                        alt="featured img"
                        width="170"
                        height="110"
                      />
                    </Col>
                  ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default General;
