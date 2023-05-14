import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface Props {
  message: string;
    node: React.RefObject<any>;
    children:React.ReactNode
}

const Pop: FC<Props> = ({ message, node,children }) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    let newPortalRoot = document.getElementById("portal-root");
    if (!newPortalRoot) {
      newPortalRoot = document.createElement("div");
      newPortalRoot.id = "portal-root";
      document.body.appendChild(newPortalRoot);
    }
    setPortalRoot(newPortalRoot);

    // 获取 ref 元素的位置信息并更新 position 状态
    if (node && node.current) {
      const rect = node.current.getBoundingClientRect();
      console.log(rect);
      setPosition({ top: rect.top - 70, left: rect.left });
    }
  }, [node]);

  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div style={{ position: "absolute", top: position.top, left: position.left }}>
          {children}
    </div>,
    portalRoot
  );
};

export default Pop;
