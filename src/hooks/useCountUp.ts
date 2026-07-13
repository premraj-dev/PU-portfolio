import { useEffect, useRef, useState } from 'react';

export function useCountUp(targetValue: number, duration: number, shouldStart: boolean) {
  const [count, setCount] = useState(0);
  const startValueRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldStart) {
      setCount(0);
      startValueRef.current = 0;
      startTimeRef.current = null;
      return;
    }

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const newCount = Math.floor(startValueRef.current + (targetValue - startValueRef.current) * progress);

      setCount(newCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [targetValue, duration, shouldStart]);

  return count;
}
