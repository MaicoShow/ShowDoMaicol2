import VideoComponent from "../VideoComponent/VideoComponent";

import "./Question.css"

import { useEffect, useRef, useState } from "react"

function getRandomInt(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function QuestionAnswer({
    number,
    questionNumber,
    answerText,
    isCorrect,
    setQuestion,
    setJumpscare,
    setActualSong,
    isImage = false
}) {
    const [ isClickedAnswer, setClickedAnswer ] = useState(false);
    const [ isRightAnswer, setRightAnswer ] = useState(false);

    return <p className={`answer-wrapper ${isClickedAnswer ? 'clicked-answer' : ''} ${isRightAnswer ? 'right-answer' : ''}`} onClick={() => {
        setClickedAnswer(true);
        setActualSong(1);

        const time = getRandomInt(3, 9);
        setTimeout(() => {
            setClickedAnswer(false);
            setActualSong(3);
            if(isCorrect){
                if(questionNumber == 15) {
                    setQuestion(curNumber => curNumber+1);
                } else {
                    setRightAnswer(true);
                    setActualSong(2);
                    setTimeout(() => setQuestion(curNumber => curNumber+1), 8000);
                }
            } else {
                const jumpscareId = getRandomInt(0, 2);
                if(jumpscareId == 1) {
                    setRightAnswer(true);
                    setActualSong(2);
                    setTimeout(() => {
                        setActualSong(0);
                        setRightAnswer(false);
                        setJumpscare(jumpscareId);
                    }, 10000);
                } else if(jumpscareId == 2) {
                    document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;
                    if (document.body.requestPointerLock) {
                        document.body.requestPointerLock();
                    }
                    setJumpscare(jumpscareId);
                } else {
                    setJumpscare(jumpscareId);
                }
            }
        }, time*1000);
    }}>
        <span className="number">{number}</span>
        {isImage 
            ? <span className="answer-text" dangerouslySetInnerHTML={{ __html: answerText }}></span>
            : <span className="answer-text">{answerText}</span>
        }
        
    </p>
}

function ThinkEmoji() {
    const x = getRandomInt(0, 80);
    const y = getRandomInt(0, 80);
    const emojiRand = getRandomInt(1, 9);
    const emojiSoundRand = getRandomInt(1, 3);

    return <>
        <VideoComponent actualSong={`e${emojiSoundRand}`}/>
        <img className="think-emoji" src={`/e${emojiRand}.jpeg`} style={{top: `${x}%`, left: `${y}%`}}/>
    </>
}

export default function Question({
    number,
    question,
    answers,
    rightContent,
    setQuestion,
    setJumpscare,
    actualSong,
    setActualSong
}) {
    const [ helpRequest, setHelpRequest ] = useState(false);
    const [ isThinkAlert, setThinkAlert ] = useState(false);

    useEffect(() => {
        setInterval(() => {
            if(!isThinkAlert) {
                const thinkAlertRand = getRandomInt(0, 5);
                if(thinkAlertRand == 0){ 
                    setThinkAlert(true);
                }
            }
        }, 4000);
    }, []);

    useEffect(() => {
        if(isThinkAlert) setTimeout(() => {
            setThinkAlert(false);
        }, 4000);
    }, [isThinkAlert]);

    useEffect(() => {
        setActualSong(0);
    }, [number]);

    return <main className="question-main">
        {isThinkAlert && <ThinkEmoji/>}
        {helpRequest && <>
            <div className="help-wrapper">
                <VideoComponent actualSong={'sirene'}/>
                <img className="siren" src="siren.gif"/>
            </div>
            <img className="help-ruler" src="help_request.jpeg" />
        </>}
        <span className="question-number">{number}</span>
        <div className="left-content">
            <div className="logo">
                <img src="/logo.jpeg" alt="maicol millian porra, fica suave maicol" />
            </div>
            <div className="question">{question}</div>
            <div className="left-data">
                <div className="answers">
                    {answers.map((answer, index) => number != '15'
                        ?   <QuestionAnswer key={`${number}_${index}`} number={index+1} questionNumber={number} answerText={answer[0]} 
                            isCorrect={answer.length>1 ? answer[1] : false} setQuestion={setQuestion} setJumpscare={setJumpscare} setActualSong={setActualSong}/>
                        :   <QuestionAnswer key={`${number}_${index}`} number={index+1} questionNumber={number} answerText={answer[0]} 
                            isCorrect={answer.length>1 ? answer[1] : false} setQuestion={setQuestion} setJumpscare={setJumpscare} setActualSong={setActualSong} isImage={true}/>
                    )}
                </div>

                <button className="help" onClick={() => {
                    setHelpRequest(true);
                    setActualSong(3);
                    setTimeout(() => {
                        setHelpRequest(false);
                        setActualSong(0);
                    }, 10000);
                }}>
                    AJUDA
                </button>
            </div>
        </div>
        <div className="right-content">
            <div className="right-background" dangerouslySetInnerHTML={{ __html: rightContent }}></div>
            <div className="helps"></div>
        </div>
    </main>
}