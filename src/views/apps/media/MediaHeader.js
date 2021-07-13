/* eslint-disable*/

import React from "react";
import { CardHeader, CardTitle, ButtonGroup, Button, Input, Label } from "reactstrap";
import { Grid, List, Plus } from "react-feather";
import classnames from "classnames";

export default function MediaHeader({ titles, activeView, setActiveView }) {
  return (
    <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
      <CardTitle tag="h4">{titles}</CardTitle>

      <div className="d-flex mt-md-0 mt-1">
        <ButtonGroup className="btn-group-toggle">
          <Button
            tag="label"
            className={classnames("btn-icon view-btn grid-view-btn", {
              active: activeView === "grid"
            })}
            color="primary"
            outline
            onClick={() => setActiveView("grid")}
          >
            <Grid size={18} />
          </Button>
          <Button
            tag="label"
            className={classnames("btn-icon view-btn list-view-btn", {
              active: activeView === "list"
            })}
            color="primary"
            outline
            onClick={() => setActiveView("list")}
          >
            <List size={18} />
          </Button>
        </ButtonGroup>
        <Button
          className="ml-2"
          color="primary"
          onClick={e => document.getElementById("fileSelect").click()}
        >
          <Plus size={15} />
          <span className="align-middle ml-50">Add {titles}</span>
        </Button>
      </div>
    </CardHeader>
  );
}
