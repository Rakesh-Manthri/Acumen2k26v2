import React, { useRef, useState, useEffect } from 'react';

const EVENTS = [
  { id: 1, title: 'Opening Ceremony', subtitle: 'April 16 | 09:00 AM', tag: 'CEREMONY', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { id: 2, title: 'Code Genesis', subtitle: 'April 16 | 12:00 PM', tag: 'TECHNICAL', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80' },
  { id: 3, title: 'Cyber Defense', subtitle: 'April 16 | 10:00 AM', tag: 'SECURITY', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80' },
  { id: 4, title: 'AI Hackathon', subtitle: 'April 16 | 02:00 PM', tag: 'ML / AI', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80' },
  { id: 5, title: 'Webathon', subtitle: 'April 16 | 11:00 AM', tag: 'WEB DEV', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80' },
  { id: 6, title: 'Project Expo', subtitle: 'April 16 | 09:00 AM', tag: 'SHOWCASE', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80' },
  { id: 7, title: 'Paper Presentation', subtitle: 'April 16 | 10:00 AM', tag: 'RESEARCH', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80' },
];

const ALL_EVENTS = [
  { id: 'event-1', title: 'PAPER AND POSTER PRESENTATION', price: '₹100', tag: 'RESEARCH', desc: 'Present cutting-edge research to expert panelists.' },
  { id: 'event-2', title: 'WEBATHON', price: '₹150', tag: 'WEB DEV', desc: 'Build a full-stack app in under 4 hours. Per Team.' },
  { id: 'event-3', title: 'PROJECT EXPO', price: '₹100', tag: 'SHOWCASE', desc: 'Showcase your final-year or innovation project. Per Team.' },
  { id: 'event-4', title: 'PHOTOGRAPHY CHALLENGE', price: '₹50', tag: 'CREATIVE', desc: 'Capture the moment. Best shot wins.' },
  { id: 'event-7', title: 'DIGITAL PING PONG', price: '₹50', tag: 'GAMING', desc: 'Classic game, digital twist. Fast reflexes required.' },
  { id: 'event-8', title: 'SCARY HOUSE', price: '₹50', tag: 'EXPERIENCE', desc: 'Navigate the haunted maze if you dare.' },
  { id: 'event-9', title: 'MINI GOLF', price: '₹50', tag: 'CASUAL', desc: 'Chill, compete, enjoy the course.' },
  { id: 'event-10', title: 'EXTRACTION', price: '₹50', tag: 'PUZZLE', desc: 'Escape room-style challenge. Think fast.' },
  { id: 'event-11', title: 'BINARY BOUNTY HUNT', price: '₹50', tag: 'TECHNICAL', desc: 'Decode. Hunt. Win. A binary puzzle scavenger hunt.' },
  { id: 'event-14', title: 'NERF TAG', price: '₹225', tag: 'ACTION', desc: 'Team-based NERF battle arena. Best team wins.' },
  { id: 'event-15', title: 'AGENTS TALE', price: '₹100', tag: 'STRATEGY', desc: 'Strategic multiplayer scenario game. Team of 2.' },
  { id: 'event-16', title: 'VR ZONE', price: '₹50', tag: 'IMMERSIVE', desc: 'Dive into virtual reality experiences.' },
  { id: 'event-17', title: 'WHISPER CHALLENGE', price: '₹30', tag: 'FUN', desc: 'The classic broken telephone with a tech spin.' },
  { id: 'event-18', title: 'GEO GUESSR', price: '₹50', tag: 'KNOWLEDGE', desc: 'How well do you know the world? Find out.' },
  { id: 'event-19', title: 'PIXEL ART', price: '₹30', tag: 'CREATIVE', desc: 'Create stunning pixel art under time pressure.' },
];

export default function Events() {
  const containerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const startX = useRef(0);
  const prevScrollX = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemWidth = isMobile ? 210 : 360;
  const gap = isMobile ? 130 : 180;

  const animatedScrollX = useRef(0);
  const targetScrollX = useRef(0);

  useEffect(() => {
    let animationFrameId;
    const renderLoop = () => {
      if (!isDraggingRef.current) {
        targetScrollX.current += isMobile ? 0.8 : 1.2;
      }
      animatedScrollX.current += (targetScrollX.current - animatedScrollX.current) * 0.08;
      setScrollX(animatedScrollX.current);
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX);
    prevScrollX.current = targetScrollX.current;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const delta = clientX - startX.current;
    const dragMultiplier = isMobile ? 1.0 : 1.5;
    targetScrollX.current = prevScrollX.current - delta * dragMultiplier;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  return (
    <main style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#0A0A0A',
      overflowX: 'hidden',
      paddingTop: '60px',
    }}>

      {/* ─── Hero ─── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem) 0',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#FFD600',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.5rem',
          }}>[07] // SHOWCASE</span>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#F5F5F0',
            marginBottom: '2rem',
          }}>
            BUILT AT<br />ACUMEN IT.
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#888',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '4rem',
          }}>
            DRAG TO EXPLORE · SCROLL TO CONTINUE
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          style={{
            height: isMobile ? '400px' : '550px',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: isMobile ? 'none' : 'pan-y',
            userSelect: 'none',
          }}
        >
          {EVENTS.map((event, index) => {
            const loopLength = EVENTS.length * gap;
            const targetXPosition = index * gap;
            const rawDistance = animatedScrollX.current - targetXPosition;
            const wrappedDistance = ((rawDistance + loopLength / 2) % loopLength + loopLength) % loopLength - loopLength / 2;

            const normalizedDistance = wrappedDistance / gap;
            const absDist = Math.abs(normalizedDistance);

            const baseSpread = isMobile ? 140 : 280;
            const exponentialShift = baseSpread * Math.log(1 + absDist * 1.5);
            const translateX = Math.sign(normalizedDistance) * -exponentialShift;

            const scale = Math.max(0, 1 - absDist * 0.1 - Math.pow(absDist, 1.4) * 0.1);
            const zIndex = 100 - Math.round(absDist * 10);
            const opacity = absDist >= 2.5 ? Math.max(0, 1 - (absDist - 2.5) * 2) : 1;

            const clipY = Math.min(30, Math.pow(absDist, 1.4) * 7);
            const clipPath = `inset(${clipY}% 0% round 0px)`;

            const brightness = Math.max(0.4, 1 - absDist * 0.3);

            return (
              <div
                key={event.id}
                style={{
                  position: 'absolute',
                  width: `${itemWidth}px`,
                  height: `${itemWidth * 1.3}px`,
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  willChange: 'transform, opacity, clip-path',
                  pointerEvents: isDragging ? 'none' : 'auto',
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  clipPath,
                  overflow: 'hidden',
                  backgroundColor: '#111',
                  border: absDist < 0.5 ? '1px solid #FFD600' : '1px solid #1a1a1a',
                  filter: `brightness(${brightness})`,
                  transition: 'filter 0.3s ease',
                }}>
                  <img
                    src={event.img}
                    alt={event.title}
                    style={{
                      width: '100%',
                      height: '85%',
                      objectFit: 'cover',
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                    draggable={false}
                  />
                  {/* Tag overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: '#FFD600',
                    color: '#000',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '3px 8px',
                    textTransform: 'uppercase',
                  }}>{event.tag}</div>

                  {/* Bottom metadata */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '15%',
                    background: '#0A0A0A',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 1rem',
                    borderTop: '1px solid #1a1a1a',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      color: '#F5F5F0',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                    }}>{event.title}</p>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: '#555',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>{event.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── All Events Grid ─── */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
        borderTop: '1px solid #1a1a1a',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#FFD600',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.5rem',
          }}>[08] // ALL EVENTS</span>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            EVERY EVENT.<br />EVERY CHALLENGE.
          </h2>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#888',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '4rem',
          }}>15 EVENTS. PICK YOUR BATTLES.</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1px',
            background: '#1a1a1a',
            border: '1px solid #1a1a1a',
          }}>
            {ALL_EVENTS.map((event, i) => (
              <div key={event.id} style={{
                background: '#0A0A0A',
                padding: '1.75rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                transition: 'background 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#111'}
              onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: '#FFD600',
                      border: '1px solid #332200',
                      padding: '1px 6px',
                      textTransform: 'uppercase',
                    }}>{event.tag}</span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#F5F5F0',
                    marginBottom: '0.25rem',
                  }}>{event.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: '#555',
                    letterSpacing: '0.02em',
                  }}>{event.desc}</p>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#888',
                  flexShrink: 0,
                  letterSpacing: '0.02em',
                }}>{event.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}