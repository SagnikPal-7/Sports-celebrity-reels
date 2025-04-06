"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ReelViewer.module.css";

export default function ReelViewer({ initialReels = [] }) {
  const [reels, setReels] = useState(initialReels);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  // Handle scroll/swipe between reels
  const handleScroll = (e) => {
    const { scrollTop, clientHeight } = e.target;
    const newIndex = Math.round(scrollTop / clientHeight);

    if (newIndex !== currentIndex) {
      // Pause previous video
      if (videoRefs.current[currentIndex]) {
        videoRefs.current[currentIndex].pause();
      }

      // Play new video
      if (videoRefs.current[newIndex]) {
        videoRefs.current[newIndex].currentTime = 0;
        videoRefs.current[newIndex]
          .play()
          .catch((e) => console.log("Autoplay prevented:", e));
      }

      setCurrentIndex(newIndex);
    }
  };

  // Auto-play first video on load
  useEffect(() => {
    if (videoRefs.current[0]) {
      videoRefs.current[0]
        .play()
        .catch((e) => console.log("Autoplay prevented:", e));
    }
  }, []);

  return (
    <div className={styles.reelContainer} onScroll={handleScroll}>
      {reels.map((reel, index) => (
        <div key={reel.id} className={styles.reel}>
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            className={styles.video}
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={reel.videoUrl} type="video/mp4" />
          </video>

          <div className={styles.overlay}>
            <h3>{reel.celebrity}</h3>
            <p>{reel.script}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
