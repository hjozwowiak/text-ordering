export const copyToClipboard = (event, customId) => {
    if (!event.target) {
        console.error("copyToClipboard(): Wrong first argument of a function");
        return -1;
    }
    if (
        customId !== undefined &&
        customId !== null &&
        document.querySelectorAll(`#${customId}`).length !== 1
    ) {
        console.error(
            "copyToClipboard(): Element has to have an unique, non-empty ID"
        );
        return -1;
    }

    let valueToCopy;
    if (customId !== undefined && customId !== null) {
        valueToCopy = document.querySelector(`#${customId}`).innerText;
    } else {
        valueToCopy = event.target.innerText;
    }

    const dummy = document.createElement("textarea");
    dummy.style.opacity = 0;
    dummy.style.position = "absolute";
    dummy.value = valueToCopy;
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
};
