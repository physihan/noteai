import { createContext, useContext, useReducer } from "react";

interface Paragraph {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

type State = {
  paragraphs: Paragraph[];
};

type Action =
  | {
      type: "ADD_PARAGRAPH";
      payload: Paragraph;
    }
  | {
      type: "UPDATE_PARAGRAPH_CONTENT";
      payload: {
        id: number;
        content: string;
        updatedAt: Date;
      };
    };

interface EditorContextValue extends State {
  addParagraph: () => void;
  updateParagraphContent: (id: number, content: string) => void;
}

const EditorContext = createContext<EditorContextValue>({
  paragraphs: [],
  addParagraph: () => {},
  updateParagraphContent: () => {},
});

export const useEditorContext = () => useContext(EditorContext);

const editorReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_PARAGRAPH":
      return {
        ...state,
        paragraphs: [...state.paragraphs, action.payload],
      };
    case "UPDATE_PARAGRAPH_CONTENT":
      return {
        ...state,
        paragraphs: state.paragraphs.map((p) => (p.id === action.payload.id ? { ...p, ...action.payload } : p)),
      };
    default:
      return state;
  }
};

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, {
    paragraphs: [
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
    ],
  });

  const addParagraph = () => {
    const newId = state.paragraphs.length + 1;
    const newParagraph: Paragraph = {
      id: newId,
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: "ADD_PARAGRAPH", payload: newParagraph });
  };

  const updateParagraphContent = (id: number, content: string) => {
    dispatch({
      type: "UPDATE_PARAGRAPH_CONTENT",
      payload: { id, content, updatedAt: new Date() },
    });
  };

  const contextValue: EditorContextValue = {
    ...state,
    addParagraph,
    updateParagraphContent,
  };

  return <EditorContext.Provider value={contextValue}>{children}</EditorContext.Provider>;
};
