import React, { memo } from "react";
import { Card as CardMaterialUi } from "@material-ui/core";
import PropTypes from "prop-types";

import "./Card.scss";

const Card = ({ classList, id, children }) => (
  <CardMaterialUi
    className={`Card ${classList && classList.join(" ")}`}
    id={id && id}
  >
    {children}
  </CardMaterialUi>
);

Card.propTypes = {
  classList: PropTypes.array,
  id: PropTypes.string
};

export default memo(Card);
