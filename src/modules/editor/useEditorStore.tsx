import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "../../utils/createSelectors";
interface Paragraph {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

type EditorState = {
  paragraphs: Paragraph[];
  activeParagraphId: number;
};
type EditorActions = {
  setActiveParagraphId: (id: number) => void;
  setParagraphsByIndex: (index: number, newParagraph: Partial<Paragraph>) => void;
  setParagraphsContentByIndex: (index: number, content: string) => void;
};
const initialState: EditorState = {
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
    {
      id: 3,
      content: "这是第三段。",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      content: "这是第四段。",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  activeParagraphId: -1,
};
const useEditorStore = create(
  immer<EditorState & EditorActions>((set) => ({
    ...initialState,
    setActiveParagraphId: (id) => {
      set({ activeParagraphId: id });
    },

    setParagraphsByIndex: (index, newParagraph) => {
      set((state) => {
        const { paragraphs } = state;
        if (index >= 0 && index < paragraphs.length) {
          paragraphs[index] = Object.assign(paragraphs[index], newParagraph);
        }
      });
    },
    setParagraphsContentByIndex: (index, content) => {
      set((state) => {
        console.log(index, content);
        const { paragraphs } = state;
        if (index >= 0 && index < paragraphs.length) {
          paragraphs[index].content = content;
        }
      });
    },
  }))
);

export default createSelectors(useEditorStore);
