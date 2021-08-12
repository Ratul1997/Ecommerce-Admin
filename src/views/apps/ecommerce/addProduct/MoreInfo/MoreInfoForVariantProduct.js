/* eslint-disable */
import { useRef, useState } from "react";
import Wizard from "@components/wizard";
import AccountDetails from "./steps/AccountDetails.js";
import General from "./steps/General.js";
import Inventory from "./steps/Inventory/Inventory.js";
import Shipping from "./steps/Shipping.js";
import LinkedProducts from "./steps/LinkedProducts.js";
import Attributes from "./steps/Attributes";
import Advance from "./steps/Advance.js";
import Variations from "./steps/Variations/index.js";

const MoreInfoForVariantProduct = ({ productData, setProductData }) => {
  const [stepper, setStepper] = useState(null);
  const ref = useRef(null);

  const steps = [
    {
      id: "general",
      title: "General",
      subtitle: "",
      content: (
        <General
          stepper={stepper}
          type="wizard-vertical"
          productData={productData}
          setProductData={setProductData}
        />
      ),
    },
    {
      id: "inventory",
      title: "Inventory",
      subtitle: "",
      content: (
        <Inventory
          stepper={stepper}
          type="wizard-vertical"
          productData={productData}
          setProductData={setProductData}
        />
      ),
    },
    {
      id: "shipping",
      title: "Shipping",
      subtitle: "",
      content: (
        <Shipping
          stepper={stepper}
          type="wizard-vertical"
          productData={productData}
          setProductData={setProductData}
        />
      ),
    },
    {
      id: "attributes",
      title: "Attributes",
      subtitle: "",
      content: (
        <Attributes
          stepper={stepper}
          type="wizard-vertical"
          productData={productData}
          setProductData={setProductData}
        />
      ),
    },
    {
      id: "variations",
      title: "Variation",
      subtitle: "",
      content: (
        <Variations
          stepper={stepper}
          type="wizard-vertical"
          productData={productData}
          setProductData={setProductData}
        />
      ),
    },
  ];

  return (
    <div className="vertical-wizard">
      <Wizard
        type="vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={el => setStepper(el)}
      />
    </div>
  );
};

export default MoreInfoForVariantProduct;
