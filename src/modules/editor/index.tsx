import React, { useState, createContext, useContext, useEffect } from "react";
import Block from "./Block";
import { SortableItem, SortableList } from "./Sortable";
import { EditorProvider, useEditorContext } from "./useEditorContext";
import useEditorStore from "./useEditorStore";
// import Sortable from "./Sortable";

const Editor: React.FC = () => {
  // const { paragraphs, addParagraph, updateParagraphContent } = useEditorContext();
  const { paragraphs, activeParagraphId } = useEditorStore();
  console.log(paragraphs, "editor");
useEffect(()=>{
  // 点击除了编辑区域之外的地方，取消编辑状态
  const handleClick = (e: MouseEvent) => {
    // if(e.target)
    console.log(e.target);
  }
  // 事件委托
  document.addEventListener("click", handleClick);
})
  return (
    <div id="editor" className="m-auto w-auto">
      <SortableList>
        {paragraphs.map((paragraph, index) => {
          console.log("render", paragraph.id,activeParagraphId,paragraph.id === activeParagraphId);
          return <Block key={paragraph.id} index={index} id={paragraph.id} isEdit={activeParagraphId === paragraph.id} content={paragraph.content} />;
        })}
      </SortableList>
      <Block content="" id={"new"} />
    </div>
  );
};

export default function EditorModule() {
  return (
    <EditorProvider>
      <Editor />
      {/* <Sortable.List items={["1,2,3", "sss", "swwqwqe"]}></Sortable.List> */}
    </EditorProvider>
  );
}
