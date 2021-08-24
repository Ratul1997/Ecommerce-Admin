// ** Logo
/*eslint-disable */
import logo from "@src/assets/images/logo/logos.png";

const SpinnerComponent = () => {
  return (
    <div className="fallback-spinner vh-100">
      <img
        className="fallback-logo"
        src={logo}
        alt="logo"
        style={{ height: 70, width: 70 }}
      />
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export default SpinnerComponent;
