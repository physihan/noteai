import React, { useState } from "react";
import { useEditorContext } from "./useEditorContext";
import Dropdown from "../../components/Dropdown";
import { MyPopover } from "../../components/Popover";

interface BlockProps {
  content: string;
  id: any;
}

const Block: React.FC<BlockProps> = ({ content, id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const { paragraphs, addParagraph, updateParagraphContent } = useEditorContext();
  const handleSave = (e: React.FocusEvent<HTMLParagraphElement>) => {
    console.log("保存:", e.target.textContent);
    setIsEdit(false);
  };

  return (
    <>
      <p
        className={`text-2xl w-80  text-left  text-gray-700 mb-2 cursor-${isEdit ? "text" : "pointer"} ${isEdit ? "" : "hover:underline"}`}
        onClick={(e) => {
          setIsEdit(true);
          console.log(e);
        }}
        tabIndex={-1}
        contentEditable={isEdit}
        suppressContentEditableWarning
        // onBlur={handleSave}
        onInput={(e) => setEditContent(e.currentTarget.textContent || "")}
      >
        {<MyPopover></MyPopover>}
        {/* {isEdit && (
          <div className="absolute top--20">
            我是编辑器<Dropdown></Dropdown>
          </div>
        )} */}

        {isEdit ? editContent : content}
      </p>
    </>
  );
};

export default Block;
