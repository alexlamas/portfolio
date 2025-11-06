import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NameAnimationShowcase = () => {
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const name = "Alex Lama-Noujaim";
  const altName = "ppmori";

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const animations = [
    {
      name: "Gradient Fill",
      description: "Color gradient sweeps through on hover"
    },
    {
      name: "Morph to PP Mori",
      description: "Letters smoothly transform to 'ppmori' with width transition"
    },
    {
      name: "Glitch Effect",
      description: "Chaotic digital glitch with random offsets"
    },
    {
      name: "Wave Motion",
      description: "Letters wave up and down in sequence"
    },
    {
      name: "3D Flip",
      description: "Letters flip in 3D space"
    },
    {
      name: "Blur to Focus",
      description: "Letters blur sequentially from left to right on hover"
    },
    {
      name: "Explode & Reform",
      description: "Letters scatter and come back together"
    },
    {
      name: "Rainbow Gradient",
      description: "Animated rainbow gradient fills the text"
    },
    {
      name: "Stagger Bounce",
      description: "Letters bounce with elastic spring effect"
    },
    {
      name: "Neon Glow",
      description: "Letters glow with neon effect on hover"
    },
    {
      name: "Magnetic Cursor",
      description: "Letters pull toward your cursor position"
    },
    {
      name: "Scramble Decode",
      description: "Characters scramble to 'ppmori' then back"
    },
    {
      name: "Elastic Stretch",
      description: "Letters stretch like rubber bands toward cursor"
    },
    {
      name: "Spotlight Gradient",
      description: "Gradient spotlight follows your cursor"
    },
    {
      name: "RGB Split",
      description: "Chromatic aberration color split effect"
    },
    {
      name: "Stroke Draw",
      description: "Outline draws and fills on hover"
    },
    {
      name: "Liquid Morph",
      description: "Letters melt and flow organically"
    }
  ];

  // Animation 1: Gradient Fill
  const GradientFill = () => {
    return (
      <div className="relative inline-block">
        <motion.div
          className="text-[7vw] xl:text-[100px] leading-normal relative"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="relative inline-block">
            <span className="relative z-10">{name}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: isHovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {name}
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Animation 2: Morph to PP Mori
  const MorphToPPMori = () => {
    const letters = name.split('');
    const targetLetters = altName.padEnd(letters.length, ' ').split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={{
              scaleX: isHovered && targetLetters[i] !== ' ' ?
                (targetLetters[i].charCodeAt(0) / letter.charCodeAt(0)) : 1,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ originX: 0.5 }}
          >
            <motion.span
              className="inline-block"
              animate={{
                opacity: isHovered && i < altName.length ? 0 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              {letter}
            </motion.span>
            <motion.span
              className="absolute"
              animate={{
                opacity: isHovered && i < altName.length ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
            >
              {targetLetters[i]}
            </motion.span>
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation 3: Glitch Effect
  const GlitchEffect = () => {
    const letters = name.split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block relative"
            animate={isHovered ? {
              x: [0, Math.random() * 10 - 5, Math.random() * -10 + 5, 0],
              y: [0, Math.random() * 10 - 5, Math.random() * -10 + 5, 0],
              textShadow: [
                "0 0 0px rgba(255,0,0,0)",
                "-2px 0 0px rgba(255,0,0,0.7), 2px 0 0px rgba(0,255,255,0.7)",
                "2px 0 0px rgba(255,0,0,0.7), -2px 0 0px rgba(0,255,255,0.7)",
                "0 0 0px rgba(255,0,0,0)"
              ]
            } : {}}
            transition={{
              duration: 0.5,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 0.1,
              delay: i * 0.03
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation 4: Wave Motion
  const WaveMotion = () => {
    const letters = name.split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={isHovered ? {
              y: [0, -20, 0],
            } : { y: 0 }}
            transition={{
              duration: 0.5,
              repeat: isHovered ? Infinity : 0,
              delay: i * 0.05,
              ease: "easeInOut"
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation 5: 3D Flip
  const Flip3D = () => {
    const letters = name.split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: "1000px" }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={isHovered ? {
              rotateX: [0, 360],
            } : { rotateX: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: "easeInOut"
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation 6: Blur to Focus
  const BlurToFocus = () => {
    const letters = name.split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={{
              filter: isHovered ? "blur(8px)" : "blur(0px)",
              opacity: isHovered ? 0.5 : 1
            }}
            transition={{
              duration: 0.4,
              delay: i * 0.03,
              ease: "easeOut"
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation 7: Explode & Reform
  const ExplodeReform = () => {
    const letters = name.split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={isHovered ? {
              x: [(Math.random() - 0.5) * 200],
              y: [(Math.random() - 0.5) * 200],
              rotate: [Math.random() * 360],
              opacity: [0.3],
            } : {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1
            }}
            transition={{
              duration: 0.6,
              delay: i * 0.02,
              ease: "easeInOut"
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation 8: Rainbow Gradient
  const RainbowGradient = () => {
    return (
      <motion.div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
          animate={isHovered ? {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          } : {}}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 100%",
          }}
        >
          {name}
        </motion.div>
      </motion.div>
    );
  };

  // Animation 9: Stagger Bounce
  const StaggerBounce = () => {
    const letters = name.split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={isHovered ? {
              y: [0, -30, 0],
            } : { y: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              type: "spring",
              stiffness: 300,
              damping: 10
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation 10: Neon Glow
  const NeonGlow = () => {
    const letters = name.split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={{
              textShadow: isHovered ? [
                "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(59,130,246,0.8), 0 0 40px rgba(59,130,246,0.8)",
                "0 0 5px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.8), 0 0 15px rgba(59,130,246,0.8), 0 0 20px rgba(59,130,246,0.8)",
                "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(59,130,246,0.8), 0 0 40px rgba(59,130,246,0.8)",
              ] : "0 0 0px rgba(255,255,255,0)",
              color: isHovered ? "#93c5fd" : "#FAFAFA"
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              delay: i * 0.05,
              ease: "easeInOut"
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation 11: Magnetic Cursor
  const MagneticCursor = () => {
    const letters = name.split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block relative"
            animate={isHovered ? {
              x: (mousePosition.x - 500) / (20 + i),
              y: (mousePosition.y - 100) / (20 + i),
            } : {
              x: 0,
              y: 0
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 0.5
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation 12: Scramble Decode
  const ScrambleDecode = () => {
    const letters = name.split('');
    const targetLetters = altName.padEnd(letters.length, ' ').split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={isHovered ? {
              opacity: [1, 0.5, 0.8, 0.3, 1],
            } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          >
            <motion.span
              animate={isHovered ? {
                opacity: [1, 0, 0, 0, 1],
              } : { opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.05
              }}
            >
              {letter}
            </motion.span>
            <motion.span
              className="absolute inset-0"
              animate={isHovered ? {
                opacity: [0, 1, 1, 0, 0],
              } : { opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.05
              }}
            >
              {i < altName.length ? targetLetters[i] : letter}
            </motion.span>
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation 13: Elastic Stretch
  const ElasticStretch = () => {
    const letters = name.split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={isHovered ? {
              scaleX: 1 + (mousePosition.x - 500) / 2000,
              scaleY: 1 + (mousePosition.y - 100) / 1000,
              x: (mousePosition.x - 500) / 30,
            } : {
              scaleX: 1,
              scaleY: 1,
              x: 0
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 12,
              delay: i * 0.01
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation 14: Spotlight Gradient
  const SpotlightGradient = () => {
    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="relative">
          <span className="text-foreground/30">{name}</span>
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-foreground via-foreground to-transparent"
            style={{
              background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, #FAFAFA 0%, rgba(250,250,250,0.6) 40%, transparent 70%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {name}
          </motion.div>
        </div>
      </div>
    );
  };

  // Animation 15: RGB Split
  const RGBSplit = () => {
    const letters = name.split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {letters.map((letter, i) => (
          <span key={i} className="inline-block relative">
            <motion.span
              className="inline-block relative z-10"
              animate={isHovered ? {
                x: [0, -3, 2, 0],
              } : {}}
              transition={{
                duration: 0.3,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 0.2,
                delay: i * 0.03
              }}
            >
              {letter}
            </motion.span>
            <motion.span
              className="absolute inset-0 text-red-500"
              style={{ mixBlendMode: 'screen' }}
              animate={isHovered ? {
                x: [0, -4, 0],
                opacity: [0, 0.7, 0]
              } : { opacity: 0 }}
              transition={{
                duration: 0.3,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 0.2,
                delay: i * 0.03
              }}
            >
              {letter}
            </motion.span>
            <motion.span
              className="absolute inset-0 text-cyan-500"
              style={{ mixBlendMode: 'screen' }}
              animate={isHovered ? {
                x: [0, 4, 0],
                opacity: [0, 0.7, 0]
              } : { opacity: 0 }}
              transition={{
                duration: 0.3,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 0.2,
                delay: i * 0.03
              }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </div>
    );
  };

  // Animation 16: Stroke Draw
  const StrokeDraw = () => {
    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative"
          style={{
            WebkitTextStroke: '2px #FAFAFA',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {name}
          <motion.div
            className="absolute inset-0"
            style={{
              WebkitTextFillColor: '#FAFAFA',
              clipPath: isHovered ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)'
            }}
            animate={{
              clipPath: isHovered ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)'
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            {name}
          </motion.div>
        </motion.div>
      </div>
    );
  };

  // Animation 17: Liquid Morph
  const LiquidMorph = () => {
    const letters = name.split('');

    return (
      <div
        className="text-[7vw] xl:text-[100px] leading-normal inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={isHovered ? {
              scaleY: [1, 1.3, 0.8, 1.1, 1],
              scaleX: [1, 0.8, 1.2, 0.9, 1],
              y: [0, -10, 5, -3, 0],
            } : {
              scaleY: 1,
              scaleX: 1,
              y: 0
            }}
            transition={{
              duration: 1,
              delay: i * 0.05,
              ease: [0.45, 0, 0.55, 1],
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
            style={{
              filter: isHovered ? 'blur(0.5px)' : 'blur(0px)'
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    );
  };

  const animationComponents = [
    GradientFill,
    MorphToPPMori,
    GlitchEffect,
    WaveMotion,
    Flip3D,
    BlurToFocus,
    ExplodeReform,
    RainbowGradient,
    StaggerBounce,
    NeonGlow,
    MagneticCursor,
    ScrambleDecode,
    ElasticStretch,
    SpotlightGradient,
    RGBSplit,
    StrokeDraw,
    LiquidMorph
  ];

  const CurrentAnimationComponent = animationComponents[currentAnimation];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Name Hover Animations</h1>
          <p className="text-foreground/60">Hover over the name to see each effect in action</p>
        </div>

        {/* Animation Display */}
        <div className="mb-16 flex items-center justify-center min-h-[200px] border border-border rounded-lg bg-background/50 p-8">
          <CurrentAnimationComponent />
        </div>

        {/* Animation Info */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">{animations[currentAnimation].name}</h2>
          <p className="text-foreground/60">{animations[currentAnimation].description}</p>
        </div>

        {/* Animation Selector */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {animations.map((animation, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentAnimation(index)}
              className={`p-4 rounded-lg border transition-all ${
                currentAnimation === index
                  ? 'border-foreground bg-foreground/10'
                  : 'border-border hover:border-foreground/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-sm font-semibold mb-1">{animation.name}</div>
              <div className="text-xs text-foreground/60">{index + 1}</div>
            </motion.button>
          ))}
        </div>

        {/* Navigation Hint */}
        <div className="mt-8 text-center text-sm text-foreground/40">
          Click a button to switch animations • Hover over the name to trigger effects
        </div>
      </div>
    </div>
  );
};

export default NameAnimationShowcase;
