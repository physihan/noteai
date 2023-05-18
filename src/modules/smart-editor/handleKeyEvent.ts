import { Transforms, Text } from "slate";
export default (event, editor) => {
  if (!event.ctrlKey) {
    return;
  }

  switch (event.key) {
    case "`": {
      event.preventDefault();
      const [match] = editor.nodes(editor, {
        match: (n) => n.type === "code",
      });
      Transforms.setNodes(editor, { type: match ? null : "code" }, { match: (n) => editor.isBlock(editor, n) });
      break;
    }

    case "b": {
      event.preventDefault();
      Transforms.setNodes(editor, { bold: true }, { match: (n) => Text.isText(n), split: true });
      break;
    }
  }
};
