import React from "react";

import {
  AcceptedTagsType,
  ItemStringParsedToArray,
  ParseStringToHTMLProps,
} from "./ParseStringToHTML.types";

// import { Container } from './styles';

const ParseStringToHTML: React.FC<ParseStringToHTMLProps> = (props) => {
  function parseHtmlStringToArray() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(props.text, "text/html");
    const elements = doc.body.childNodes;

    const result: Array<ItemStringParsedToArray> = [];

    elements.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        result.push({ type: "normal", content: node.textContent });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        let type: AcceptedTagsType = "normal";
        if (node.nodeName === "B") type = "bold";
        if (node.nodeName === "I") type = "italico";
        if (node.nodeName === "BR") type = "breakline";

        result.push({ type, content: node.textContent });
      }
    });

    return result;
  }

  function parseArrayToReactElements(items: Array<ItemStringParsedToArray>) {
    return items.map((item, index) => {
      if (item.type === "normal") {
        return <span key={item.type + index}>{item.content}</span>;
      } else if (item.type === "bold") {
        return <b key={item.type + index}>{item.content}</b>;
      } else if (item.type === "italico") {
        return <i key={item.type + index}>{item.content}</i>;
      } else if (item.type === "breakline") {
        return <br key={item.type + index} />;
      }
    });
  }

  const elementsParsedArray = React.useMemo(() => {
    const arrayParsed = parseHtmlStringToArray();
    return parseArrayToReactElements(arrayParsed);
  }, [props.text]);

  return elementsParsedArray;
};

export default ParseStringToHTML;
