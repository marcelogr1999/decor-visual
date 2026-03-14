"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WHATSAPP_NUMBER = "5541998494501";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de solicitar um orçamento."
)}`;

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

interface HeroProps {
  slides: Slide[];
  title?: string;
  subtitle?: string;
}

const AUTO_PLAY_INTERVAL = 6000;

export function Hero({ slides, title, subtitle }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setProgress(0);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(() => {
      next();
    }, AUTO_PLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  // Progress bar
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / AUTO_PLAY_INTERVAL) * 100, 100);
      setProgress(pct);
    }, 30);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current]);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-neutral-950"
    >
      {/* ── Background Images ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: i === current ? 1 : 0,
          }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: i === current ? "scale(1.05)" : "scale(1)",
              transition: "transform 8s ease-out",
            }}
          />
        </div>
      ))}

      {/* ── Overlays ── */}
      {/* Dark gradient from bottom */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      {/* Left gradient for text readability */}
      <div
        className="absolute inset-0 z-[2] hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
        }}
      />

      {/* ── Content Wrapper ── */}
      {/* Flex container that will naturally span min-h-[100svh] but can grow.
          Includes padding at the top (pt-32) to ensure it stays below fixed header 
          and padding at the bottom (pb-32 or more) so nothing touches the carousel nav. */}
      <div className="relative z-[3] flex flex-col justify-center min-h-[100svh] w-full max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-64 md:pb-56 lg:pb-48">
        <div className="w-full">
          {/* Top tag */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#dc2626" }}
            />
            <span className="text-white/80 text-xs md:text-sm font-medium tracking-wide uppercase">
              Comunicação Visual
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-[family-name:var(--font-display)] text-white leading-[1.05] tracking-tight mb-3"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 800,
            }}
          >
            {title ? (
              <span className="block">{title}</span>
            ) : (
              <>
                <span className="block">
                  A sua {" "}
                  <span
                    className="italic"
                    style={{
                      color: "#dc2626",
                      textShadow: "0 0 60px rgba(220,38,38,0.3)",
                    }}
                  >
                    ARTE
                  </span>
                </span>
                <span className="block">no spotlight</span>
              </>
            )}
          </h1>



          {/* Description */}
          {/* Removed max-height overflow limitations to allow natural content growth */}
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg mb-8 font-light">
            {subtitle || "Na DECOR Visual, criatividade e qualidade se unem para transformar suas inspirações em projetos reais."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl text-white/90 text-base font-medium transition-all duration-300 backdrop-blur-[8px] bg-chart-1  border border-chart-2bg-primary text-primary-foreground hover:bg-primary/90 hover:bg-primary hover:shadow-lg"
            >
              <span>Solicitar Orçamento</span>
            </a>

            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl text-white/90 text-base font-medium transition-all duration-300 backdrop-blur-[8px] border border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.15)] hover:shadow-lg"
            >
              Ver Serviços
            </a>
          </div>
        </div>
      </div>

      {/* ── Carousel Navigation ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[4]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-6 md:pb-8">
          <div className="flex flex-col gap-6">
            {/* Active slide label & description */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="h-[2px] w-8"
                style={{ backgroundColor: "#dc2626" }}
              />
              <p className="text-white/90 text-lg md:text-xl font-medium">
                {slides[current].title}
              </p>
              <span className="text-white/50 text-sm md:text-base">
                — {slides[current].subtitle}
              </span>
            </div>

            <div className="flex items-center justify-between">
              {/* Progress dots & slide counter */}
              <div className="flex items-center gap-4">
                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    disabled={isTransitioning}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 transition-all duration-300 cursor-pointer bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.2)]"
                    aria-label="Slide anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    disabled={isTransitioning}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 transition-all duration-300 cursor-pointer bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.2)]"
                    aria-label="Próximo slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Slide counter */}
                <span className="text-white/40 text-sm font-mono hidden sm:block">
                  <span className="text-white/90 font-semibold">
                    {String(current + 1).padStart(2, "0")}
                  </span>{" "}
                  / {String(slides.length).padStart(2, "0")}
                </span>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Ir para slide ${i + 1}`}
                    className="relative p-2 mx-[-4px] cursor-pointer group"
                  >
                    <div
                      className="relative h-1 rounded-full transition-all duration-500 overflow-hidden"
                      style={{
                        width: i === current ? 32 : 12,
                        backgroundColor:
                          i === current
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(255,255,255,0.15)",
                      }}
                    >
                      {i === current && (
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: "#dc2626",
                            transition: "width 30ms linear",
                          }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Decorative elements ── */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] z-[2] pointer-events-none hidden lg:block"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(220,38,38,0.08), transparent 70%)",
        }}
      />
    </section>
  );
}
