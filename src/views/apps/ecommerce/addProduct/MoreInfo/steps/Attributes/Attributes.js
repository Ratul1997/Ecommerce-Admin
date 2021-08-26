/* eslint-disable */
import { Fragment, React, useEffect } from "react";
import axios from "axios";
import { urls } from "@urls";
import AttributeOption from "./AttributeOption";


export default function Attributes({ attributesList, setAttributesList }) {
 
  const onChange = index => data => {
    attributesList[index]["selectedOptions"] = data;
    setAttributesList([...attributesList]);
  };
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Attributes</h5>
      </div>
      {
        <ul>
          {attributesList.map((item, key) => {
            return (
              <AttributeOption
                attribute={item}
                key={key}
                onChange={onChange}
                index={key}
              />
            );
          })}
        </ul>
      }
    </Fragment>
  );
}
