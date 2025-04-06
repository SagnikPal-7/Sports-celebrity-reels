'use client';
import { useRef, useEffect, useState } from 'react';
import styles from './ReelViewer.module.css';

export default function ReelViewer({ initialReels = [] }) {
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play/pause videos on scroll
  useEffect(() => {
    const handleScroll = () => {
      const newIndex = Math.round(window.scrollY / window.innerHeight);
      if (newIndex !== currentIndex) {
        videoRefs.current[currentIndex]?.pause();
        videoRefs.current[newIndex]?.play().catch(e => console.log("Autoplay prevented:", e));
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);

  return (
    <div className={styles.reelContainer}>
      {initialReels.map((reel, index) => (
        <div key={reel.id} className={styles.reel}>
          {/* Actual Video Player */}
          <video
            ref={el => videoRefs.current[index] = el}
            className={styles.video}
            src={reel.videoUrl}
            loop
            muted
            playsInline
            preload="metadata"
          />

          {/* Overlay with text */}
          <div className={styles.overlay}>
            <h3>{reel.celebrity}</h3>
            <p>{reel.script}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
