import React from "react";
import PropTypes from "prop-types";
import * as constantsOrderTypes from "../shared/constants/constants.orderTypes";
import uuidv1 from "uuid/v1";
import "../style/SubpageBoxOutput.scss";

const SubpageBoxOutput = ({ subpage, metaDescLength, index }) => {
  const listBullet = (index) => {
    return String.fromCharCode(index + 97);
  };

  const beautifyList = (listAsString) => {
    listAsString = listAsString
      //   .replace(new RegExp("(?<=(^|\n))[\t -]+", "g"), "")
      .replace(new RegExp("^[\t -]+", "g"), "")
      .replace(new RegExp("\n[\t -]+", "g"), "\n")
      //   .replace(new RegExp("(?<=(^|\n))\n", "g"), "")
      .replace(new RegExp("^\n", "g"), "")
      .replace(new RegExp("(\n){2,}", "g"), "\n")
      .replace(new RegExp("\n$", "g"), "")
      //   .replace(new RegExp("(?<=(^|\n))", "g"), "- ")
      .replace(new RegExp("^", "g"), "- ")
      .replace(new RegExp("\n", "g"), "\n- ")
      .replace(new RegExp("(^|$)", "g"), "\n");
    if (listAsString.match(new RegExp("^\n- \n$", "g"))) {
      return false;
    } else {
      return listAsString;
    }
  };

  let orderType = undefined;
  for (let i in Object.keys(constantsOrderTypes.orderTypes)) {
    if (Object.keys(constantsOrderTypes.orderTypes)[i] === subpage.type) {
      orderType =
        constantsOrderTypes.orderTypes[
          Object.keys(constantsOrderTypes.orderTypes)[i]
        ];
    }
  }

  let listElementNumber = 0;
  let toRender = [];
  if (orderType === undefined) {
    return (
      <span className="text--output">
        {index + 1}. Niepoprawny typ zamówienia!
      </span>
    );
  } else {
    let charactersToExtendTo = "";
    if (
      (orderType.fields.includes("charactersToExtendTo") ||
        orderType.fields.includes("contentNewUpdateCurrent")) &&
      subpage.charactersToExtendTo !== ""
    )
      charactersToExtendTo = ` do ${subpage.charactersToExtendTo} znaków`;
    else if (orderType.fields.includes("charactersToExtendTo"))
      charactersToExtendTo = ` do X znaków`;
    toRender.push(
      <span className="text--output" key={uuidv1()}>
        {"    "}
        <strong>{listBullet(listElementNumber++)}. Polecenie: </strong>
        Proszę o {orderType.name}
        {charactersToExtendTo}
        <br />
      </span>
    );

    if (orderType.fields.includes("metaDesc")) {
      let metaDesc = "nie";
      if (subpage.metaDesc === true)
        metaDesc = `tak (o długości ${metaDescLength[0]}-${metaDescLength[1]} zzs)`;
      toRender.push(
        <span className="text--output" key={uuidv1()}>
          {"    "}
          <strong>{listBullet(listElementNumber++)}. Meta description: </strong>
          {metaDesc}
          <br />
        </span>
      );
    }

    if (orderType.fields.includes("charactersToWrite")) {
      toRender.push(
        <span className="text--output" key={uuidv1()}>
          {"    "}
          <strong>
            {listBullet(listElementNumber++)}. Liczba znaków do napisania:{" "}
          </strong>
          {subpage.charactersToWrite}
          <br />
        </span>
      );
    }

    if (orderType.fields.includes("h1")) {
      let h1 = subpage.h1;
      if (subpage.h1 === "") h1 = "Bez zmian (tak jak na stronie)";
      toRender.push(
        <span className="text--output" key={uuidv1()}>
          {"    "}
          <strong>{listBullet(listElementNumber++)}. Nagłówek H1: </strong>
          {h1}
          <br />
        </span>
      );
    }

    if (orderType.fields.includes("phrases")) {
      const phrases = beautifyList(subpage.phrases);
      toRender.push(
        <span className="text--output" key={uuidv1()}>
          {"    "}
          <strong>{listBullet(listElementNumber++)}. Lista fraz:</strong>
          {phrases || " Nie zdefiniowano"}
          <br />
        </span>
      );
    }

    const commonWords = beautifyList(subpage.commonWords);
    if (
      orderType.fields.includes("commonWords") &&
      subpage.commonWords !== "" &&
      commonWords
    ) {
      const commonWords = beautifyList(subpage.commonWords);
      toRender.push(
        <span className="text--output" key={uuidv1()}>
          {"    "}
          <strong>{listBullet(listElementNumber++)}. Common words:</strong>
          {commonWords}
          <br />
        </span>
      );
    }

    if (orderType.fields.includes("hx") && subpage.hx !== "") {
      const hx = beautifyList(subpage.hx);
      toRender.push(
        <span className="text--output" key={uuidv1()}>
          {"    "}
          <strong>
            {listBullet(listElementNumber++)}. Wykaz nowych nagłówków lub co ma
            się znaleźć w poszczególnych akapitach:
          </strong>
          {hx}
          <br />
        </span>
      );
    }

    const inspiration = beautifyList(subpage.inspiration);
    if (
      orderType.fields.includes("inspiration") &&
      subpage.inspiration !== "" &&
      inspiration
    ) {
      toRender.push(
        <span className="text--output" key={uuidv1()}>
          {"    "}
          <strong>{listBullet(listElementNumber++)}. Inspiracje:</strong>
          {inspiration}
          <br />
        </span>
      );
    }

    if (orderType.fields.includes("comment") && subpage.comment !== "") {
      toRender.push(
        <span className="text--output" key={uuidv1()}>
          {"    "}
          <strong>{listBullet(listElementNumber++)}. Uwagi:</strong>
          <br />
          {subpage.comment}
          <br />
        </span>
      );
    }
  }

  return (
    <div>
      <br />
      <span className="text--output">
        {index + 1}. {subpage.url}{" "}
        {subpage.new ? "(nowa strona - strona nie istnieje / w budowie)" : ""}
        <br />
      </span>
      {toRender}
      <br />
      <span className="text--output">---</span>
      <br />
    </div>
  );
};

SubpageBoxOutput.propTypes = {
  subpage: PropTypes.object,
  index: PropTypes.number,
  metaDescLength: PropTypes.array,
};

export default SubpageBoxOutput;
