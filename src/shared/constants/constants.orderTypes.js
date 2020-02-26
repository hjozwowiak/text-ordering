export const orderTypes = {
    contentNew: {
        name: "przygotowanie nowej treści na stronę",
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
        name: "rozszerzenie obecnej treści",
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
        name: "nasycenie obecnej treści frazami",
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
        name: "nasycenie obecnej treści frazami i rozszerzenie",
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
        name: "przeredagowanie obecnej treści",
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
    },
    contentRewordExtendCurrent: {
        name: "przeredagowanie i rozszerzenie obecnej treści",
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
    contentRewordUpdate: {
        name: "nasycenie i przeredagowanie obecnej treści",
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
    }
};
