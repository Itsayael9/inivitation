"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Envelope from "./Envelope";
import InvitationContent from "./InvitationContent";
import FinaleSection from "./FinaleSection";
import AmbientLife from "./AmbientLife";
import MusicAutoplayPrompt from "./MusicAutoplayPrompt";
import MusicControl from "./MusicControl";
import MusicStartHint from "./MusicStartHint";
import { playWeddingMusic, preloadMusic, verifyMusicPlaying } from "@/lib/weddingMusic";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function prepDraw(scope: Element) {
  scope.querySelectorAll<SVGPathElement>("[data-draw]").forEach((path) => {
    try {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    } catch {
      /* skip */
    }
  });
  gsap.set(scope.querySelectorAll("[data-bloom]"), { scale: 0, opacity: 0 });
}

function bloomFlorals(scope: Element, tl: gsap.core.Timeline, at: gsap.Position = 0) {
  tl.to(
    scope.querySelectorAll("[data-draw]"),
    { strokeDashoffset: 0, duration: 1.4, ease: "power2.out", stagger: 0.08 },
    at
  ).to(
    scope.querySelectorAll("[data-bloom]"),
    { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2.2)", stagger: 0.07 },
    typeof at === "number" ? at + 0.45 : at
  );
}

export default function InvitationExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  const [finaleRevealed, setFinaleRevealed] = useState(false);
  const opening = useRef(false);

  useEffect(() => {
    const el = document.documentElement;
    if (!opened) el.classList.add("no-scroll");
    else el.classList.remove("no-scroll");
    return () => el.classList.remove("no-scroll");
  }, [opened]);

  /* Attempt autoplay as soon as the page loads, and keep a user-gesture fallback for browsers that block it. */
  useEffect(() => {
    if (opened) return;

    const start = () => {
      preloadMusic();
      playWeddingMusic();
    };

    const warm = () => preloadMusic();

    start();
    document.addEventListener("pointerdown", start, { once: true, passive: true });
    document.addEventListener("touchstart", warm, { once: true, passive: true });
    document.addEventListener("click", warm, { once: true });

    return () => {
      document.removeEventListener("pointerdown", start);
      document.removeEventListener("touchstart", warm);
      document.removeEventListener("click", warm);
    };
  }, [opened]);

  /* Landing — gentle envelope float + header entrance */
  useEffect(() => {
    if (opened) return;
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const envelope = root.querySelector("[data-envelope]");
    const seal = root.querySelector("[data-seal]");
    const header = root.querySelector("[data-landing-header]");
    const cta = root.querySelector("[data-cta]");

    const ctx = gsap.context(() => {
      gsap.set([header, cta], { autoAlpha: 0, y: 18 });
      gsap.to([header, cta], {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.18,
        delay: 0.35,
        ease: "power3.out",
      });

      if (envelope) {
        gsap.to(envelope, {
          y: -10,
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      if (seal) {
        gsap.to(seal, {
          scale: 1.04,
          duration: 2.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, root);

    return () => ctx.revert();
  }, [opened]);

  /* animate invitation content in after the envelope is dismissed */
  useEffect(() => {
    if (!opened) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const finale = root.querySelector("[data-finale-wrap]");
      if (finale) gsap.set(finale, { display: "none", height: 0 });

      root.querySelectorAll("[data-floral]").forEach(prepDraw);
      gsap.set(root.querySelectorAll("[data-schedule-row]"), { autoAlpha: 0, x: 24 });
      gsap.set(root.querySelectorAll("[data-reveal-title]"), { autoAlpha: 0, y: 24 });
      gsap.set(root.querySelectorAll("[data-reveal-divider]"), { scaleX: 0, autoAlpha: 0 });
      gsap.set(root.querySelectorAll("[data-reveal-item]"), { autoAlpha: 0, y: 20 });
      gsap.set(root.querySelectorAll("[data-swatch]"), { autoAlpha: 0, scale: 0 });
      gsap.set(root.querySelectorAll("[data-timeline-line]"), { scaleY: 0, transformOrigin: "top center" });
      gsap.set(root.querySelectorAll("[data-venue-block]"), { autoAlpha: 0, y: 36 });
      gsap.set(root.querySelectorAll("[data-memory-slider]"), { autoAlpha: 0, y: 32, scale: 0.97 });

      if (prefersReducedMotion()) {
        gsap.set(
          root.querySelectorAll(
            "[data-hero-item], [data-schedule-row], [data-reveal-title], [data-reveal-divider], [data-reveal-item], [data-swatch], [data-timeline-line], [data-venue-block], [data-memory-slider]"
          ),
          { autoAlpha: 1, y: 0, x: 0, scale: 1, scaleX: 1, scaleY: 1, clearProps: "scale" }
        );
        gsap.set(root.querySelectorAll("[data-draw]"), { strokeDashoffset: 0 });
        gsap.set(root.querySelectorAll("[data-bloom]"), { scale: 1, opacity: 1 });
        return;
      }

      gsap.set(root.querySelectorAll("[data-hero-item]"), { autoAlpha: 0, y: 36 });

      const heroIntro = root.querySelector("[data-section='hero-intro']");
      const introCard = root.querySelector(".invitation-card--panel");
      const mihrab = root.querySelector("[data-mihrab-frame]");
      if (heroIntro) {
        if (mihrab) gsap.set(mihrab, { autoAlpha: 0, scale: 0.96 });
        if (introCard) gsap.set(introCard, { autoAlpha: 0, y: 30 });

        const tl = gsap.timeline({ delay: 0.15 });
        if (mihrab) {
          tl.to(mihrab, { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power3.out" });
        }
        if (introCard) {
          tl.to(introCard, { autoAlpha: 1, y: 0, duration: 1.0, ease: "power3.out" }, mihrab ? "-=0.9" : 0);
        }
        tl.to(
          heroIntro.querySelectorAll("[data-hero-item]"),
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            stagger: 0.13,
          },
          "-=0.75"
        );
      }

      const heroDetails = root.querySelector("[data-section='hero-details']");
      const detailsTicket = root.querySelector(".details-ticket");
      if (heroDetails) {
        if (detailsTicket) {
          gsap.set(detailsTicket, { autoAlpha: 0, y: 48, scale: 0.94, rotationX: 8, transformPerspective: 800 });
        }
        const tl = gsap.timeline({
          scrollTrigger: { trigger: heroDetails, start: "top 82%", once: true },
        });
        if (detailsTicket) {
          tl.to(detailsTicket, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.1,
            ease: "power3.out",
          });
        }
        tl.to(
          heroDetails.querySelectorAll("[data-hero-item]"),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "back.out(1.4)",
            stagger: 0.1,
          },
          detailsTicket ? "-=0.65" : 0
        );
        tl.to(
          heroDetails.querySelectorAll("[data-venue-block]"),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.14,
          },
          "-=0.35"
        );

        const timePill = heroDetails.querySelector("[data-time-pill]");
        if (timePill) {
          gsap.to(timePill, {
            boxShadow: "0 0 22px rgba(212, 175, 95, 0.45)",
            duration: 1.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            scrollTrigger: { trigger: timePill, start: "top 90%", toggleActions: "play none none reverse" },
          });
        }
      }

      function revealSection(section: Element) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        });

        tl.from(section, { autoAlpha: 0, y: 46, duration: 0.85, ease: "power3.out" }, 0);

        const titles = section.querySelectorAll("[data-reveal-title]");
        if (titles.length) {
          tl.to(titles, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.1 }, 0.12);
        }

        const dividers = section.querySelectorAll("[data-reveal-divider]");
        if (dividers.length) {
          tl.to(
            dividers,
            { scaleX: 1, autoAlpha: 1, duration: 0.7, ease: "power2.out", stagger: 0.08 },
            0.2
          );
        }

        const line = section.querySelector("[data-timeline-line]");
        if (line) {
          tl.to(line, { scaleY: 1, duration: 1.1, ease: "power2.inOut" }, 0.2);
        }

        const rows = section.querySelectorAll("[data-schedule-row]");
        if (rows.length) {
          tl.to(
            rows,
            { autoAlpha: 1, x: 0, duration: 0.75, ease: "power3.out", stagger: 0.14 },
            0.35
          );
        }

        const items = section.querySelectorAll("[data-reveal-item]");
        if (items.length) {
          tl.to(items, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out", stagger: 0.1 }, 0.3);
        }

        const swatches = section.querySelectorAll("[data-swatch]");
        if (swatches.length) {
          tl.to(
            swatches,
            { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2.8)", stagger: 0.09 },
            0.38
          );
        }

        const memorySlider = section.querySelector("[data-memory-slider]");
        if (memorySlider) {
          tl.to(
            memorySlider,
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.95, ease: "power3.out" },
            0.28
          );
        }

        section.querySelectorAll("[data-floral]").forEach((f) => bloomFlorals(f, tl, 0.25));
      }

      root
        .querySelectorAll("section[data-section]:not([data-section='hero-intro']):not([data-section='hero-details'])")
        .forEach(revealSection);

      const ctaBtn = root.querySelector("[data-finale-cta]");
      if (ctaBtn) {
        gsap.to(ctaBtn, {
          y: 6,
          duration: 1.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [opened]);

  function openEnvelope() {
    if (opening.current) return;
    opening.current = true;
    preloadMusic();
    playWeddingMusic();

    const root = rootRef.current;
    if (!root) {
      setOpened(true);
      return;
    }

    const overlay = root.querySelector<HTMLElement>("[data-overlay]");
    const envelope = root.querySelector<HTMLElement>("[data-envelope]");
    const letter = root.querySelector<HTMLElement>("[data-letter]");
    const flap = root.querySelector<HTMLElement>("[data-flap]");
    const seal = root.querySelector<HTMLElement>("[data-seal]");
    const cta = root.querySelector<HTMLElement>("[data-cta]");
    const header = root.querySelector<HTMLElement>("[data-landing-header]");

    const finish = () => {
      setOpened(true);
      window.scrollTo(0, 0);
      verifyMusicPlaying();
    };

    if (!overlay || !envelope || !letter || !flap || !seal) {
      finish();
      return;
    }

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    seal.style.pointerEvents = "none";
    const sealLeft = seal.querySelector("[data-seal-half='left']");
    const sealRight = seal.querySelector("[data-seal-half='right']");
    const crack = seal.querySelector("[data-seal-crack]");

    const rect = letter.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const liftY = rect.height * 1.02;
    const coverScale = Math.max(vw / rect.width, vh / rect.height) * 1.06;
    const centerDx = vw / 2 - (rect.left + rect.width / 2);
    const centerDy = vh / 2 - (rect.top + rect.height / 2 - liftY);

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete: finish });

    tl.to([cta, header].filter(Boolean), {
      autoAlpha: 0,
      y: 14,
      duration: 0.45,
      ease: "power2.out",
    })
      .to(crack, { attr: { "stroke-opacity": 0.7 }, duration: 0.12 }, "<0.1")
      .to(
        sealLeft,
        { x: -16, y: 6, rotation: -9, transformOrigin: "50% 50%", duration: 0.55, ease: "power2.in" },
        "break"
      )
      .to(
        sealRight,
        { x: 16, y: 8, rotation: 9, transformOrigin: "50% 50%", duration: 0.55, ease: "power2.in" },
        "break"
      )
      .to(seal, { autoAlpha: 0, y: 26, duration: 0.4, ease: "power2.in" }, "break+=0.3")
      .to(
        flap,
        {
          rotationX: -180,
          duration: 1.0,
          ease: "power3.inOut",
          onUpdate() {
            if (Number(gsap.getProperty(flap, "rotationX")) < -90) {
              flap.style.zIndex = "5";
            }
          },
        },
        "break+=0.35"
      )
      .to(letter, { y: -liftY, duration: 0.9, ease: "power3.out" }, "-=0.35")
      .to(envelope, { y: 30, scale: 0.94, duration: 0.9, ease: "power2.inOut" }, "<")
      .to(
        letter,
        {
          x: centerDx,
          y: -liftY + centerDy,
          scale: coverScale,
          duration: 1.1,
          ease: "power4.inOut",
        },
        "expand"
      )
      .to(envelope, { autoAlpha: 0, scale: 0.85, duration: 0.7, ease: "power2.in" }, "expand")
      .to(letter, { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" }, "expand+=0.75")
      .to(overlay, { autoAlpha: 0, duration: 0.55, ease: "power1.inOut" }, "expand+=0.7");
  }

  function revealFinale() {
    const root = rootRef.current;
    if (!root || finaleRevealed) return;
    setFinaleRevealed(true);

    const wrap = root.querySelector<HTMLElement>("[data-finale-wrap]");
    const finale = root.querySelector<HTMLElement>("[data-finale]");
    const card = root.querySelector<HTMLElement>("[data-finale-card]");
    const cta = root.querySelector<HTMLElement>("[data-finale-cta]");
    if (!wrap || !finale || !card) return;

    if (prefersReducedMotion()) {
      gsap.set(wrap, { display: "block", height: "auto" });
      gsap.set(finale.querySelectorAll("[data-draw]"), { strokeDashoffset: 0 });
      gsap.set(finale.querySelectorAll("[data-bloom]"), { scale: 1, opacity: 1 });
      wrap.scrollIntoView();
      return;
    }

    finale.querySelectorAll("[data-finale-floral]").forEach(prepDraw);
    gsap.set(wrap, { display: "block", height: "auto" });
    const fullHeight = wrap.offsetHeight;
    gsap.set(wrap, { height: 0, overflow: "hidden" });
    gsap.set(card, { autoAlpha: 0, y: 70 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(wrap, { height: "auto", overflow: "visible", clearProps: "height,overflow" });
        ScrollTrigger.refresh();
      },
    });

    tl.to(cta, { autoAlpha: 0, y: -20, duration: 0.45, ease: "power2.in" })
      .to(wrap, { height: fullHeight, duration: 1.2, ease: "power3.inOut" }, "unfold")
      .to(
        window,
        { scrollTo: { y: wrap.offsetTop, autoKill: false }, duration: 1.4, ease: "power3.inOut" },
        "unfold+=0.15"
      )
      .to(card, { autoAlpha: 1, y: 0, duration: 1.0, ease: "power3.out" }, "unfold+=0.8");

    finale
      .querySelectorAll("[data-finale-floral]")
      .forEach((f, i) => bloomFlorals(f, tl, 1.0 + i * 0.12));
  }

  return (
    <div ref={rootRef} className="relative min-h-screen">
      {opened ? (
        <>
          <AmbientLife />
          <InvitationContent onRevealFinale={revealFinale} finaleRevealed={finaleRevealed} />
          <div data-finale-wrap>
            <FinaleSection />
          </div>
          <MusicControl visible />
          <MusicAutoplayPrompt visible />
        </>
      ) : (
        <>
          <Envelope onOpen={openEnvelope} />
          <MusicStartHint />
        </>
      )}
    </div>
  );
}
