import VideoComponent from "../VideoComponent/VideoComponent";

import { useEffect, useState } from "react";

import "./FakeQuestion.css"

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomInt(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function QuestionAnswer({
    number,
    answerText,
    setQuestion,
    setJumpscare,
    setActualSong,
    setScare
}) {
    const [ isClickedAnswer, setClickedAnswer ] = useState(false);
    const [ isRightAnswer, setRightAnswer ] = useState(false);

    return <p className={`answer-wrapper ${isClickedAnswer ? 'clicked-answer' : ''} ${isRightAnswer ? 'right-answer' : ''}`} onClick={() => {
        setClickedAnswer(true);
        setActualSong(1);
        
        const time = getRandomInt(3, 9);
        setTimeout(() => {
            setClickedAnswer(false);
            setRightAnswer(true);
            setActualSong(2);

            setTimeout(() => {
                setScare(true);
                setTimeout(() => {
                    setJumpscare(undefined);
                    setQuestion(0);
                }, 14400);
            }, 7500);
        }, time*1000);
    }}>
        <span className="number">{number}</span>
        <span className="answer-text">{answerText}</span>
    </p>
}

export default function FakeQuestion({
    number,
    setQuestion,
    setJumpscare,
    setActualSong
}) {
    const [ helpRequest, setHelpRequest ] = useState(false);

    const [ scare, setScare ] = useState(false);
    const [ scareImg, setScareImg ] = useState(false);

    useEffect(() => {
        if(scare)setTimeout(() => {
            setScareImg(true);
            setActualSong(3);
        }, 500);
    }, [scare]);
    
    const questions = [
        {
            title: 'Quem nasce no ES é?',
            answers: [
                'Espiritense Santista',
                'Espiritense Santoso',
                'Espirito Capixaba',
                'Espirita Capixense'
            ],
            rightContent: '/fake1.jpeg'
        },
        {
            title: 'Na camiseta Gamer Starter Pack não tem?',
            answers: [
                'Monitor',
                'Cadeira gamer',
                'Teclado',
                'Headset'
            ],
            rightContent: '/fake2.jpg'
        }
    ];

    const [ question ] = useState(questions[getRandomInt(0, questions.length-1)]);

    useEffect(() => {
        setActualSong(0)
    }, []);


    return <main className="question-main">
        {helpRequest && <>
            <div className="help-wrapper-fake">
                <VideoComponent actualSong={'gemida'}/>
            </div>
        </>}
        {scare && <div className={`${scareImg ? 'jumpscare' : ''}`}>
            <VideoComponent actualSong={'arroto'}/>
        </div>}
        <span className="question-number">{number}</span>
        <div className="left-content">
            <div className="logo">
                <img src="/logo.jpeg" alt="maicol millian porra, fica suave maicol" />
            </div>
            <div className="question">{question.title}</div>
            <div className="left-data">
                <div className="answers">
                    {question.answers.map((answer, index) =>
                        <QuestionAnswer number={index+1} answerText={answer} 
                        setQuestion={setQuestion} setJumpscare={setJumpscare} setScare={setScare} setActualSong={setActualSong}/>
                    )}
                </div>

                <button className="help" onClick={() => {
                    setHelpRequest(true);
                    setActualSong(3);
                    setTimeout(() => {
                        setHelpRequest(false);
                        setActualSong(0);
                        setJumpscare(undefined);
                        setQuestion(0);
                    }, 6000);
                }}>
                    AJUDA
                </button>
            </div>
            
        </div>
        <div className="right-content">
            <div className="right-background">
                <img src={question.rightContent}/>
            </div>
            <div className="helps"></div>
        </div>
    </main>
}