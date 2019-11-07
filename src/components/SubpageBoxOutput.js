import React from "react";
import PropTypes from "prop-types";
import "../style/SubpageBoxOutput.scss";

const SubpageBoxOutput = ({ subpage, index, orderTypes }) => {
    const listBullet = index => {
        return String.fromCharCode(index + 97);
    };

    let orderType = undefined;
    for (let i in orderTypes) {
        if (orderTypes[i].value === subpage.type) {
            orderType = orderTypes[i];
        }
    }

    let listElementNumber = 0;
    let toRender = [];
    if (orderType === undefined) {
        return <span>{index + 1}. Niepoprawny typ zamówienia!</span>;
    } else {
        let charactersToExtendTo = "";
        if (
            orderType.components.includes("charactersToExtendTo") &&
            subpage.charactersToExtendTo !== ""
        )
            charactersToExtendTo = ` do ${subpage.charactersToExtendTo} znaków.`;
        else if (orderType.components.includes("charactersToExtendTo"))
            charactersToExtendTo = ` do X znaków.`;
        toRender.push(
            <span>
                {"    "}
                <strong>{listBullet(listElementNumber++)}. Polecenie: </strong>
                {orderType.name}
                {charactersToExtendTo}
                <br />
            </span>
        );

        if (orderType.components.includes("metaDesc")) {
            let metaDesc = "nie";
            if (subpage.metaDesc === true)
                metaDesc = "tak (o długości 130-150 zzs)";
            toRender.push(
                <span>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Meta description:{" "}
                    </strong>
                    {metaDesc}
                    <br />
                </span>
            );
        }

        if (orderType.components.includes("charactersToWrite")) {
            toRender.push(
                <span>
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

        if (orderType.components.includes("h1")) {
            let h1 = subpage.h1;
            if (subpage.h1 === "") h1 = "bez zmian";
            toRender.push(
                <span>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Nagłówek H1:{" "}
                    </strong>
                    {h1}
                    <br />
                </span>
            );
        }

        if (orderType.components.includes("phrases")) {
            toRender.push(
                <span>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Lista fraz:{" "}
                    </strong>
                    <br />
                    {subpage.phrases}
                    <br />
                    <br />
                </span>
            );
        }

        if (orderType.components.includes("hx") && subpage.hx !== "") {
            toRender.push(
                <span>
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
            orderType.components.includes("inspiration") &&
            subpage.inspiration !== ""
        ) {
            toRender.push(
                <span>
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

        if (
            orderType.components.includes("comment") &&
            subpage.comment !== ""
        ) {
            toRender.push(
                <span>
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
            <span>
                {index + 1}. {subpage.url}
                <br />
            </span>
            {toRender}
            <br />
            <span>---</span>
            <br />
        </div>
    );
};

SubpageBoxOutput.propTypes = {
    subpage: PropTypes.object,
    index: PropTypes.number,
    orderTypes: PropTypes.array
};

export default SubpageBoxOutput;
