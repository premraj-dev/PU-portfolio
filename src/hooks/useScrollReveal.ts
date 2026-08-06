import { useRef, useState, useEffect } from 'react';

export function useScrollReveal(threshold = 0.15) 
{
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return { ref, isVisible };
}