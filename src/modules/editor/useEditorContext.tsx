import { P } from "@tauri-apps/api/event-30ea0228";
import { createContext, useContext, useMemo, useReducer, memo } from "react";
import { pick, shallowEqual } from "../../utils/object";

interface Paragraph {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

type State = {
  paragraphs: Paragraph[];
  activeParagraphId: number;
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
    }
  | {
      type: "SET_ACTIVE_PARAGRAPH";
      payload: number;
    }
  | {
      type: "SET_PARAGRAPH";
      payload: Paragraph;
    };

interface EditorContextValue extends State {
  addParagraph: () => void;
  updateParagraphContent: (id: number, content: string) => void;
  dispatch: React.Dispatch<Action>;
}

const EditorContext = createContext<EditorContextValue>({
  paragraphs: [],
  addParagraph: () => {},
  updateParagraphContent: () => {},
  activeParagraphId: -1,
  dispatch: () => {},
});
type u = keyof EditorContextValue;
type i = u[];
type s = i[number];
type p = Pick<EditorContextValue, s>;
export const useEditorContext = () => useContext(EditorContext);
type PickEditorContextKeys = (keyof EditorContextValue)[];

type PickEditorContextFn<T, U> = (context: EditorContextValue & T) => U;

type PickEditorContextArgs<T, U> = PickEditorContextKeys | PickEditorContextFn<T, U>;

export function pickEditorContext<T, U>(keys: PickEditorContextArgs<T, U>): (Component: React.FC<T>) => (props: any) => JSX.Element {
  return (Component) => (props: any) => {
    const context = useEditorContext();
    // if keys is a function, call it with context
    // otherwise, use it as keys to pick from context
    const newProps = { ...context, ...props };
    let pickedContext;
    if (typeof keys === "function") {
      pickedContext = keys(newProps);
    } else {
      pickedContext = pick(context, keys);
    }
    // console.log("pcikor", pickedContext);
    const MemorizedComponent = useMemo(
      () =>
        memo(Component, (prevProps, nextProps) => {
          const isShallowEqual = shallowEqual(prevProps, nextProps);
          // console.log("memo", prevProps, nextProps, isShallowEqual);
          return isShallowEqual;
        }),
      []
    );
    return <MemorizedComponent {...props} {...pickedContext}></MemorizedComponent>;
  };
}
const editorReducer = (state: State, action: Action): State => {
  console.log("=======", action);
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
    case "SET_ACTIVE_PARAGRAPH":
      return {
        ...state,
        activeParagraphId: action.payload,
      };
    case "SET_PARAGRAPH": {
      const index = state.paragraphs.findIndex((p) => p.id === action.payload.id);

      return {
        ...state,
        paragraphs: Object.assign(state.paragraphs, { [index]: action.payload }),
      };
    }

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
    activeParagraphId: -1,
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

  return (
    <EditorContext.Provider
      value={{
        ...state,
        addParagraph,
        updateParagraphContent,
        dispatch,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
