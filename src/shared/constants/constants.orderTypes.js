export const orderTypes = {
    contentNew: {
        name: "Proszę o przygotowanie nowej treści na stronę.",
        fields: [
            "url",
            "charactersToWrite",
            "h1",
            "hx",
            "metaDesc",
            "metaDescLength",
            "phrases",
            "inspiration",
            "comment"
        ]
    },
    contentNewExtendCurrent: {
        name: "Proszę o rozszerzenie obecnej treści",
        fields: [
            "url",
            "charactersToExtendTo",
            "charactersToWrite",
            "h1",
            "hx",
            "metaDesc",
            "metaDescLength",
            "phrases",
            "inspiration",
            "comment"
        ]
    },
    contentUpdate: {
        name: "Proszę o nasycenie obecnej treści frazami.",
        fields: [
            "url",
            "charactersToWrite",
            "metaDesc",
            "metaDescLength",
            "phrases",
            "inspiration",
            "comment"
        ]
    },
    contentNewUpdateCurrent: {
        name: "Proszę o nasycenie obecnej treści frazami i rozszerzenie",
        fields: [
            "url",
            "charactersToExtendTo",
            "charactersToWrite",
            "h1",
            "hx",
            "metaDesc",
            "metaDescLength",
            "phrases",
            "inspiration",
            "comment"
        ]
    },
    contentReword: {
        name: "Proszę o przeredagowanie obecnej treści.",
        fields: [
            "url",
            "charactersToWrite",
            "h1",
            "hx",
            "metaDesc",
            "metaDescLength",
            "inspiration",
            "comment"
        ]
    }
};
