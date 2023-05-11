import { createContext, useContext, useState } from "react";

interface Paragraph {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
interface EditorContextValue {
  paragraphs: Paragraph[];
  addParagraph: () => void;
  updateParagraphContent: (id: number, content: string) => void;
}

const EditorContext = createContext<EditorContextValue>({
  paragraphs: [],
  addParagraph: () => {},
  updateParagraphContent: () => {},
});

export const useEditorContext = () => useContext(EditorContext);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
    {
      id: 1,
      content: "这是第一段。",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      content: "这是第二段。",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const addParagraph = () => {
    const newId = paragraphs.length + 1;
    const newParagraph: Paragraph = {
      id: newId,
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setParagraphs([...paragraphs, newParagraph]);
  };

  const updateParagraphContent = (id: number, content: string) => {
    setParagraphs(paragraphs.map((p) => (p.id === id ? { ...p, content, updatedAt: new Date() } : p)));
  };

  const contextValue: EditorContextValue = {
    paragraphs,
    addParagraph,
    updateParagraphContent,
  };

  return <EditorContext.Provider value={contextValue}>{children}</EditorContext.Provider>;
};
