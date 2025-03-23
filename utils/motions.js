export function slideInFromLeft(delay) {
    return {
      hidden: { x: -100, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          delay: delay,
          duration: 0.5,
          ease: "easeInOut",
        },
      },
      exit: {
        opacity: 0,
        x: -50,
        transition: { duration: 0.3 },
      },
    };
  }
  
  export function slideInFromRight(delay) {
    return {
      hidden: { x: 100, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          delay: delay,
          duration: 0.5,
          ease: "easeInOut",
        },
      },
      exit: {
        opacity: 0,
        x: 50,
        transition: { duration: 0.3 },
      },
    };
  }
  
  export const slideInFromTop = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3 },
    },
  };
  
  export const slideInFromBottom = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.3 },
    },
  };
  