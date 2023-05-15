import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import EditorModule from "./modules/editor";
import SmartEditor from "./modules/smart-editor";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }
  return (
    <div className="container">
    
      {/* <EditorModule></EditorModule> */}
      <SmartEditor></SmartEditor>
    </div>
  );
}

export default App;
