import { useEffect, useRef } from 'react';

const VideoComponent = ({ actualSong }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {});
      }
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.play();
    }
  }, [actualSong]);

  return (
    <video ref={videoRef} autoPlay loop style={{ display: "none" }}>
      <source src={`/${actualSong}.mp4`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoComponent;
