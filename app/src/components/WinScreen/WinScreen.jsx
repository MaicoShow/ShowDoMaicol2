import { useState } from "react";
import VideoComponent from "../VideoComponent/VideoComponent";

import './WinScreen.css';

export default function WinScreen() {
    const [ win, setWin ] = useState(false);

    setTimeout(() => {
        setWin(true);
    }, [28000]);

    return <main className={`win ${win ? 'win-bg' : ''}`}>
        {win && <h1 className="win-text">PARABENS MAICO!</h1>}
        <VideoComponent actualSong={'win'}/>
    </main>
}