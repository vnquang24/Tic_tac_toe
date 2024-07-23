import { useState } from "react";
import HumanModeApp from "./humanMode.js"; 
import BotModeApp from "./botMode.js";
import logo from "./logo.png";
function App() {
    const [mode, setMode] = useState("");

    const chooseMode = (selectedMode) => {
        setMode(selectedMode);
    };

    // Render dựa trên chế độ đã chọn
    if (mode === "human") {
        return <HumanModeApp />;
    } else if (mode === "bot") {
        return <BotModeApp />;
    }

    // Màn hình lựa chọn chế độ nếu chưa chọn chế độ
    return (
        <div className="mainSelect">
            <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
          <p>
          TIC TAC TOE
           </p>
           </header>
            <div className="selectMode">Mode Select</div>
            <button onClick={() => chooseMode("human")} className="bt">Chơi với người</button>
            <button onClick={() => chooseMode("bot")} className="bt">Chơi với máy</button>
        </div>
    );
}

export default App;