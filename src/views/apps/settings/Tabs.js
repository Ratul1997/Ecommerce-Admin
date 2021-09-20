/*eslint-disable*/
import { Nav, NavItem, NavLink } from "reactstrap";
import { User, Lock, Info, Link, Bell, Bookmark, ShoppingBag, Image } from "react-feather";

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav className="nav-left" pills vertical>
      {/* <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <User size={18} className="mr-1" />
          <span className="font-weight-bold">General</span>
        </NavLink>
      </NavItem> */}
      {/* <NavItem>
        <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
          <Lock size={18} className="mr-1" />
          <span className="font-weight-bold">Change Password</span>
        </NavLink>
      </NavItem> */}
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <Info size={18} className="mr-1" />
          <span className="font-weight-bold">Information</span>
        </NavLink>
      </NavItem>
      {/* <NavItem>
        <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
          <Link size={18} className="mr-1" />
          <span className="font-weight-bold">Social</span>
        </NavLink>
      </NavItem> */}
      <NavItem>
        <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
          <Bookmark size={18} className="mr-1" />
          <span className="font-weight-bold">Payment</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
          <ShoppingBag size={18} className="mr-1" />
          <span className="font-weight-bold">Shipping</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
          <Image size={18} className="mr-1" />
          <span className="font-weight-bold">Slider Image</span>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Tabs;
