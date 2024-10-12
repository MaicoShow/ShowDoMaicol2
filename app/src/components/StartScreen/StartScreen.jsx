import { useEffect, useState } from "react";
import VideoComponent from "../VideoComponent/VideoComponent";
import './StartScreen.css'

export default function StartScreen({
    setQuestionNumber
}) {
    const [ isDancing, setDancing ] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setDancing(true);
        }, 8000);
    }, [])

    return <main className="startscreen">
        <VideoComponent actualSong={'intro'}/>
        <div className="logo-wrapper">
            <img className={`${isDancing ? 'dancer' : ''}`} src="/logo.jpeg"/>
        </div>
        <button className={`playgame-btn ${isDancing ? 'dancer-1' : ''}`} onClick={() => setQuestionNumber(0)}>
            JUGAR
        </button>
    </main>
}