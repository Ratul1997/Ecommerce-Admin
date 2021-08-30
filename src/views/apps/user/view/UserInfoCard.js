/*eslint-disable*/
// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  Card,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Star, Phone, MapPin } from "react-feather";

const UserInfoCard = ({ selectedUser }) => {
  const renderUserImg = () => {
    if (selectedUser.profile_img !== null) {
      return (
        <img
          src={selectedUser.profile_img}
          alt="user-avatar"
          className="img-fluid rounded"
          height="104"
          width="104"
        />
      );
    } else {
      return (
        <Avatar
          initials
          className="rounded"
          content={`${selectedUser.first_name} ${selectedUser.last_name || ""}`}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(36px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "90px",
            width: "90px",
          }}
        />
      );
    }
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col
            xl="6"
            lg="12"
            className="d-flex flex-column justify-content-between border-container-lg"
          >
            <div className="user-avatar-section">
              <div className="d-flex justify-content-start">
                {renderUserImg()}
                <div className="d-flex flex-column ml-1">
                  <div className="user-info mb-1">
                    <h4 className="mb-0">
                      {selectedUser !== null
                        ? `${selectedUser.first_name} ${
                            selectedUser.last_name || ""
                          }`
                        : "Eleanor Aguilar"}
                    </h4>
                    <CardText tag="span">
                      {selectedUser !== null
                        ? selectedUser.email
                        : "eleanor.aguilar@gmail.com"}
                    </CardText>
                  </div>
                  <div className="d-flex flex-wrap align-items-center">
                    {/* <Button.Ripple
                      tag={Link}
                      to={`/apps/user/edit/${selectedUser.id}`}
                      color="primary"
                    >
                      Edit
                    </Button.Ripple>
                    <Button.Ripple className="ml-1" color="danger" outline>
                      Delete
                    </Button.Ripple> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="d-flex align-items-center user-total-numbers">
              <div className="d-flex align-items-center mr-2">
                <div className="color-box bg-light-primary">
                  <DollarSign className="text-primary" />
                </div>
                <div className="ml-1">
                  <h5 className="mb-0">23.3k</h5>
                  <small>Monthly Sales</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="color-box bg-light-success">
                  <TrendingUp className="text-success" />
                </div>
                <div className="ml-1">
                  <h5 className="mb-0">$99.87K</h5>
                  <small>Annual Profit</small>
                </div>
              </div>
            </div> */}
          </Col>
          <Col xl="6" lg="12" className="mt-2 mt-xl-0">
            <div className="user-info-wrapper">
              {/* <div className="d-flex flex-wrap align-items-center">
                <div className="user-info-title">
                  <User className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Username
                  </CardText>
                </div>
                <CardText className="mb-0">
                  {selectedUser !== null
                    ? selectedUser.username
                    : "eleanor.aguilar"}
                </CardText>
              </div> */}
              {/* <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <Check className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Status
                  </CardText>
                </div>
                <CardText className="text-capitalize mb-0">
                  {selectedUser !== null ? selectedUser.status : "Active"}
                </CardText>
              </div> */}
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <Star className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Role
                  </CardText>
                </div>
                <CardText className="text-capitalize mb-0">
                  {selectedUser !== null ? selectedUser.user_role : "Admin"}
                </CardText>
              </div>
              {/* <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <Flag className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Country
                  </CardText>
                </div>
                <CardText className="mb-0">
                  {selectedUser !== null ? selectedUser.country : "Bangladesh"}
                </CardText>
              </div> */}
              <div className="d-flex flex-wrap align-items-center">
                <div className="user-info-title">
                  <Phone className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Contact
                  </CardText>
                </div>
                <CardText className="mb-0">
                  {selectedUser !== null
                    ? selectedUser.phone_number
                    : "(123) 456-7890"}
                </CardText>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <h4 className="mb-1 mt-2">
              <MapPin size={20} className="mr-50" />
              <span className="align-middle">Address</span>
            </h4>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="address-1">Address</Label>
              <Input
                id="address-1"
                name="address1"
                defaultValue={`${selectedUser.houseNo || ""},${
                  selectedUser.landmark || ""
                } `}
                disabled
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="postcode">Postcode</Label>
              <Input
                id="postcode"
                name="postcode"
                placeholder={`${selectedUser.postCode || ""}`}
                disabled
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                defaultValue={`${selectedUser.city || ""}`}
                placeholder="Manhattan"
                id="city"
                name="city"
                disabled
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="state">State/Division</Label>
              <Input
                defaultValue={`${selectedUser.division || ""}`}
                placeholder="New York"
                id="state"
                name="state"
                disabled
              />
            </FormGroup>
          </Col>
          <Col lg="4" md="6">
            <FormGroup>
              <Label for="country">Country</Label>
              <Input
                placeholder="United States"
                id="country"
                name="country"
                disabled
                defaultValue={`${selectedUser.country || ""}`}
              />
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserInfoCard;
