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
        return <p>{index + 1}. Niepoprawny typ zamówienia!</p>;
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
            <p>
                {"    "}
                <strong>{listBullet(listElementNumber++)}. Polecenie: </strong>
                {orderType.name}
                {charactersToExtendTo}
            </p>
        );

        if (orderType.components.includes("metaDesc")) {
            let metaDesc = "nie";
            if (subpage.metaDesc === true)
                metaDesc = "tak (o długości 130-150 zzs)";
            toRender.push(
                <p>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Meta description:{" "}
                    </strong>
                    {metaDesc}
                </p>
            );
        }

        if (orderType.components.includes("charactersToWrite")) {
            toRender.push(
                <p>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Liczba znaków do
                        napisania:{" "}
                    </strong>
                    {subpage.charactersToWrite}
                </p>
            );
        }

        if (orderType.components.includes("h1")) {
            let h1 = subpage.h1;
            if (subpage.h1 === "") h1 = "bez zmian";
            toRender.push(
                <p>
                    {"    "}
                    <strong>
                        {listBullet(listElementNumber++)}. Nagłówek H1:{" "}
                    </strong>
                    {h1}
                </p>
            );
        }

        if (orderType.components.includes("phrases")) {
            toRender.push(
                <span>
                    <p>
                        {"    "}
                        <strong>
                            {listBullet(listElementNumber++)}. Lista fraz:{" "}
                        </strong>
                    </p>
                    <p>{subpage.phrases}</p>
                    <br />
                </span>
            );
        }

        if (orderType.components.includes("hx") && subpage.hx !== "") {
            toRender.push(
                <span>
                    <p>
                        {"    "}
                        <strong>
                            {listBullet(listElementNumber++)}. Wykaz nagłówków
                            H2, H3, itd.:
                        </strong>
                    </p>
                    <p>{subpage.hx}</p>
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
                    <p>
                        {"    "}
                        <strong>
                            {listBullet(listElementNumber++)}. Inspiracje:
                        </strong>
                    </p>
                    <p>{subpage.inspiration}</p>
                </span>
            );
        }

        if (
            orderType.components.includes("comment") &&
            subpage.comment !== ""
        ) {
            toRender.push(
                <span>
                    <p>
                        {"    "}
                        <strong>
                            {listBullet(listElementNumber++)}. Uwagi:
                        </strong>
                    </p>
                    <p>{subpage.comment}</p>
                </span>
            );
        }
    }

    return (
        <div>
            <p>
                {index + 1}. {subpage.url}
            </p>
            {toRender}
            <br />
            <p>---</p>
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
