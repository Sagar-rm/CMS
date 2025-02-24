const useAnimatedEntry = (delay = 0) => {
    return {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
    };
  };
  
  export default useAnimatedEntry;