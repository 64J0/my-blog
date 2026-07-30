import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

interface ReadingProgressProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ targetRef }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const el = targetRef.current;
      if (!el) return;

      const { top, height } = el.getBoundingClientRect();
      const scrollableDistance = height - window.innerHeight;
      const scrolled = Math.min(Math.max(-top, 0), Math.max(scrollableDistance, 0));

      setProgress(scrollableDistance > 0 ? (scrolled / scrollableDistance) * 100 : 100);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [targetRef]);

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.bar} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ReadingProgress;
