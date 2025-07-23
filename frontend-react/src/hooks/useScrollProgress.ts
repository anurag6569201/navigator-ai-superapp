import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentAct, setCurrentAct] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      
      setScrollProgress(progress);
      
      // Determine current act based on scroll progress
      if (progress < 0.2) setCurrentAct(1); // Shard Storm
      else if (progress < 0.5) setCurrentAct(2); // Crystallization  
      else if (progress < 0.8) setCurrentAct(3); // Crystal Features
      else setCurrentAct(4); // Human Flow & CTA
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, currentAct };
}