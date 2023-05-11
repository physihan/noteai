import React, { useContext, useEffect, useRef, useState } from "react";

type Props = {
  index: number;
  children: React.ReactNode;
};

type SortableContextProps = {
  draggingIndex: number;
  handleDragStart: (index: number) => void;
  handleDragEnter: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnd: () => void;
};

const SortableContext = React.createContext<SortableContextProps>({
  draggingIndex: -1,
  handleDragStart: () => {},
  handleDragEnter: () => {},
  handleDragEnd: () => {},
});

const SortableItem = ({ index, children }: Props) => {
  const { draggingIndex, handleDragStart, handleDragEnter, handleDragEnd } =
    useContext(SortableContext);
  const [isDragging, setIsDragging] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (draggingIndex !== -1 && draggingIndex !== index) {
      const currentItem = itemRef.current;

      if (currentItem) {
        currentItem.classList.add("opacity-50", "-translate-y-1/2");
      }
    } else if (isDragging === false) {
      const currentItem = itemRef.current;

      if (currentItem) {
        currentItem.classList.remove("opacity-50", "-translate-y-1/2");
      }
    }
  }, [draggingIndex, index, isDragging]);

  return (
    <div
      ref={itemRef}
      draggable={true}
      onDragStart={() => {
        setIsDragging(true);
        handleDragStart(index);
      }}
      onDragEnter={(event) => handleDragEnter(event, index)}
      onDragEnd={() => {
        setIsDragging(false);
        handleDragEnd();
      }}
      className={`p-4 border ${
        isDragging && index !== draggingIndex ? "opacity-0 h-0" : ""
      }`}
    >
      {children}
    </div>
  );
};

type SortableListProps = {
  items: string[];
  onUpdateItems: (newItems: string[]) => void;
};

const SortableList = ({ items, onUpdateItems }: SortableListProps) => {
  const [draggingIndex, setDraggingIndex] = useState(-1);

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragEnter = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();

    if (draggingIndex === index) {
      return;
    }


    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    
    const newItems = [...items];
    const [removed] = newItems.splice(draggingIndex, 1);
    newItems.splice(draggingIndex, 0, removed);

    onUpdateItems(newItems);
    setDraggingIndex(-1);
  };

  const contextValue = {
    draggingIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  };

  return (
    <SortableContext.Provider value={contextValue}>
      <div className="divide-y">
        {items.map((text, index) => (
          <SortableItem key={`item-${index}`} index={index}>
            {text}
          </SortableItem>
        ))}
      </div>
    </SortableContext.Provider>
  );
};

const Sortable = {
  List: SortableList,
  Item: SortableItem,
};

export default Sortable;
