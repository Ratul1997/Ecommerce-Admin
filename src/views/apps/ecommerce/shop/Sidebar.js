/*eslint-disable*/
// ** Custom Hooks
import { useRTL } from "@hooks/useRTL";

// ** Third Party Components
import wNumb from "wnumb";
import classnames from "classnames";
import { Star } from "react-feather";
import Nouislider from "nouislider-react";
import { Card, CardBody, Row, Col, CustomInput, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/noui-slider/noui-slider.scss";
import Ratings from "./Ratings";
import ProductCategories from "./ProductCategories";

const Sidebar = props => {
  // ** Props
  const { sidebarOpen, selected, setSelected } = props;

  // ** Hooks
  const [isRtl, setIsRtl] = useRTL();

  return (
    <div className="sidebar-detached sidebar-left">
      <div className="sidebar">
        <div
          className={classnames("sidebar-shop", {
            show: sidebarOpen,
          })}
        >
          <Row>
            <Col sm="12">
              <h6 className="filter-heading d-none d-lg-block">Filters</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <div id="product-categories">
                <ProductCategories selected={selected} setSelected={setSelected} />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
