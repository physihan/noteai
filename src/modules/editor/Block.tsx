import React, { memo, useMemo, useState } from "react";
import { pickEditorContext, useEditorContext } from "./useEditorContext";
import Dropdown from "../../components/Dropdown";
import { MyPopover } from "../../components/Popover";
import Pop from "./Pop";
import BlockToolbar from "./BlockToolbar";
import useEditorStore from "./useEditorStore";

interface BlockProps {
  content: string;
  id: any;
  isEdit: boolean;
  index: number;
}
const Block: React.FC<BlockProps> = ({ content, id, isEdit, index }) => {
  // const [isEdit, setIsEdit] = useState(false);
  const setActiveParagraphId = useEditorStore.use.setActiveParagraphId();
  const setParagraphsContentByIndex = useEditorStore.use.setParagraphsContentByIndex();
  console.log("blockRender", id);
  // const [editContent, setEditContent] = useState(content);
  // const { paragraphs, addParagraph, updateParagraphContent, activeParagraphId, dispatch } = useEditorContext();
  const handleSave = (e: React.FocusEvent<HTMLParagraphElement>) => {
    console.log(e.relatedTarget);
    if(e.relatedTarget&&e.relatedTarget instanceof HTMLElement&&e.relatedTarget.classList.contains("editor-toolbar")) {
      
    }else{

      setActiveParagraphId(-1)
    }
    console.log("保存:", e.target);
  };
  const ref = React.useRef(null);

  return (
    <>
      <p
        className={`text-2xl w-80 min-h-8  text-left border-1 border-black border-solid text-gray-700 mb-2 cursor-${isEdit ? "text" : "pointer"} ${isEdit ? "" : "hover:underline"}`}
        onClick={(e) => {
          // setIsEdit(true);
          console.log(e);
          setActiveParagraphId(id);
        }}
        ref={ref}
        tabIndex={-1}
        contentEditable={isEdit}
        suppressContentEditableWarning
        onBlur={handleSave}
        // onInput={(e) => setParagraphsContentByIndex(index, e.target.textContent || "")}
      >
        {isEdit && (
          <Pop message="sss" node={ref}>
            <BlockToolbar></BlockToolbar>
          </Pop>
        )}
        {/* {isEdit && (
          <div className="absolute top--20">
            我是编辑器<Dropdown></Dropdown>
          </div>
        )} */}

        {isEdit ? content : content}
      </p>
    </>
  );
};

export default memo(Block);
