import React, { useState } from "react";
import { useEditorContext } from "./useEditorContext";

interface BlockProps {
  content: string;
}

const Block: React.FC<BlockProps> = ({ content }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(content);
 const { paragraphs, addParagraph, updateParagraphContent } = useEditorContext();
  const handleSave = (e: React.FocusEvent<HTMLParagraphElement>) => {
    console.log("保存:", e.target.textContent);
    setIsEdit(false);
  };

  return (
    <p
      className={`text-2xl text-gray-700 mb-2 cursor-${isEdit ? "text" : "pointer"} ${isEdit ? "" : "hover:underline"}`}
      onClick={() => setIsEdit(true)}
      contentEditable={isEdit}
      suppressContentEditableWarning
      onBlur={handleSave}
      onInput={(e) => setEditContent(e.currentTarget.textContent || "")}
    >
      {isEdit ? editContent : content}
    </p>
  );
};

export default Block;
