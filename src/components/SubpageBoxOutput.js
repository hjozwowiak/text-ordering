import React, { Component } from "react";
import PropTypes from "prop-types";
import * as constantsOrderTypes from "../shared/constants/constants.orderTypes";
import uuidv1 from "uuid/v1";
import "../style/SubpageBoxOutput.scss";

class SubpageBoxOutput extends Component {
    state = {};

    shouldComponentUpdate(nextProps) {
        return !(this.props.subpage === nextProps.subpage);
    }

    render() {
        const { subpage, metaDescLength, index } = this.props;

        const listBullet = index => {
            return String.fromCharCode(index + 97);
        };

        let orderType = undefined;
        for (let i in Object.keys(constantsOrderTypes.orderTypes)) {
            if (
                Object.keys(constantsOrderTypes.orderTypes)[i] === subpage.type
            ) {
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
                <span class="text--output">
                    {index + 1}. Niepoprawny typ zamówienia!
                </span>
            );
        }

        let charactersToExtendTo = "";
        if (
            (orderType.fields.includes("charactersToExtendTo") ||
                orderType.fields.includes("contentNewUpdateCurrent")) &&
            subpage.charactersToExtendTo !== ""
        )
            charactersToExtendTo = ` do ${subpage.charactersToExtendTo} znaków.`;
        else if (orderType.fields.includes("charactersToExtendTo"))
            charactersToExtendTo = ` do X znaków.`;
        toRender.push(
            <span class="text--output" key={uuidv1()}>
                {"    "}
                <strong>{listBullet(listElementNumber++)}. Polecenie: </strong>
                {orderType.name}
                {charactersToExtendTo}
                <br />
            </span>
        );

        if (orderType.fields.includes("metaDesc")) {
            let metaDesc = "nie";
            if (subpage.metaDesc === true)
                metaDesc = `tak (o długości ${metaDescLength[0]}-${metaDescLength[1]} zzs)`;
            toRender.push(
                <span class="text--output" key={uuidv1()}>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Meta description:{" "}
                    </strong>
                    {metaDesc}
                    <br />
                </span>
            );
        }

        if (orderType.fields.includes("charactersToWrite")) {
            toRender.push(
                <span class="text--output" key={uuidv1()}>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Liczba znaków do
                        napisania:{" "}
                    </strong>
                    {subpage.charactersToWrite}
                    <br />
                </span>
            );
        }

        if (orderType.fields.includes("h1")) {
            let h1 = subpage.h1;
            if (subpage.h1 === "") h1 = "bez zmian";
            toRender.push(
                <span class="text--output" key={uuidv1()}>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Nagłówek H1:{" "}
                    </strong>
                    {h1}
                    <br />
                </span>
            );
        }

        if (orderType.fields.includes("phrases")) {
            const phrases = subpage.phrases.replace(
                new RegExp("(^|\\n)", "g"),
                "\n- "
            );
            toRender.push(
                <span class="text--output" key={uuidv1()}>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Lista fraz:{" "}
                    </strong>
                    {phrases}
                    <br />
                    <br />
                </span>
            );
        }

        if (orderType.fields.includes("hx") && subpage.hx !== "") {
            toRender.push(
                <span class="text--output" key={uuidv1()}>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Wykaz nagłówków H2,
                        H3, itd.:
                    </strong>
                    <br />
                    {subpage.hx}
                    <br />
                    <br />
                </span>
            );
        }

        if (
            orderType.fields.includes("inspiration") &&
            subpage.inspiration !== ""
        ) {
            toRender.push(
                <span class="text--output" key={uuidv1()}>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Inspiracje:
                    </strong>
                    <br />
                    {subpage.inspiration}
                    <br />
                    <br />
                </span>
            );
        }

        if (orderType.fields.includes("comment") && subpage.comment !== "") {
            toRender.push(
                <span class="text--output" key={uuidv1()}>
                    {"    "}
                    <strong>{listBullet(listElementNumber++)}. Uwagi:</strong>
                    <br />
                    {subpage.comment}
                    <br />
                </span>
            );
        }

        return (
            <div>
                <br />
                <span class="text--output">
                    {index + 1}. {subpage.url}
                    <br />
                </span>
                {toRender}
                <br />
                <span class="text--output">---</span>
                <br />
            </div>
        );
    }
}

SubpageBoxOutput.propTypes = {
    subpage: PropTypes.object,
    index: PropTypes.number,
    metaDescLength: PropTypes.array
};

export default SubpageBoxOutput;
