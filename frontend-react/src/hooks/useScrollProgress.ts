import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentAct, setCurrentAct] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Ensure we are in a browser environment
      if (typeof window !== 'undefined') {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0;
        
        setScrollProgress(progress);
        
        // Determine current act based on scroll progress
        if (progress < 0.3) setCurrentAct(1);      // Act 1: Shard Storm
        else if (progress < 0.6) setCurrentAct(2); // Act 2: Crystallization
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set state
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, currentAct };
}