export const orderTypes = {
    contentNew: {
        name: "przygotowanie nowej treści na stronę",
        fields: [
            "url",
            "new",
            "charactersToWrite",
            "h1",
            "hx",
            "metaDesc",
            "metaDescLength",
            "phrases",
            "commonWords",
            "inspiration",
            "comment"
        ]
    },
    contentNewExtendCurrent: {
        name: "rozszerzenie obecnej treści",
        fields: [
            "url",
            "new",
            "charactersToExtendTo",
            "charactersToWrite",
            "h1",
            "hx",
            "metaDesc",
            "metaDescLength",
            "phrases",
            "commonWords",
            "inspiration",
            "comment"
        ]
    },
    contentUpdate: {
        name: "nasycenie obecnej treści frazami",
        fields: [
            "url",
            "new",
            "charactersToWrite",
            "metaDesc",
            "metaDescLength",
            "phrases",
            "commonWords",
            "inspiration",
            "comment"
        ]
    },
    contentNewUpdateCurrent: {
        name: "nasycenie obecnej treści frazami i rozszerzenie",
        fields: [
            "url",
            "new",
            "charactersToExtendTo",
            "charactersToWrite",
            "h1",
            "hx",
            "metaDesc",
            "metaDescLength",
            "phrases",
            "commonWords",
            "inspiration",
            "comment"
        ]
    },
    contentReword: {
        name: "przeredagowanie obecnej treści",
        fields: [
            "url",
            "new",
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
            "new",
            "charactersToWrite",
            "h1",
            "hx",
            "metaDesc",
            "metaDescLength",
            "phrases",
            "commonWords",
            "inspiration",
            "comment"
        ]
    },
    contentRewordUpdate: {
        name: "nasycenie i przeredagowanie obecnej treści",
        fields: [
            "url",
            "new",
            "charactersToWrite",
            "h1",
            "hx",
            "metaDesc",
            "metaDescLength",
            "phrases",
            "commonWords",
            "inspiration",
            "comment"
        ]
    }
};
