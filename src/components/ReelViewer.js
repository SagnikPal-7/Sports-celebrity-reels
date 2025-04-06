'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './ReelViewer.module.css';

export default function ReelViewer({ initialReels = [] }) {
  const [reels] = useState(initialReels);
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle video play/pause on scroll
  useEffect(() => {
    const handleScroll = () => {
      const newIndex = Math.round(window.scrollY / window.innerHeight);
      if (newIndex !== currentIndex) {
        videoRefs.current[currentIndex]?.pause();
        videoRefs.current[newIndex]?.play().catch(e => console.log(e));
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);

  return (
    <div className={styles.reelContainer}>
      {reels.map((reel, index) => (
        <div key={reel.id} className={styles.reel}>
          {/* Video placeholder - replace with actual video element */}
          <div className={styles.videoPlaceholder}>
            <h2>{reel.celebrity}</h2>
            <p>{reel.stats}</p>
          </div>
          
          <div className={styles.overlay}>
            <h3>{reel.celebrity}</h3>
            <p>{reel.script}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
