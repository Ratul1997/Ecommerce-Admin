/*eslint-disable*/
// ** Navigation sections imports
import apps from "./apps";
import pages from "./pages";
import forms from "./forms";
import tables from "./tables";
import others from "./others";
import dashboards from "./dashboards";
import uiElements from "./ui-elements";
import chartsAndMaps from "./charts-maps";

// ** Merge & Export
const routes =
  process.env.REACT_APP_BASENAME !== "production"
    ? [
        ...dashboards,
        ...apps,
        ...pages,
        ...uiElements,
        ...forms,
        ...tables,
        ...chartsAndMaps,
        ...others,
      ]
    : [...dashboards, ...apps];

export default routes;

