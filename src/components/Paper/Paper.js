import React from "react";
import { Paper as PaperMaterialUi } from "@material-ui/core";

import "./Paper.scss";

const Paper = ({ children }) => (
    <PaperMaterialUi className="Paper">{children}</PaperMaterialUi>
);

export default Paper;
