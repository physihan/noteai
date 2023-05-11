import React, { useState, createContext, useContext } from "react";
import Block from "./Block";
import { EditorProvider, useEditorContext } from "./useEditorContext";
import Sortable from "./Sortable";




const Editor: React.FC = () => {
  const { paragraphs, addParagraph, updateParagraphContent } = useEditorContext();

  return (
    <div>
      {paragraphs.map((paragraph) => (
        <Block key={paragraph.id} content={paragraph.content} onChange={(value) => updateParagraphContent(paragraph.id, value)} />
      ))}
      <Block content="" onChange={addParagraph} />
    </div>
  );
};


export default function EditorModule() {
  return (
    <EditorProvider>
      <Editor />
      <Sortable.List items={["1,2,3","sss","swwqwqe"]}></Sortable.List>
    </EditorProvider>
  );
}
