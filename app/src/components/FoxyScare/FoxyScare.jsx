import "./FoxyScare.css"

export default function FoxScare({
    setJumpscare,
    setQuestionNumber
}) {
    setTimeout(() => {
        setJumpscare(undefined);
        setQuestionNumber(0);
    }, 2000)
    return <div className="foxy-wrapper">
        <div>
            <video autoPlay loop style={{ display: "none" }}>
                <source src="/foxy_audio.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <br />
            <img 
                src="/foxy_video.gif" 
                style={{ width: '100%', height: 'auto' }} 
            />
        </div>
    </div>
}