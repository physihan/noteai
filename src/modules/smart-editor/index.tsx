import React, { useMemo, useRef, useEffect, useCallback } from "react";
import { Slate, Editable, withReact, useSlate, useFocused } from "slate-react";
import { Editor, Transforms, Text, createEditor, Descendant, Range } from "slate";
import { css } from "@emotion/css";
import { withHistory } from "slate-history";

import { Button, Icon, Menu, Portal } from "./components";
import HoveringToolbar, { toggleFormat } from "./HoveringToolbar";
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};
const HoveringMenuExample = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "paragraph":
        return (
          <p className="text-left">
            <span>

            sss
            </span>
            {props.children}
          </p>
        );
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  return (
    <Slate editor={editor} value={initialValue}>
      <HoveringToolbar />
      <Editable
        renderLeaf={(props) => <Leaf {...props} />}
        placeholder="Enter some text..."
        renderElement={renderElement}
        onDOMBeforeInput={(event: InputEvent) => {
          switch (event.inputType) {
            case "formatBold":
              event.preventDefault();
              return toggleFormat(editor, "bold");
            case "formatItalic":
              event.preventDefault();
              return toggleFormat(editor, "italic");
            case "formatUnderline":
              event.preventDefault();
              return toggleFormat(editor, "underlined");
          }
        }}
      />
    </Slate>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "This example shows how you can make a hovering menu appear above your content, which you can use to make text ",
      },
      { text: "bold", bold: true },
      { text: ", " },
      { text: "italic", italic: true },
      { text: ", or anything else you might want to do!" },
    ],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out yourself! Just " }, { text: "select any piece of text and the menu will appear", bold: true }, { text: "." }],
  },
];

export default HoveringMenuExample;
