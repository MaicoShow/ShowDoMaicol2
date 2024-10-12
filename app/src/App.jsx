import StartScreen from "./components/StartScreen/StartScreen";
import WinScreen from "./components/WinScreen/WinScreen";

import VideoComponent from "@components/VideoComponent/VideoComponent";

// Questions component
import Question from "@components/Question/Question";

// Jumpscares component
import FoxScare from "@components/FoxyScare/FoxyScare";
import FakeQuestion from "./components/FakeQuestion/FakeQuestion";
import Hehe from "./components/Hehe/Hehe";

import { useEffect, useState } from "react";

import './App.css'

import questions from "./questions.json";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getActualSong(songId) {
    switch(songId) {
        case 0:
            return 'default';
        case 1:
            return 'calculating_answer';
        case 2:
            return 'right_answer';
    }
}

function App() {
    const [ actualSong, setActualSong ] = useState(4);

    const [ questionNumber, setQuestionNumber ] = useState(undefined);
    const [ content, setContent ] = useState(undefined);
    const [ jumpscare, setJumpscare ] = useState(undefined); 

    useEffect(() => {
        if(typeof questionNumber === 'undefined') {
            setContent(<StartScreen setQuestionNumber={setQuestionNumber}/>);
            return;
        }

        if(questionNumber == 15) {
            setContent(<WinScreen/>);
            return;
        }

        const questionContent = questions[questionNumber];
        setContent(
            <Question 
                number={questionNumber+1}
                question={questionContent.title} 
                answers={shuffleArray(questionContent.answers)}
                rightContent={questionContent.rightContent} 
                setQuestion={setQuestionNumber}
                setJumpscare={setJumpscare}
                actualSong={actualSong}
                setActualSong={setActualSong}
            />
        );
    }, [questionNumber]);

    const jumpscares = [
        <FoxScare setJumpscare={setJumpscare} setQuestionNumber={setQuestionNumber}/>,
        <FakeQuestion number={questionNumber+2} setJumpscare={setJumpscare} setQuestion={setQuestionNumber} setActualSong={setActualSong}/>,
        <Hehe videoSrc={"https://2girls1cup.ca/wp-content/uploads/2015/03/2girls1cupvideo.mp4?_=1"} setJumpscare={setJumpscare} setQuestion={setQuestionNumber}/>
    ]
    
    return <>
        {actualSong < 3 && <VideoComponent key={actualSong} actualSong={getActualSong(actualSong)}/>}
        {typeof jumpscare !== 'undefined' && jumpscares[jumpscare]}
        {typeof jumpscare === 'undefined' && content}
    </>;
}

export default App
