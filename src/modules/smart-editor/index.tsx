import { useCallback, useMemo, useState } from "react";
import { createEditor, Transforms, Text, Range } from "slate";
import { Slate, withReact, Editable, ReactEditor, DefaultElement } from "slate-react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import { withNodeId } from "./plugins/withNodeId";
import initialValue from "./initialData";
import HoveringToolbar from "./HoveringToolbar";
import { toPx } from "../../utils/css";
// import { toPx } from "./utils";

import "./styles.css";
import Leaf from "./Leaf";
import handleKeyEvent from "./handleKeyEvent";
const renderLeaf = (props) => {
  return <Leaf {...props} />;
};
export const useEditor = () => useMemo(() => withNodeId(withReact(createEditor())), []);

export default function App() {
  const editor = useEditor();

  const [value, setValue] = useState(initialValue);
  const [activeId, setActiveId] = useState(null);
  const activeElement = editor.children.find((x) => x.id === activeId);

  const handleDragStart = (event) => {
    if (event.active) {
      clearSelection();
      setActiveId(event.active.id);
    }
  };

  const handleDragEnd = (event) => {
    const overId = event.over?.id;
    const overIndex = editor.children.findIndex((x) => x.id === overId);

    if (overId !== activeId && overIndex !== -1) {
      Transforms.moveNodes(editor, {
        at: [],
        match: (node) => node.id === activeId,
        to: [overIndex],
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const clearSelection = () => {
    ReactEditor.blur(editor);
    Transforms.deselect(editor);
    window.getSelection()?.empty();
  };

  const renderElement = useCallback((props) => {
    const isTopLevel = ReactEditor.findPath(editor, props.element).length === 1;

    return isTopLevel ? <SortableElement {...props} renderElement={renderElementContent} /> : renderElementContent(props);
  }, []);

  const items = useMemo(() => editor.children.map((element) => element.id), [editor.children]);

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <HoveringToolbar></HoveringToolbar>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <Editable
            // decorate={([node, path]) => {
            //     console.log(node)
            //   if (editor.selection != null) {
            //     if ( editor.string(editor, [path[0]]) === "" && Range.includes(editor.selection, path) && Range.isCollapsed(editor.selection)) {
            //       return [
            //         {
            //           ...editor.selection,
            //           placeholder: true,
            //         },
            //       ];
            //     }
            //   }
            //   return [{placeholder:true}];
            // }}
            renderElement={renderElement}
            placeholder="Type something"
            renderLeaf={renderLeaf}
            onKeyDown={(e) => handleKeyEvent(e, editor)}
            // renderPlaceholder={({ children, attributes }) => (
            //   <div>
            //     <pre>Use the renderPlaceholder prop to customize rendering of the placeholder</pre>
            //   </div>
            // )}
          />
        </SortableContext>
        {createPortal(<DragOverlay adjustScale={false}>{activeElement && <DragOverlayContent element={activeElement} />}</DragOverlay>, document.body)}
      </DndContext>
    </Slate>
  );
}

const renderElementContent = (props) => {
  const { children } = props;
  const isEmpty = children?.[0].props.text.text === "" && children?.length === 1;

  // console.log(first)
  //   if (isEmpty) return children?.[0]?.props?.renderPlaceholder();
  console.log(props);
  console.log(isEmpty, "=========");
  //   const isEmpty = children.props.node.children[0].text === "" && children.props.node.children.length === 1;
  // return <DefaultElement {...props} >33</DefaultElement>
  if (isEmpty)
    return (
      <p {...props} className={isEmpty ? "selected-empty-element" : ""}>
        {children}
      </p>
    );
  return <DefaultElement {...props} className={isEmpty ? "selected-empty-element" : ""} />;
};

const SortableElement = ({ attributes, element, children, renderElement }) => {
  const sortable = useSortable({ id: element.id });
  console.log(attributes);
  return (
    <div {...attributes}>
      <Sortable sortable={sortable}>
        <button contentEditable={false} {...sortable.listeners}>
          ⠿
        </button>
        <div>{renderElement({ element, children })}</div>
      </Sortable>
    </div>
  );
};

const Sortable = ({ sortable, children }) => {
  return (
    <div
      className="sortable"
      {...sortable.attributes}
      ref={sortable.setNodeRef}
      style={{
        transition: sortable.transition,
        "--translate-y": toPx(sortable.transform?.y),
        pointerEvents: sortable.isSorting ? "none" : undefined,
        opacity: sortable.isDragging ? 0 : 1,
      }}
    >
      {children}
    </div>
  );
};

const DragOverlayContent = ({ element }) => {
  const editor = useEditor();
  const [value] = useState([JSON.parse(JSON.stringify(element))]); // clone

  return (
    <div className="drag-overlay">
      <button>⠿</button>
      <Slate editor={editor} value={value}>
        <Editable readOnly={true} renderElement={renderElementContent} />
      </Slate>
    </div>
  );
};
