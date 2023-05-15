import { memo, useState } from "react";
import { Listbox } from "@headlessui/react";
import Select, { Option } from "../../components/Select";
import { useEditorContext } from "./useEditorContext";

const fontSizes: Option[] = [
  { id: 1, name: "小", value: "text-xs" },
  { id: 2, name: "中", value: "text-base" },
  { id: 3, name: "大", value: "text-lg" },
];

const colors: Option[] = [
  { id: 1, name: "黑色", value: "black" },
  { id: 2, name: "红色", value: "red" },
  { id: 3, name: "蓝色", value: "blue" },
];

function Toolbar() {
  const [selectedFontSize, setSelectedFontSize] = useState(fontSizes[1]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  // const { dispatch } = useEditorContext();
  console.log("toolbar");
  return (
    <div
      className="flex items-center space-x-4 bg-gray-200 p-2 rounded-md shadow-md editor-toolbar"
      onBlur={() => {
        // dispatch({ type: "SET_ACTIVE_PARAGRAPH", payload: -1 });
      }}
      tabIndex={-1}
      onFocus={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
      }}
    >
      <span className="font-medium text-gray-700">字号：</span>
      <Select options={fontSizes} value={selectedFontSize} onChange={setSelectedFontSize}></Select>

      <span className="font-medium text-gray-700">颜色：</span>
      <Select options={colors} value={selectedColor} onChange={setSelectedColor}></Select>
    </div>
  );
}

export default memo(Toolbar);
