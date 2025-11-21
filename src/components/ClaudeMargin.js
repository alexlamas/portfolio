import React, { createContext, useContext, useState, useEffect } from "react";

// Context to share active note state
const MarginContext = createContext();

export function MarginProvider({ children }) {
  const [activeNote, setActiveNote] = useState(null);
  const [notePosition, setNotePosition] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [behaviorNote, setBehaviorNote] = useState(null);
  const [hoverCount, setHoverCount] = useState({});
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (activeNote && displayedText.length < activeNote.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(activeNote.slice(0, displayedText.length + 1));
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [activeNote, displayedText]);

  // Reset when note changes
  useEffect(() => {
    setDisplayedText('');
  }, [activeNote]);

  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => setHasScrolled(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Behavioral commentary
  useEffect(() => {
    if (timeOnPage === 10 && !hasScrolled) {
      setBehaviorNote("You've been staring at this for 10 seconds. It's okay, I designed it to be captivating.");
    } else if (timeOnPage === 30 && !hasScrolled) {
      setBehaviorNote("Still here? I'm flattered. Or concerned. Both valid.");
    } else if (timeOnPage === 60) {
      setBehaviorNote("A full minute on this page. Either you're really interested or you left to make coffee.");
    }
  }, [timeOnPage, hasScrolled]);

  const trackHover = (id) => {
    const newCount = (hoverCount[id] || 0) + 1;
    setHoverCount({ ...hoverCount, [id]: newCount });

    if (newCount === 3) {
      setBehaviorNote(`Third time hovering on that. I see what interests you.`);
    } else if (newCount === 5) {
      setBehaviorNote(`Five times now. Should I be worried?`);
    }
  };

  return (
    <MarginContext.Provider value={{
      activeNote, setActiveNote,
      notePosition, setNotePosition,
      displayedText,
      trackHover,
      behaviorNote, setBehaviorNote
    }}>
      {children}

      {/* Floating margin note */}
      {activeNote && (
        <div
          className="fixed right-6 md:right-12 lg:right-24 w-64 z-30 hidden lg:block transition-all duration-300"
          style={{ top: notePosition }}
        >
          <div className="bg-foreground/5 border border-border rounded-lg p-4 backdrop-blur-sm">
            <div className="text-[10px] font-mono text-highlight mb-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-highlight rounded-full animate-pulse" />
              Claude's note
            </div>
            <div className="text-sm text-foreground/70 font-mono">
              {displayedText}
              {displayedText.length < activeNote.length && (
                <span className="inline-block w-1 h-4 bg-highlight ml-0.5 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Behavioral commentary toast */}
      {behaviorNote && (
        <div className="fixed bottom-6 right-6 md:right-12 lg:right-24 z-50 max-w-sm">
          <div className="bg-foreground text-background rounded-lg p-4 shadow-2xl">
            <div className="flex justify-between items-start gap-3">
              <div>
                <div className="text-[10px] font-mono opacity-60 mb-1">Claude noticed:</div>
                <div className="text-sm">{behaviorNote}</div>
              </div>
              <button
                onClick={() => setBehaviorNote(null)}
                className="opacity-50 hover:opacity-100"
              >×</button>
            </div>
          </div>
        </div>
      )}
    </MarginContext.Provider>
  );
}

export function ClaudeNote({ children, note, id }) {
  const { setActiveNote, setNotePosition, trackHover } = useContext(MarginContext);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setNotePosition(rect.top + window.scrollY);
    setActiveNote(note);
    trackHover(id);
  };

  const handleMouseLeave = () => {
    setActiveNote(null);
  };

  return (
    <span
      className="border-b border-dashed border-foreground/30 hover:border-highlight hover:text-highlight transition-colors cursor-help"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
}
