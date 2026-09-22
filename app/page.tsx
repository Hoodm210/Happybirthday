"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  Heart,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  Music2,
  Gift,
  Camera,
  Utensils,
} from "lucide-react";

const CONFIG = {
  herName: "My Beautiful Girl My Baby",
  yourName: "Aaaddooooo",
  birthday: "Happy Birthday My Love",
  togetherSince: "More than two beautiful years",
  song: "/music/our-song.mp3",

  photos: [
    {
      src: "/photos/photo1.jpeg",
      caption: "One of my favorite memories with you.",
    },
    {
      src: "/photos/photo2.jpeg",
      caption: "Somehow, every ordinary day became special.",
    },
    {
      src: "/photos/photo3.jpeg",
      caption: "And there are still so many memories to make.",
    },
    {
      src: "/photos/photo4.jpeg",
      caption: "You + me. Still my favorite combination.",
    },
  ],
};

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        delay: `${(i * 0.67) % 9}s`,
        duration: `${7 + (i % 7)}s`,
        size: `${10 + (i % 5) * 4}px`,
      })),
    []
  );

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="float-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            width: heart.size,
            height: heart.size,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  );
}

function FloatingSparkles() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: `${(i * 29) % 100}%`,
        top: `${(i * 47) % 100}%`,
        delay: `${(i * 0.25) % 5}s`,
      })),
    []
  );

  return (
    <div className="floating-sparkles" aria-hidden="true">
      {sparks.map((spark) => (
        <span
          key={spark.id}
          style={{
            left: spark.left,
            top: spark.top,
            animationDelay: spark.delay,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

function RevealText({ children }: { children: React.ReactNode }) {
  return <div className="reveal-text">{children}</div>;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const [candlesOut, setCandlesOut] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const [dinner, setDinner] = useState<string | null>(null);

  const [noPos, setNoPos] = useState({
    top: 50,
    left: 72,
  });

  const [showPhoto, setShowPhoto] = useState<number | null>(null);
  const [celebrate, setCelebrate] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!started) return;

    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.45;
    audio.loop = true;

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [started]);

  const begin = () => {
    setStarted(true);

    setTimeout(() => {
      document
        .getElementById("birthday")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    setMuted((current) => !current);
  };

  const makeWish = () => {
    setCandlesOut(true);

    setTimeout(() => {
      setCelebrate(true);
    }, 450);

    setTimeout(() => {
      document
        .getElementById("letter")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 4000);
  };

  const moveNo = () => {
    const top = 15 + Math.random() * 70;
    const left = 8 + Math.random() * 84;

    setNoPos({
      top,
      left,
    });
  };

  const chooseDinner = (choice: string) => {
    setDinner(choice);

    setTimeout(() => {
      document
        .getElementById("ending")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  return (
    <main>
      {/* MUSIC */}
      <audio
        ref={audioRef}
        src={CONFIG.song}
        muted={muted}
        preload="auto"
      />

      {/* =====================================================
          INTRO
      ===================================================== */}

      {!started && (
        <section className="intro-screen">
          <FloatingHearts />
          <FloatingSparkles />

          <div className="stars" />

          <div className="intro-content">
            <div className="tiny-label">
              <Sparkles size={14} />
              A little something for you
            </div>

            <h1>
              Before you
              <br />
              scroll...
            </h1>

            <p>
              I made this little corner of the internet
              <br />
              just for you.
            </p>

            <button className="gold-button" onClick={begin}>
              Open Your Surprise
              <Heart size={18} fill="currentColor" />
            </button>

            <span className="hint">
              <Music2 size={12} />
              Turn your volume up a little
            </span>
          </div>
        </section>
      )}

      {started && (
        <>
          {/* =====================================================
              MUSIC CONTROLS
          ===================================================== */}

          <button
            className="music-control"
            onClick={toggleMusic}
            aria-label="Toggle music"
          >
            {playing ? <Pause size={17} /> : <Play size={17} />}

            <span>
              {playing ? "Our song" : "Play our song"}
            </span>
          </button>

          <button
            className="mute-control"
            onClick={toggleMute}
            aria-label="Mute music"
          >
            {muted ? (
              <VolumeX size={17} />
            ) : (
              <Volume2 size={17} />
            )}
          </button>

          {/* =====================================================
              HERO
          ===================================================== */}

          <section className="hero section" id="birthday">
            <FloatingHearts />
            <FloatingSparkles />

            <div className="hero-glow" />

            <div className="hero-content">
              <div className="tiny-label">
                <Heart size={13} fill="currentColor" />
                Made especially for you
              </div>

              <h1>
                Happy Birthday,
                <br />

                <span>{CONFIG.herName}</span>

                <br />

                <small>❤️</small>
              </h1>

              <p className="hero-sub">
                If I could wrap up every beautiful memory
                we&apos;ve made and give it to you,
                <br />
                this is what it would look like.
              </p>
            </div>

            <button
              className="scroll-cue"
              onClick={() =>
                document
                  .getElementById("story")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>Keep going</span>
              <ChevronDown size={18} />
            </button>
          </section>

          {/* =====================================================
              OUR STORY
          ===================================================== */}

          <section className="section story" id="story">
            <FloatingSparkles />

            <div className="section-inner narrow">
              <div className="tiny-label">
                <Heart size={13} fill="currentColor" />
                A little look back
              </div>

              <h2>
                More than two years
                <br />
                of <em>us.</em>
              </h2>

              <RevealText>
                <p>
                  More than two years, countless conversations,
                  random laughs, little arguments, unforgettable
                  days and a thousand moments that somehow became ours.
                </p>

                <p>
                  Through all of it, the one thing that still feels
                  incredibly easy is choosing you.
                </p>

                <p>
                  I don&apos;t know exactly what the next chapters
                  will look like, but I know who I want beside me
                  while we write them.
                </p>
              </RevealText>

              <div className="timeline">
                <div>
                  <span>01</span>

                  <strong>The beginning</strong>

                  <p>
                    Two people.
                    <br />
                    One story beginning.
                  </p>
                </div>

                <div>
                  <span>02</span>

                  <strong>The memories</strong>

                  <p>
                    Days that became stories
                    <br />
                    we still talk about.
                  </p>
                </div>

                <div>
                  <span>03</span>

                  <strong>Right now</strong>

                  <p>
                    Still here.
                    <br />
                    Still smiling.
                    <br />
                    Still us.
                  </p>
                </div>

                <div>
                  <span>04</span>

                  <strong>What&apos;s next</strong>

                  <p>
                    Hopefully a lot more
                    <br />
                    birthdays together.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              PHOTO GALLERY
          ===================================================== */}

          <section className="section memories" id="memories">
            <div className="section-inner">
              <div className="tiny-label">
                <Camera size={13} />
                Our little gallery
              </div>

              <h2>
                Some moments I&apos;d
                <br />
                keep forever.
              </h2>

              <div className="photo-grid">
                {CONFIG.photos.map((photo, index) => (
                  <figure
                    className={`photo-card card-${index + 1}`}
                    key={photo.src}
                    onClick={() => setShowPhoto(index)}
                  >
                    <div className="photo-image-wrap">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                      />

                      <div className="photo-overlay">
                        <Heart
                          size={24}
                          fill="currentColor"
                        />
                      </div>
                    </div>

                    <figcaption>
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>

              <p className="photo-note">
                Click a memory to make it bigger. ❤️
              </p>
            </div>
          </section>

          {/* =====================================================
              FULL SCREEN PHOTO
          ===================================================== */}

          {showPhoto !== null && (
            <div
              className="photo-lightbox"
              onClick={() => setShowPhoto(null)}
            >
              <button
                className="close-lightbox"
                onClick={() => setShowPhoto(null)}
              >
                ×
              </button>

              <div
                className="lightbox-content"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={CONFIG.photos[showPhoto].src}
                  alt={CONFIG.photos[showPhoto].caption}
                />

                <p>
                  {CONFIG.photos[showPhoto].caption}
                </p>
              </div>
            </div>
          )}

          {/* =====================================================
              IMPRESSIVE CAKE
          ===================================================== */}

          <section className="section cake-section" id="cake">
            <FloatingSparkles />

            <div className="cake-stars" />

            <div className="section-inner narrow cake-content">
              <div className="tiny-label">
                <Gift size={14} />
                Your birthday moment
              </div>

              <h2>
                Make a wish,
                <br />
                <em>beautiful.</em> ✨
              </h2>

              <p className="cake-intro">
                Close your eyes for a second.
                <br />
                Think of something you&apos;ve always wished for.
              </p>

              {/* =================================================
                  CAKE
              ================================================= */}

              <div
                className={`luxury-cake ${
                  candlesOut ? "cake-blown" : ""
                }`}
              >
                {/* Warm candlelight */}
                <div className="cake-aura" />

                {/* Floating sparks */}
                <div className="candle-sparks">
                  {Array.from({ length: 18 }).map(
                    (_, index) => (
                      <span
                        key={index}
                        style={
                          {
                            "--i": index,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                </div>

                {/* =================================================
                    CANDLES
                ================================================= */}

                <div className="luxury-candles">
                  {[
                    {
                      color: "rose",
                      height: 72,
                    },
                    {
                      color: "gold",
                      height: 88,
                    },
                    {
                      color: "rose",
                      height: 78,
                    },
                    {
                      color: "gold",
                      height: 96,
                    },
                    {
                      color: "rose",
                      height: 78,
                    },
                    {
                      color: "gold",
                      height: 88,
                    },
                    {
                      color: "rose",
                      height: 72,
                    },
                  ].map((candle, index) => (
                    <div
                      className={`luxury-candle ${candle.color}`}
                      key={index}
                      style={
                        {
                          "--candle-height": `${candle.height}px`,
                        } as React.CSSProperties
                      }
                    >
                      <div className="candle-stripe" />

                      {!candlesOut && (
                        <>
                          <div className="flame-outer" />
                          <div className="flame-inner" />
                          <div className="flame-glow" />
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* =================================================
                    CAKE TOP
                ================================================= */}

                <div className="cake-top-layer">
                  <div className="icing-drip drip-1" />
                  <div className="icing-drip drip-2" />
                  <div className="icing-drip drip-3" />
                  <div className="icing-drip drip-4" />
                  <div className="icing-drip drip-5" />

                  <div className="cake-decoration">
                    <span>✦</span>
                    <span>♡</span>
                    <span>✦</span>
                  </div>
                </div>

                {/* =================================================
                    MAIN CAKE
                ================================================= */}

                <div className="cake-body">
                  <div className="cake-ribbon">
                    <span>HAPPY</span>
                    <span>BIRTHDAY</span>
                  </div>

                  <div className="cake-ornament left">
                    ❦
                  </div>

                  <div className="cake-ornament right">
                    ❦
                  </div>
                </div>

                {/* =================================================
                    LOWER CAKE
                ================================================= */}

                <div className="cake-lower">
                  <div className="lower-icing" />

                  <div className="lower-decoration">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                  </div>
                </div>

                {/* =================================================
                    PLATE
                ================================================= */}

                <div className="luxury-plate">
                  <div className="plate-ring" />
                  <div className="plate-shine" />
                </div>
              </div>

              {/* =================================================
                  WISH BUTTON
              ================================================= */}

              {!candlesOut ? (
                <>
                  <button
                    className="wish-button"
                    onClick={makeWish}
                  >
                    <span className="wish-icon">
                      ✨
                    </span>

                    Make a Wish

                    <span className="wish-icon">
                      ✨
                    </span>
                  </button>

                  <p className="blow-hint">
                    Click when you&apos;re ready to blow
                    out the candles
                  </p>
                </>
              ) : (
                <div className="wish-complete">
                  {celebrate && (
                    <div className="wish-confetti">
                      {Array.from({
                        length: 40,
                      }).map((_, index) => (
                        <span
                          key={index}
                          style={
                            {
                              "--i": index,
                            } as React.CSSProperties
                          }
                        />
                      ))}
                    </div>
                  )}

                  <div className="wish-check">
                    <Heart
                      size={25}
                      fill="currentColor"
                    />
                  </div>

                  <h3>Wish made. ❤️</h3>

                  <p>
                    And I hope this year brings you
                    every beautiful thing your heart
                    could possibly wish for.
                  </p>

                  <span className="wish-small">
                    Now... I have something else to ask you.
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* =====================================================
              LOVE LETTER
          ===================================================== */}

          <section
            className="section letter"
            id="letter"
          >
            <div className="letter-card">
              <div className="letter-decoration">
                ♡
              </div>

              <div className="tiny-label">
                <Heart size={13} fill="currentColor" />
                From my heart
              </div>

              <h2>
                For you,
                <br />
                on your birthday
              </h2>

              <div className="letter-body">
                <p>My love,</p>

                <p>
                  Happy birthday to one of the most
                  special people in my life.
                </p>

                <p>
                  More than two years have passed,
                  and somehow I still catch myself
                  smiling because of you.
                </p>

                <p>
                  Thank you for the laughter, the
                  patience, the little things, the
                  memories, and for simply being you.
                </p>

                <p>
                  I hope this year brings you everything
                  you quietly wish for and a thousand
                  reasons to smile.
                </p>

                <p>
                  And selfishly, I hope I get to be
                  there for a lot of those moments.
                </p>

                <p>
                  Today is your birthday, but I feel
                  lucky too — because I get to celebrate
                  you.
                </p>

                <p>
                  And after everything we&apos;ve been
                  through together, there&apos;s still
                  one thing I want to ask you...
                </p>

                <p className="signature">
                  Always yours,
                  <br />
                  <strong>
                    {CONFIG.yourName}
                  </strong>{" "}
                  ❤️
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              QUESTION
          ===================================================== */}

          <section
            className="section question-section"
            id="question"
          >
            <FloatingHearts />
            <FloatingSparkles />

            <div className="section-inner narrow question-card">
              {!saidYes ? (
                <>
                  <div className="question-icon">
                    <Heart
                      size={25}
                      fill="currentColor"
                    />
                  </div>

                  <div className="tiny-label">
                    One tiny question
                  </div>

                  <h2>
                    After everything
                    <br />
                    we&apos;ve shared...
                  </h2>

                  <p className="question-main">
                    Do you want to continue
                    <br />
                    dating me? ❤️
                  </p>

                  <p className="question-sub">
                    Think carefully.
                    <br />
                    This answer may result in dinner.
                  </p>

                  <div className="answer-area">
                    <button
                      className="yes-button"
                      onClick={() =>
                        setSaidYes(true)
                      }
                    >
                      YES ❤️
                    </button>

                    <button
                      className="no-button"
                      style={{
                        top: `${noPos.top}%`,
                        left: `${noPos.left}%`,
                      }}
                      onMouseEnter={moveNo}
                      onPointerDown={(event) => {
                        event.preventDefault();
                        moveNo();
                      }}
                      onFocus={moveNo}
                      onTouchStart={(event) => {
                        event.preventDefault();
                        moveNo();
                      }}
                    >
                      NO 🙈
                    </button>
                  </div>

                  <span className="tiny-note">
                    P.S. The second button is feeling
                    a little shy.
                  </span>
                </>
              ) : (
                <>
                  <div className="success-heart">
                    <Heart
                      size={52}
                      fill="currentColor"
                    />
                  </div>

                  <div className="tiny-label">
                    I had a feeling ❤️
                  </div>

                  <h2>
                    Then I have
                    <br />
                    one more question...
                  </h2>

                  <p className="question-main">
                    Would you like to go somewhere
                    <br />
                    nice for dinner with me?
                  </p>

                  <div className="dinner-options">
                    {[
                      {
                        text: "Romantic Dinner 🍷",
                        icon: <Utensils size={15} />,
                      },
                      {
                        text: "Rooftop Dinner 🌃",
                        icon: <Sparkles size={15} />,
                      },
                      {
                        text: "Surprise Date 🌹",
                        icon: <Heart size={15} />,
                      },
                      {
                        text: "You Choose ✨",
                        icon: <Gift size={15} />,
                      },
                    ].map((choice) => (
                      <button
                        key={choice.text}
                        onClick={() =>
                          chooseDinner(choice.text)
                        }
                        className={
                          dinner === choice.text
                            ? "selected"
                            : ""
                        }
                      >
                        {choice.icon}
                        {choice.text}
                      </button>
                    ))}
                  </div>

                  {dinner && (
                    <div className="selected-message">
                      Perfect.
                      <br />
                      It&apos;s a date. ❤️
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* =====================================================
              FINAL
          ===================================================== */}

          <section
            className="section ending"
            id="ending"
          >
            <FloatingHearts />
            <FloatingSparkles />

            <div className="hero-glow" />

            <div className="section-inner narrow">
              <div className="tiny-label">
                <Sparkles size={14} />
                One last thing
              </div>

              <h2>
                Here&apos;s to another
                <br />
                year of <em>us.</em>
              </h2>

              {dinner && (
                <p className="final-dinner">
                  <span>Your birthday date:</span>
                  <strong>{dinner}</strong>
                </p>
              )}

              <p className="final-message">
                Happy birthday, beautiful.
              </p>

              <p className="final-message">
                Whatever comes next, I hope we keep
                laughing, exploring, annoying each
                other, celebrating each other,
                and choosing each other. Jati jhagda gare pani
                 sadhai khusi hunu hai maya 😘
              </p>

              <p className="final-message">
                More birthdays.
                <br />
                More adventures.
                <br />
                More stupid jokes.
                <br />
                More memories.
                <br />
                More us.
              </p>

              <div className="final-heart">
                <Heart
                  size={58}
                  fill="currentColor"
                />
              </div>

              <p className="final-love">
                Happy Birthday Baby,
                <br />
                <strong>{CONFIG.herName}</strong>
              </p>

              <p className="tiny-note">
                Made especially for you — with love.
              </p>
            </div>
          </section>

          <footer>
            <span>
              Made with ❤️ by {CONFIG.yourName}
            </span>
          </footer>
        </>
      )}
    </main>
  );
}