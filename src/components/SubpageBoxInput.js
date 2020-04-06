import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faTimes,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";

import Card from "./Card/Card";
import Test from "./Test";

import * as constantsOrderTypes from "../shared/constants/constants.orderTypes";

import "../style/SubpageBoxInput.scss";

const SubpageBoxInput = ({
  subpage,
  index,
  handleRemoveSubpageButtonClick,
  handleSubpageBoxChange,
  onDuplicateButtonClick,
}) => {
  const [buttonFold, setButtonFold] = useState({});

  useEffect(() => {
    console.log(`${index} did UPDATE`);
  });

  useEffect(() => {
    if (!subpage.folded) {
      setButtonFold({
        message: "Zwiń",
        icon: <FontAwesomeIcon icon={faAngleUp} />,
        color: "secondary",
        cardContentClass: "",
      });
    } else if (subpage.folded) {
      setButtonFold({
        message: subpage.url === "" ? "[brak nazwy]" : subpage.url,
        icon: <FontAwesomeIcon icon={faAngleDown} />,
        color: "primary",
        cardContentClass: "card--content-hidden",
      });
    }
  }, [subpage.folded]);

  const onFoldButtonClick = () => {
    handleSubpageBoxChange(
      document.querySelector(".cardBottom--button-fold"),
      subpage.id,
      !subpage.folded,
      document.querySelector(".cardBottom--button-fold").name
    );
  };

  const generateOutputCode = (orderType) => {
    if (orderType in constantsOrderTypes.orderTypes) {
      const modulesToRender = constantsOrderTypes.orderTypes[orderType].fields;
      let toRender = [];

      if (modulesToRender.includes("url")) {
        toRender.push(
          <TextField
            label="URL"
            color="primary"
            name="url"
            key="url"
            fullWidth
            margin="dense"
            value={subpage.url}
            onChange={(value) => handleSubpageBoxChange(value, subpage.id)}
          />
        );
      }
      if (modulesToRender.includes("phrases")) {
        toRender.push(
          <TextField
            label="Lista fraz"
            color="primary"
            name="phrases"
            key="phrases"
            fullWidth
            multiline
            rowsMax="7"
            margin="dense"
            variant="outlined"
            value={subpage.phrases}
            onChange={(value) => handleSubpageBoxChange(value, subpage.id)}
          />
        );
      }
      if (modulesToRender.includes("inspiration")) {
        toRender.push(
          <TextField
            label="Inspiracje"
            color="primary"
            name="inspiration"
            key="inspiration"
            fullWidth
            multiline
            rowsMax="10"
            margin="dense"
            variant="outlined"
            value={subpage.inspiration}
            onChange={(value) => handleSubpageBoxChange(value, subpage.id)}
          />
        );
      }

      return toRender;
    }
  };

  const test = useMemo(() => <Test url={subpage.url} />, [subpage.url]);

  return (
    <Card classList={["Card"]}>
      {test}
      <div className={`cardContent ${buttonFold.cardContentClass}`}>
        {generateOutputCode(subpage.type)}
      </div>
      <div className="cardBottom">
        <Button
          className="cardBottom--button cardBottom--button-identifier"
          variant="contained"
          margin="dense"
          size="small"
          color="default"
        >
          {index + 1}
        </Button>
        <Button
          onClick={onFoldButtonClick}
          className="cardBottom--button cardBottom--button-fold"
          variant="contained"
          margin="dense"
          size="small"
          name="folded"
          color={buttonFold.color}
        >
          <div className="button--contentContainer">
            <span className="button--contentContainer-left">
              {buttonFold.icon}
            </span>
            <span className="button--contentContainer-center">
              {buttonFold.message}
            </span>
            <span className="button--contentContainer-right">
              {buttonFold.icon}
            </span>
          </div>
        </Button>
        <Button
          onClick={() => {
            onDuplicateButtonClick(index + 1, subpage);
          }}
          className="cardBottom--button cardBottom--button-duplicate"
          variant="contained"
          margin="dense"
          size="small"
          name="folded"
        >
          <FontAwesomeIcon icon={faCopy} />
        </Button>
        <Button
          className="cardBottom--button cardBottom--button-delete"
          variant="contained"
          margin="dense"
          size="small"
          color="primary"
          onChange={(value) => handleSubpageBoxChange(value, subpage.id)}
          onClick={() => handleRemoveSubpageButtonClick(subpage.id)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
    </Card>
  );
};

SubpageBoxInput.propTypes = {
  subpage: PropTypes.object,
  index: PropTypes.number,
  handleSubpageBoxChange: PropTypes.func,
  onDuplicateButtonClick: PropTypes.func,
};

export default SubpageBoxInput;
