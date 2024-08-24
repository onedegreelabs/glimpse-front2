'use client';

import { motion } from 'framer-motion';

function HeartLoading({ initialState }: { initialState: boolean }) {
  const icon = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      stroke: initialState ? '#FFEE1A' : '#FFFF',
      opacity: 1,
    },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 18 18"
    >
      <motion.path
        d="M11.666 1.27734C10.9153 1.28902 10.181 1.49858 9.53716 1.88486C8.89336 2.27114 8.3629 2.82046 7.99932 3.47734C7.63575 2.82046 7.10528 2.27114 6.46148 1.88486C5.81768 1.49858 5.08335 1.28902 4.33265 1.27734C3.13595 1.32934 2.00846 1.85285 1.19651 2.7335C0.384561 3.61415 -0.0458459 4.78036 -0.000678848 5.97734C-0.000678848 9.00868 3.18999 12.3193 5.86599 14.564C6.46347 15.0661 7.21889 15.3414 7.99932 15.3414C8.77975 15.3414 9.53518 15.0661 10.1327 14.564C12.8087 12.3193 15.9993 9.00868 15.9993 5.97734C16.0445 4.78036 15.6141 3.61415 14.8021 2.7335C13.9902 1.85285 12.8627 1.32934 11.666 1.27734Z"
        variants={icon}
        initial="hidden"
        animate="visible"
        transition={{
          default: {
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
        fill="none"
        strokeWidth="2"
        transform="translate(1,0)"
      />
    </motion.svg>
  );
}

export default HeartLoading;
