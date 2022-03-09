import HexTooltip from "@moonswelle/hex-tooltip";

const test = (element: Element, hasDomNode: boolean, hasText: boolean) => {
    const className = element.getAttribute("class");
    const wasMounted = className && className.includes("hex-tooltip");
    if (!hasDomNode && hasText && !wasMounted) {
        HexTooltip(element as HTMLElement);
    }
};

const traverse = (): void => {
    const elements = document.getElementsByTagName("*");
    const regex = new RegExp(/\[\[([^<>]*?)\]\]/g);
    const len = elements.length;
    const textAdjacentNodes = [];
    const blacklist = [
        "script",
        "head",
        "meta",
        "title",
        "link",
        "style",
        "base",
        "iframe",
        "noscript",
        "svg",
        "img",
    ];

    for (let i = 0; i < len; i += 1) {
        const element = elements[i];
        const omit = blacklist.includes(element.tagName.toLowerCase());

        if (omit) {
            // eslint-disable-next-line no-continue
            continue;
        }

        const children = element.childNodes;
        let hasText = false;
        let hasDomNode = false;

        for (let j = 0; j < children.length; j += 1) {
            if (children[j].nodeType === 3) {
                const text = children[j].nodeValue;
                if (text) {
                    const [, rootText] = regex.exec(text) || [];
                    if (rootText) {
                        hasText = true;
                        break;
                    }
                }
            } else if (children[j].nodeType === 1) {
                hasDomNode = true;
            }
        }

        if (hasText && hasDomNode) {
            textAdjacentNodes.push(element);
        }

        test(element, hasDomNode, hasText);
    }

    for (let i = 0; i < textAdjacentNodes.length; i += 1) {
        test(textAdjacentNodes[i], false, true);
    }
};

setInterval(traverse, 500);
traverse();
