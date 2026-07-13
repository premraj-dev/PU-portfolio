import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          // Changed to bg-neutral-950 to ensure visibility on dark mode 
          // If you want a white screen loading screen, use bg-white
          className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              // Changed text color to explicitly white for visibility testing
              className="text-5xl font-heading font-extrabold text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              PU
            </motion.div>
            
            <div className="flex gap-1 md:gap-2">
              {'PREMRAJ UMAP'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="text-sm font-mono text-neutral-400 tracking-widest"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.04, duration: 0.3 }}
                >
                  {/* CRITICAL: Replaces spaces with HTML non-breaking spaces so layout doesn't collapse */}
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
            
            <motion.div
              className="w-48 h-[2px] bg-neutral-800 rounded-full overflow-hidden mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 1.2, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
