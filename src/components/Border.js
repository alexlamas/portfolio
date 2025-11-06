import { motion } from "framer-motion";

function Border() {
  const borderVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 0.4, // Start after vertical lines begin
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="w-screen h-px bg-border"
      style={{ originX: 0 }} // Animate from left
      variants={borderVariants}
      initial="hidden"
      animate="visible"
    />
  );
}

export default Border;
