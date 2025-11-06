import { motion } from "framer-motion";

function Border() {
  const borderVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-screen h-px">
      {/* Main border line */}
      <motion.div
        className="absolute w-full h-px bg-border"
        style={{ originX: 0 }}
        variants={borderVariants}
        initial="hidden"
        animate="visible"
      />
      {/* Glow effect during draw */}
      <motion.div
        className="absolute w-full h-[3px] -top-[1px] bg-gradient-to-r from-transparent via-foreground/50 to-transparent"
        style={{ originX: 0 }}
        variants={borderVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute right-0 w-32 h-full bg-gradient-to-l from-foreground/80 to-transparent blur-sm"
          variants={glowVariants}
          initial="hidden"
          animate="visible"
        />
      </motion.div>
    </div>
  );
}

export default Border;
