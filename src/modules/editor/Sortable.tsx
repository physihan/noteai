import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface SortableItemProps {
  children: React.ReactNode;
  id: number;
}
export function SortableItem({ children, id }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  console.log("child");
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="group/vis relative pl-10">
      {/* ... */}
      <span {...attributes} {...listeners} className="absolute hidden left-0 group-hover/vis:block cursor">
        <Icon name="drag" className="cursor-move hover:text-red"></Icon>
      </span>
      {children}
    </div>
  );
}
import React, { useEffect, useState } from "react";
import Icon from "../../components/Icon";
import { shallowEqual } from "../../utils/object";

interface SortableListProps {
  children: React.ReactNode;
}
export function SortableList({ children }: SortableListProps) {
  const [items, setItems] = useState(() => {
    return React.Children.toArray(children).map((child, index) => ({ id: child.props.id, child }));
  });
  useEffect(() => {
    setItems((items) => {
      const childMap = React.Children.toArray(children).reduce((acc, child) => {
        acc[child.props.id] = child;
        return acc;
      }, {});
      // return items.map((item) => {
      //   if (shallowEqual(childMap[item.id]?.props, item.child?.props)) {
      //     return item;
      //   }
      //   return { ...item, child: childMap[item.id] };
      // });
      return items.map((item) => {
        return { ...item, child: childMap[item.id] };
      });
    });
  }, [children]);
  console.log(items);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(({ id, child }, index) => {
          console.log(child, index);
          return (
            <SortableItem key={id} id={id}>
              {child}
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const ids = items.map(({ id }) => id);
        const oldIndex = ids.indexOf(active.id);
        const newIndex = ids.indexOf(over.id);
        console.log(oldIndex, newIndex);
        console.log(arrayMove(items, oldIndex, newIndex));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
