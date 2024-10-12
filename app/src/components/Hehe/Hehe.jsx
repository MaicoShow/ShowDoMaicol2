import React, { useEffect, useRef, useState } from 'react';
import './Hehe.css';

export default function Hehe({ videoSrc, setJumpscare, setQuestion }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setJumpscare(undefined);
            setQuestion(0);
            document.exitPointerLock();
        }, 15000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [setJumpscare, setQuestion]);

    useEffect(() => {
        if (videoRef.current !== null) {
        const videoElement = videoRef.current;
        videoElement.currentTime = 11;
        }
    }, [videoRef]);

    return (
        <div className="fullscreen-container">
            <video className="center-video" ref={videoRef} src={videoSrc} autoPlay loop />
        </div>
    );
}