import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield,
  Clock,
  ArrowUpRight,
  Lock,
  CheckCircle2,
  Sparkles,
  Radio,
  Layers,
  Compass,
  ChevronRight,
  CreditCard,
  X,
  Key,
  Flame,
  Award,
  Zap,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
    name: 'Performance',
    subtitle: 'Chronomètre Privilège',
    price: '4 800 €',
    period: '/ an'
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // References for GSAP animations
  const appRef = useRef(null);
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const manifestoRef = useRef(null);
  const protocolContainerRef = useRef(null);
  const protocolCardRefs = useRef([]);

  // Sticky / Morphing Navbar Observer
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Context for all entrance and scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance Animation
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl.fromTo(
        '.hero-stagger',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, delay: 0.2 }
      );

      // Manifesto Scroll Animation
      gsap.fromTo(
        '.manifesto-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Protocol Sticky Stack Animation
      const cards = protocolCardRefs.current.filter(Boolean);
      if (cards.length > 0 && protocolContainerRef.current) {
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            ScrollTrigger.create({
              trigger: cards[i + 1],
              start: 'top 85%',
              end: 'top 20%',
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.to(card, {
                  scale: 1 - progress * 0.08,
                  opacity: 1 - progress * 0.45,
                  filter: `blur(${progress * 16}px)`,
                  overwrite: 'auto',
                  duration: 0.1,
                });
              },
            });
          }
        });
      }
    }, appRef);

    return () => ctx.revert();
  }, []);

  // Trigger Checkout Modal
  const openCheckout = (plan) => {
    setSelectedPlan(plan);
    setPaymentSuccess(false);
    setIsProcessingPayment(false);
    setIsCheckoutOpen(true);
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A84C', '#FAF8F5', '#E2C872', '#2A2A35']
      });
    }, 1200);
  };

  return (
    <div ref={appRef} className="relative min-h-screen bg-[#0D0D12] text-[#FAF8F5] selection:bg-[#C9A84C] selection:text-[#0D0D12]">
      {/* ========================================================
          A. NAVBAR — "L'Île Flottante"
      ======================================================== */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-6 px-6 py-3.5 transition-all duration-500 rounded-full border ${
            scrolledPastHero
              ? 'bg-[#0D0D12]/85 backdrop-blur-xl border-[#C9A84C]/25 shadow-2xl shadow-black/80 w-[95%] max-w-4xl'
              : 'bg-transparent border-transparent w-[95%] max-w-5xl'
          }`}
        >
          {/* Brand Mark */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full border border-[#C9A84C]/50 flex items-center justify-center bg-[#13131A] transition-transform duration-300 group-hover:rotate-45">
              <span className="text-[#C9A84C] text-xs font-mono font-bold tracking-widest">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-[0.2em] uppercase font-sans text-[#FAF8F5]">
                Maison Minuit
              </span>
              <span className="text-[9px] font-mono tracking-wider text-[#C9A84C]/80 -mt-0.5">
                HAUTE HORLOGERIE & CLUB
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-sans font-medium tracking-wide text-[#FAF8F5]/70">
            <a href="#fonctionnalites" className="interactive-lift hover:text-[#C9A84C] transition-colors">
              Artefacts
            </a>
            <a href="#manifeste" className="interactive-lift hover:text-[#C9A84C] transition-colors">
              Manifeste
            </a>
            <a href="#protocole" className="interactive-lift hover:text-[#C9A84C] transition-colors">
              Protocole
            </a>
            <a href="#tarifs" className="interactive-lift hover:text-[#C9A84C] transition-colors">
              Adhésion
            </a>
          </div>

          {/* CTA Action */}
          <button
            onClick={() =>
              openCheckout({
                name: 'Performance',
                subtitle: 'Chronomètre Privilège',
                price: '4 800 €',
                period: '/ an',
              })
            }
            className="btn-magnetic px-5 py-2.5 rounded-full bg-[#C9A84C] text-[#0D0D12] text-xs font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-[#C9A84C]/20"
          >
            <span className="btn-glide bg-[#FAF8F5]" />
            <span className="btn-content flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payer</span>
            </span>
          </button>
        </nav>
      </header>

      {/* ========================================================
          B. SECTION HERO — "Le Plan d'Ouverture"
      ======================================================== */}
      <section
        ref={heroRef}
        className="relative h-[100dvh] w-full flex flex-col justify-end px-6 sm:px-12 md:px-20 pb-16 md:pb-24 overflow-hidden"
      >
        {/* Full frame background luxury imagery */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop')`,
          }}
        />

        {/* Heavy Primary to Black Radial & Linear Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D12] via-[#0D0D12]/60 to-transparent" />

        {/* Subtle decorative gold coordinates */}
        <div className="absolute top-28 right-8 md:right-16 hidden lg:flex flex-col items-end gap-1 font-mono text-[11px] text-[#C9A84C]/60 tracking-widest uppercase">
          <span>LAT 46° 12′ 05″ N</span>
          <span>LONG 06° 09′ 00″ E</span>
          <span className="text-[#FAF8F5]/40 mt-1">Édition Limitée • 100 Sièges</span>
        </div>

        {/* Content pushed to the lower-left third */}
        <div ref={heroTextRef} className="relative z-10 max-w-4xl flex flex-col items-start gap-4">
          <div className="hero-stagger flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#181824]/90 border border-[#C9A84C]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] -ml-4" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#FAF8F5]/90">
              Club Privé & Horlogerie de Précision
            </span>
          </div>

          {/* Preset B Hero Title Pattern: "[Nom aspirationnel] rencontre" (Sans Gras) / "[Mot précision]." (Serif Italique Massif) */}
          <h1 className="hero-stagger flex flex-col leading-[1.05] tracking-tight text-left">
            <span className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#FAF8F5] uppercase tracking-[-0.03em]">
              L'excellence souveraine rencontre
            </span>
            <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#C9A84C] mt-2 drop-shadow-2xl">
              l'Intemporel.
            </span>
          </h1>

          <p className="hero-stagger text-[#FAF8F5]/70 text-sm sm:text-base md:text-lg max-w-xl font-sans font-normal leading-relaxed mt-2">
            La première chambre de conservation temporelle et club d'initiés. Chaque seconde de votre existence est mesurée, valorisée et transcendée par les plus grands maîtres artisans.
          </p>

          <div className="hero-stagger flex flex-wrap items-center gap-4 mt-4">
            <button
              onClick={() =>
                openCheckout({
                  name: 'Performance',
                  subtitle: 'Chronomètre Privilège',
                  price: '4 800 €',
                  period: '/ an',
                })
              }
              className="btn-magnetic px-8 py-4 rounded-full bg-[#C9A84C] text-[#0D0D12] text-sm font-semibold tracking-wider uppercase shadow-xl hover:shadow-[#C9A84C]/30 group"
            >
              <span className="btn-glide bg-[#FAF8F5]" />
              <span className="btn-content flex items-center gap-3">
                <span>Régler l'Adhésion</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            <a
              href="#fonctionnalites"
              className="px-6 py-4 rounded-full border border-[#FAF8F5]/20 text-[#FAF8F5]/90 text-sm font-sans tracking-wide hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
            >
              Découvrir les Artefacts
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          C. FONCTIONNALITES — "Artefacts Fonctionnels Interactifs"
      ======================================================== */}
      <section id="fonctionnalites" className="relative py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instruments Fonctionnels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-[#FAF8F5]">
            Trois Précisions Inégalées.
          </h2>
          <p className="text-[#FAF8F5]/60 text-sm md:text-base max-w-xl mt-3 font-sans">
            Des micro-interfaces logicielles d'ingénierie active, forgées pour les esprits exigeants.
          </p>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ----------------------------------------------------
              Carte 1 — "Mélangeur Diagnostique"
              3 cartes superposées qui cyclent verticalement avec
              array.unshift(array.pop()) toutes les 3s (transition élastique)
          ---------------------------------------------------- */}
          <DiagnosticShuffler />

          {/* ----------------------------------------------------
              Carte 2 — "Machine à Écrire Télémétrie"
              Flux monospace caractère par caractère avec curseur clignotant
          ---------------------------------------------------- */}
          <TelemetryTypewriter />

          {/* ----------------------------------------------------
              Carte 3 — "Planificateur Protocole Curseur"
              Grille hebdomadaire avec curseur SVG autonome qui clique
          ---------------------------------------------------- */}
          <ProtocolCursorPlanner />
        </div>
      </section>

      {/* ========================================================
          D. PHILOSOPHIE — "Le Manifeste"
      ======================================================== */}
      <section
        id="manifeste"
        ref={manifestoRef}
        className="relative py-36 px-6 sm:px-12 md:px-20 bg-[#08080C] overflow-hidden border-y border-[#C9A84C]/15"
      >
        {/* Parallax Organic/Marble Texture at Low Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08] mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <span className="manifesto-reveal inline-block px-4 py-1.5 rounded-full bg-[#1A1A24] text-[#C9A84C] font-mono text-xs tracking-widest uppercase mb-10 border border-[#C9A84C]/30">
            Le Manifeste de la Seconde
          </span>

          {/* Statement 1: Neutral, smaller */}
          <p className="manifesto-reveal text-base sm:text-xl md:text-2xl text-[#FAF8F5]/50 font-sans max-w-2xl leading-relaxed mb-6">
            La plupart des clubs d'exception se concentrent sur : l'apparat éphémère, les salons feutrés et le prestige superficiel.
          </p>

          <div className="manifesto-reveal w-16 h-px bg-[#C9A84C]/40 my-6" />

          {/* Statement 2: Massive, dramatic italic serif, keyword highlighted */}
          <p className="manifesto-reveal text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-[#FAF8F5] leading-tight">
            Nous nous concentrons sur :{' '}
            <span className="text-[#C9A84C] underline decoration-[#C9A84C]/40 underline-offset-8">
              la souveraineté absolue
            </span>{' '}
            de votre temps.
          </p>

          <p className="manifesto-reveal text-[#FAF8F5]/60 text-sm sm:text-base max-w-xl mt-8 font-sans leading-relaxed">
            Dans un monde submergé par le bruit, la seule véritable rareté est une heure exempte de compromis. Nous bâtissons des sanctuaires temporels où chaque décision devient un legs.
          </p>
        </div>
      </section>

      {/* ========================================================
          E. PROTOCOLE — "Archive Empilée Sticky"
          3 cartes plein écran qui s'empilent au scroll avec ScrollTrigger
      ======================================================== */}
      <section id="protocole" ref={protocolContainerRef} className="relative py-28 px-4 sm:px-8 md:px-16">
        <div className="max-w-5xl mx-auto mb-16 text-center">
          <div className="flex items-center justify-center gap-2 text-[#C9A84C] text-xs font-mono uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Processus Immuable</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#FAF8F5]">
            Le Protocole d'Intronisation.
          </h2>
          <p className="text-[#FAF8F5]/60 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            Trois étapes rigoureuses pour sceller votre adhésion et calibrer votre instrument.
          </p>
        </div>

        {/* 3 Full-screen Stackable Cards */}
        <div className="relative max-w-5xl mx-auto flex flex-col gap-12 md:gap-24">
          {/* Card 1: Horological Geometric Celestial Rotation */}
          <div
            ref={(el) => (protocolCardRefs.current[0] = el)}
            className="sticky top-28 min-h-[520px] rounded-[2.5rem] bg-[#14141B] border border-[#C9A84C]/25 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-black overflow-hidden"
          >
            <div className="flex-1 flex flex-col items-start gap-4 z-10">
              <span className="font-mono text-sm tracking-widest text-[#C9A84C] px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30">
                ÉTAPE // 01
              </span>
              <h3 className="font-sans font-bold text-2xl sm:text-4xl text-[#FAF8F5] tracking-tight">
                Alignement & Calibrage Cryptographique
              </h3>
              <p className="text-[#FAF8F5]/70 text-sm sm:text-base leading-relaxed font-sans max-w-md">
                Votre signature temporelle est encryptée selon les standards militaires et forgée dans un registre inviolable. Chaque membre possède un identifiant physique unique.
              </p>
              <div className="flex items-center gap-3 font-mono text-xs text-[#FAF8F5]/50 mt-4">
                <Shield className="w-4 h-4 text-[#C9A84C]" />
                <span>CHRONO-ID DÉDIÉ — SÉCURITÉ QUANTIQUE</span>
              </div>
            </div>

            {/* Unique SVG Animation 1: Rotating Concentric Horological Mechanism */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              <svg className="w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#2A2A35" strokeWidth="1" strokeDasharray="3 6" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="8 12" opacity="0.6" />
                <circle cx="100" cy="100" r="55" fill="none" stroke="#FAF8F5" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                <circle cx="100" cy="100" r="35" fill="none" stroke="#C9A84C" strokeWidth="2" />
                {/* Dial indices */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <line
                    key={deg}
                    x1="100"
                    y1="12"
                    x2="100"
                    y2="20"
                    stroke="#C9A84C"
                    strokeWidth="2"
                    transform={`rotate(${deg} 100 100)`}
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Clock className="w-8 h-8 text-[#C9A84C] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Card 2: Horizontal Sweeping Laser Line over Matrix Grid */}
          <div
            ref={(el) => (protocolCardRefs.current[1] = el)}
            className="sticky top-32 min-h-[520px] rounded-[2.5rem] bg-[#14141B] border border-[#C9A84C]/25 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-black overflow-hidden"
          >
            <div className="flex-1 flex flex-col items-start gap-4 z-10">
              <span className="font-mono text-sm tracking-widest text-[#C9A84C] px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30">
                ÉTAPE // 02
              </span>
              <h3 className="font-sans font-bold text-2xl sm:text-4xl text-[#FAF8F5] tracking-tight">
                Balayage & Sanctuaire Privé
              </h3>
              <p className="text-[#FAF8F5]/70 text-sm sm:text-base leading-relaxed font-sans max-w-md">
                Une analyse télémétrique continue de vos allocations prioritaires. Notre réseau d'intendants personnels déploie des solutions concrètes en moins de 180 secondes.
              </p>
              <div className="flex items-center gap-3 font-mono text-xs text-[#FAF8F5]/50 mt-4">
                <Radio className="w-4 h-4 text-[#C9A84C]" />
                <span>RÉPONSE DÉDIÉE // MOINS DE 3 MINUTES</span>
              </div>
            </div>

            {/* Unique SVG/CSS Animation 2: Laser Grid Scan */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-[#0D0D12] border border-[#2A2A35] p-4 flex flex-col justify-between overflow-hidden">
              {/* Dot matrix */}
              <div className="grid grid-cols-8 grid-rows-8 gap-3 h-full w-full">
                {Array.from({ length: 64 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="w-1.5 h-1.5 rounded-full bg-[#FAF8F5]/20 m-auto transition-colors duration-500"
                  />
                ))}
              </div>
              {/* Sweeping Laser Line */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent shadow-[0_0_15px_#C9A84C] animate-[bounce_4s_ease-in-out_infinite]" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-[#C9A84C]">
                <span>SCAN MATRIX</span>
                <span className="animate-pulse">ACTIVE 99.98%</span>
              </div>
            </div>
          </div>

          {/* Card 3: Pulsating ECG Chronograph Waveform */}
          <div
            ref={(el) => (protocolCardRefs.current[2] = el)}
            className="sticky top-36 min-h-[520px] rounded-[2.5rem] bg-[#14141B] border border-[#C9A84C]/25 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-black overflow-hidden"
          >
            <div className="flex-1 flex flex-col items-start gap-4 z-10">
              <span className="font-mono text-sm tracking-widest text-[#C9A84C] px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30">
                ÉTAPE // 03
              </span>
              <h3 className="font-sans font-bold text-2xl sm:text-4xl text-[#FAF8F5] tracking-tight">
                Consécration & Cercle Perpétuel
              </h3>
              <p className="text-[#FAF8F5]/70 text-sm sm:text-base leading-relaxed font-sans max-w-md">
                Accès sans restriction aux salons privés mondiaux, assemblées discrètes d'arbitrage et ventes privées d'horlogerie de musée.
              </p>
              <div className="flex items-center gap-3 font-mono text-xs text-[#FAF8F5]/50 mt-4">
                <Key className="w-4 h-4 text-[#C9A84C]" />
                <span>CLÉ D'OR PHYSIQUE LIVRÉE SOUS BLINDAGE</span>
              </div>
            </div>

            {/* Unique SVG Animation 3: Pulsating Waveform Path */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-[#0D0D12] border border-[#2A2A35] flex items-center justify-center p-4">
              <svg className="w-full h-36" viewBox="0 0 300 100" fill="none">
                <path
                  d="M0 50 L70 50 L85 20 L100 80 L115 35 L130 65 L145 50 L200 50 L215 15 L230 85 L245 45 L260 50 L300 50"
                  stroke="#C9A84C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-dash-pulse"
                />
              </svg>
              <div className="absolute top-4 left-4 font-mono text-[10px] text-[#FAF8F5]/40 uppercase tracking-widest">
                Pouls Horloger • 28,800 A/h
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#C9A84C] uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-ping" />
                <span>Précision COSC Certifiée</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          F. ADHÉSION / TARIFICATION — Avec CTA "Payer"
      ======================================================== */}
      <section id="tarifs" className="relative py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181824] border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-mono uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Chambre d'Adhésion</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#FAF8F5]">
            Trois Niveaux de Souveraineté.
          </h2>
          <p className="text-[#FAF8F5]/60 text-sm sm:text-base mt-4 font-sans">
            Choisissez le degré d'intervention de notre maison horlogère et rejoignez l'élite des détenteurs du temps.
          </p>
        </div>

        {/* 3 Tier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Tier 1: Essentiel */}
          <div className="rounded-[2.5rem] bg-[#13131A] border border-[#2A2A35] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[#C9A84C]/40">
            <div>
              <div className="font-mono text-xs tracking-widest uppercase text-[#FAF8F5]/50 mb-2">
                NIVEAU I
              </div>
              <h3 className="font-sans font-bold text-2xl text-[#FAF8F5]">Initié</h3>
              <p className="text-xs text-[#FAF8F5]/60 mt-1">L'accès fondamental au club et aux archives.</p>

              <div className="my-8 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-sans font-extrabold text-[#FAF8F5]">1 900 €</span>
                <span className="text-xs font-mono text-[#FAF8F5]/50">/ an</span>
              </div>

              <ul className="space-y-4 text-xs font-sans text-[#FAF8F5]/80">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Accès aux salons de Paris, Genève et Milan</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Registre cryptographique personnel</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Télémétrie en lecture seule</span>
                </li>
                <li className="flex items-center gap-3 text-[#FAF8F5]/40 line-through">
                  <span>Intendant de conciergerie dédié 24/7</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() =>
                openCheckout({
                  name: 'Initié',
                  subtitle: 'Accès Fondamental',
                  price: '1 900 €',
                  period: '/ an',
                })
              }
              className="btn-magnetic w-full py-4 rounded-full bg-[#1C1C26] border border-[#C9A84C]/30 text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider mt-10 hover:border-[#C9A84C]"
            >
              <span className="btn-glide bg-[#C9A84C]" />
              <span className="btn-content flex items-center justify-center gap-2 group-hover:text-[#0D0D12]">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Payer l'Adhésion</span>
              </span>
            </button>
          </div>

          {/* Tier 2: Performance (Featured Card with Primary obsidian + ring + accent button) */}
          <div className="relative rounded-[2.5rem] bg-gradient-to-b from-[#181824] to-[#0D0D12] border-2 border-[#C9A84C] p-8 sm:p-10 flex flex-col justify-between shadow-2xl shadow-[#C9A84C]/15 scale-100 lg:-translate-y-4">
            {/* Featured Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C9A84C] text-[#0D0D12] font-mono font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3 h-3" />
              <span>Recommandation du Maître</span>
            </div>

            <div>
              <div className="font-mono text-xs tracking-widest uppercase text-[#C9A84C] mb-2">
                NIVEAU II
              </div>
              <h3 className="font-sans font-bold text-3xl text-[#FAF8F5]">Chronomètre Privilège</h3>
              <p className="text-xs text-[#FAF8F5]/60 mt-1">L'expérience totale avec conciergerie algorithmique.</p>

              <div className="my-8 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-sans font-extrabold text-[#C9A84C]">4 800 €</span>
                <span className="text-xs font-mono text-[#FAF8F5]/50">/ an</span>
              </div>

              <ul className="space-y-4 text-xs font-sans text-[#FAF8F5]/90">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span className="font-semibold text-white">Intendant privé disponible sous 180s</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Accès mondial prioritaire et salons réservés</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Attribution d'une pièce d'horlogerie numérotée</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Coffre-fort digital crypté illimité</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() =>
                openCheckout({
                  name: 'Performance',
                  subtitle: 'Chronomètre Privilège',
                  price: '4 800 €',
                  period: '/ an',
                })
              }
              className="btn-magnetic w-full py-4 rounded-full bg-[#C9A84C] text-[#0D0D12] text-xs font-bold uppercase tracking-wider mt-10 shadow-xl shadow-[#C9A84C]/30"
            >
              <span className="btn-glide bg-[#FAF8F5]" />
              <span className="btn-content flex items-center justify-center gap-2">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Payer — Accès Immédiat</span>
              </span>
            </button>
          </div>

          {/* Tier 3: Souverain / Entreprise */}
          <div className="rounded-[2.5rem] bg-[#13131A] border border-[#2A2A35] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[#C9A84C]/40">
            <div>
              <div className="font-mono text-xs tracking-widest uppercase text-[#FAF8F5]/50 mb-2">
                NIVEAU III
              </div>
              <h3 className="font-sans font-bold text-2xl text-[#FAF8F5]">Souverain Perpétuel</h3>
              <p className="text-xs text-[#FAF8F5]/60 mt-1">Gouvernance exclusive & transmission patrimoniale.</p>

              <div className="my-8 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-sans font-extrabold text-[#FAF8F5]">12 500 €</span>
                <span className="text-xs font-mono text-[#FAF8F5]/50">/ à vie</span>
              </div>

              <ul className="space-y-4 text-xs font-sans text-[#FAF8F5]/80">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Droit de vote au Conseil des Fondateurs</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Transmissibilité héréditaire du statut</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Acquisition prioritaire de pièces de musée</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Ligne directe avec le Président</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() =>
                openCheckout({
                  name: 'Souverain Perpétuel',
                  subtitle: 'Gouvernance & Hérédité',
                  price: '12 500 €',
                  period: '/ à vie',
                })
              }
              className="btn-magnetic w-full py-4 rounded-full bg-[#1C1C26] border border-[#C9A84C]/30 text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider mt-10 hover:border-[#C9A84C]"
            >
              <span className="btn-glide bg-[#C9A84C]" />
              <span className="btn-content flex items-center justify-center gap-2 group-hover:text-[#0D0D12]">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Payer l'Attribution</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          G. PIED DE PAGE — "La Clôture Obscure"
      ======================================================== */}
      <footer className="relative bg-[#07070A] rounded-t-[4rem] border-t border-[#C9A84C]/20 pt-20 pb-12 px-6 sm:px-12 md:px-20 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand info */}
          <div className="md:col-span-2 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#C9A84C] flex items-center justify-center bg-[#13131A]">
                <span className="text-[#C9A84C] font-mono font-bold text-sm">M</span>
              </div>
              <span className="text-base font-bold tracking-[0.25em] uppercase font-sans text-[#FAF8F5]">
                Maison Minuit
              </span>
            </div>
            <p className="text-xs text-[#FAF8F5]/60 max-w-sm font-sans leading-relaxed">
              Société discrète de conservation temporelle. Création et gestion d'instruments d'exception pour un cercle restreint de membres.
            </p>
            {/* System Status Indicator with Pulsing Green Dot */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#13131A] border border-[#2A2A35] font-mono text-[11px] text-[#FAF8F5]/70 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTÈME OPÉRATIONNEL // TÉLÉMÉTRIE 100% SÉCURISÉE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3 font-sans text-xs">
            <span className="font-mono text-[11px] text-[#C9A84C] uppercase tracking-widest font-semibold mb-1">
              NAVIGATION
            </span>
            <a href="#fonctionnalites" className="text-[#FAF8F5]/70 hover:text-[#C9A84C] transition-colors interactive-lift">
              Artefacts Interactifs
            </a>
            <a href="#manifeste" className="text-[#FAF8F5]/70 hover:text-[#C9A84C] transition-colors interactive-lift">
              Le Manifeste
            </a>
            <a href="#protocole" className="text-[#FAF8F5]/70 hover:text-[#C9A84C] transition-colors interactive-lift">
              Le Protocole
            </a>
            <a href="#tarifs" className="text-[#FAF8F5]/70 hover:text-[#C9A84C] transition-colors interactive-lift">
              Grille d'Adhésion
            </a>
          </div>

          {/* Legal / Vault info */}
          <div className="flex flex-col gap-3 font-sans text-xs">
            <span className="font-mono text-[11px] text-[#C9A84C] uppercase tracking-widest font-semibold mb-1">
              JURIDIQUE & VAULT
            </span>
            <a href="#" className="text-[#FAF8F5]/70 hover:text-[#C9A84C] transition-colors interactive-lift">
              Secret d'Affaires & Chiffrement
            </a>
            <a href="#" className="text-[#FAF8F5]/70 hover:text-[#C9A84C] transition-colors interactive-lift">
              Certificats de Manufacture
            </a>
            <a href="#" className="text-[#FAF8F5]/70 hover:text-[#C9A84C] transition-colors interactive-lift">
              Conditions Générales d'Intronisation
            </a>
            <a href="#" className="text-[#FAF8F5]/70 hover:text-[#C9A84C] transition-colors interactive-lift">
              Audit Indépendant 2026
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-[#2A2A35] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#FAF8F5]/40">
          <span>© 2026 MAISON MINUIT. TOUS DROITS RÉSERVÉS.</span>
          <span>CONÇU AVEC RIGUEUR CINÉMATOGRAPHIQUE POUR ESPOIR CHINOIS.</span>
        </div>
      </footer>

      {/* ========================================================
          MODAL DE PAIEMENT SÉCURISÉ — "Le Terminal de Règlement"
      ======================================================== */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-[2.5rem] bg-[#14141B] border border-[#C9A84C]/50 p-6 sm:p-8 shadow-2xl shadow-black text-left">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#1C1C26] text-[#FAF8F5]/70 hover:text-white hover:bg-[#2A2A35] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!paymentSuccess ? (
              <form onSubmit={handlePay} className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#C9A84C]/15 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xl text-[#FAF8F5]">Règlement Sécurisé</h4>
                    <p className="text-xs font-mono text-[#C9A84C]">TRANSACTION CRYPTÉE SSL-256</p>
                  </div>
                </div>

                {/* Plan Summary Box */}
                <div className="p-4 rounded-2xl bg-[#0D0D12] border border-[#2A2A35] flex justify-between items-center">
                  <div>
                    <div className="font-sans font-semibold text-sm text-[#FAF8F5]">{selectedPlan.name}</div>
                    <div className="text-xs text-[#FAF8F5]/50 font-mono">{selectedPlan.subtitle}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold font-sans text-[#C9A84C]">{selectedPlan.price}</div>
                    <div className="text-[10px] text-[#FAF8F5]/40 font-mono">{selectedPlan.period}</div>
                  </div>
                </div>

                {/* Card input mockup */}
                <div className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="block text-[11px] font-mono text-[#FAF8F5]/70 mb-1">TITULAIRE DE LA CARTE</label>
                    <input
                      required
                      type="text"
                      defaultValue="ESPOIR CHINOIS"
                      placeholder="Nom et prénom"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D0D12] border border-[#2A2A35] text-[#FAF8F5] font-mono focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#FAF8F5]/70 mb-1">NUMÉRO DE CARTE DE CRÉDIT</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        defaultValue="•••• •••• •••• 4242"
                        placeholder="16 chiffres"
                        className="w-full px-4 py-3 rounded-xl bg-[#0D0D12] border border-[#2A2A35] text-[#FAF8F5] font-mono focus:border-[#C9A84C] focus:outline-none"
                      />
                      <CreditCard className="w-4 h-4 text-[#C9A84C] absolute right-4 top-3.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-[#FAF8F5]/70 mb-1">EXPIRATION</label>
                      <input
                        required
                        type="text"
                        defaultValue="12 / 28"
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 rounded-xl bg-[#0D0D12] border border-[#2A2A35] text-[#FAF8F5] font-mono focus:border-[#C9A84C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#FAF8F5]/70 mb-1">CVC / CVV</label>
                      <input
                        required
                        type="password"
                        defaultValue="888"
                        placeholder="3 chiffres"
                        className="w-full px-4 py-3 rounded-xl bg-[#0D0D12] border border-[#2A2A35] text-[#FAF8F5] font-mono focus:border-[#C9A84C] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#FAF8F5]/50 pt-1">
                  <Lock className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>Chiffrement matériel de bout en bout • Agrément bancaire</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="btn-magnetic w-full py-4 rounded-full bg-[#C9A84C] text-[#0D0D12] text-xs font-bold uppercase tracking-wider mt-2 shadow-xl shadow-[#C9A84C]/25"
                >
                  <span className="btn-glide bg-[#FAF8F5]" />
                  <span className="btn-content flex items-center justify-center gap-2">
                    {isProcessingPayment ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0D0D12] border-t-transparent rounded-full animate-spin" />
                        <span>Chiffrement en cours...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Confirmer et Payer {selectedPlan.price}</span>
                      </>
                    )}
                  </span>
                </button>
              </form>
            ) : (
              /* Success confirmation */
              <div className="flex flex-col items-center text-center py-6 gap-4 animate-scaleUp">
                <div className="w-16 h-16 rounded-full bg-[#C9A84C]/20 border-2 border-[#C9A84C] flex items-center justify-center text-[#C9A84C]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-sans font-bold text-2xl text-[#FAF8F5]">Adhésion Confirmée</h4>
                <p className="text-xs font-mono text-[#C9A84C]">MEMBRE CERTIFIÉ #MM-089-2026</p>
                <p className="text-sm text-[#FAF8F5]/70 max-w-sm font-sans leading-relaxed">
                  Félicitations Espoir Chinois. Votre statut <span className="text-[#C9A84C] font-semibold">{selectedPlan.name}</span> est actif. Votre coffret et votre clé physique sont en cours de scellement.
                </p>
                <div className="w-full p-4 rounded-2xl bg-[#0D0D12] border border-[#C9A84C]/30 text-left font-mono text-xs text-[#FAF8F5]/80 space-y-1 mt-2">
                  <div className="text-[10px] text-[#FAF8F5]/40">REÇU FISCAL & TÉLÉMÉTRIE :</div>
                  <div className="text-[#C9A84C]">HASH : 0x9f4a8b1...e7c2</div>
                  <div>STATUT : TRANSACTION VALIDÉE (100% SECURE)</div>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="btn-magnetic px-8 py-3 rounded-full bg-[#C9A84C] text-[#0D0D12] text-xs font-bold uppercase tracking-wider mt-4"
                >
                  <span className="btn-glide bg-[#FAF8F5]" />
                  <span className="btn-content">Accéder à Mon Espace Membre</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   CARTE 1 — "Mélangeur Diagnostique"
   3 cartes superposées qui cyclent verticalement avec la logique
   array.unshift(array.pop()) toutes les 3 secondes avec une transition
   rebond élastique (cubic-bezier(0.34, 1.56, 0.64, 1)).
========================================================================= */
function DiagnosticShuffler() {
  const initialCards = [
    {
      id: 1,
      title: 'Chronométrie Quantique',
      sublabel: 'Précision atomique au femtoseconde',
      metric: '0.000 ms',
      status: 'CALIBRÉ',
    },
    {
      id: 2,
      title: 'Intendance Dédiée 24/7',
      sublabel: 'Réponse humaine garantie en 180s',
      metric: '2.4 min',
      status: 'OPÉRATIONNEL',
    },
    {
      id: 3,
      title: 'Registre Inviolable',
      sublabel: 'Garde fiduciaire physique et digitale',
      metric: '100% PRIVÉ',
      status: 'SCELLÉ',
    },
  ];

  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-[2.5rem] bg-[#14141B] border border-[#C9A84C]/25 p-7 flex flex-col justify-between shadow-xl min-h-[460px] relative overflow-hidden group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] text-[#C9A84C] tracking-widest uppercase">
            ARTEFACT 01 // CYCLE CONTINU
          </span>
          <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
        </div>
        <h3 className="font-sans font-bold text-2xl text-[#FAF8F5]">Mélangeur Diagnostique</h3>
        <p className="text-xs text-[#FAF8F5]/60 mt-1 font-sans">
          Rebalancement dynamique des 3 piliers de conservation temporelle.
        </p>
      </div>

      {/* Stacked Cards Area */}
      <div className="relative h-56 w-full flex items-center justify-center mt-6">
        {cards.map((card, index) => {
          // Dynamic styling based on position in stack (0 is top, 1 is mid, 2 is back)
          const translateY = index * 16;
          const scale = 1 - index * 0.07;
          const opacity = 1 - index * 0.25;
          const zIndex = 30 - index * 10;

          return (
            <div
              key={card.id}
              className="absolute w-full rounded-2xl p-5 border shadow-2xl transition-all"
              style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                transitionDuration: '800ms',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                backgroundColor: index === 0 ? '#1E1E28' : '#14141B',
                borderColor: index === 0 ? 'rgba(201, 168, 76, 0.4)' : 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] text-[#C9A84C] uppercase tracking-wider">
                  {card.status}
                </span>
                <span className="font-mono text-xs font-bold text-[#FAF8F5]">{card.metric}</span>
              </div>
              <h4 className="font-sans font-bold text-base text-[#FAF8F5] mt-3">{card.title}</h4>
              <p className="font-sans text-xs text-[#FAF8F5]/60 mt-1">{card.sublabel}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-[#2A2A35] flex items-center justify-between font-mono text-[10px] text-[#FAF8F5]/40">
        <span>CYCLE AUTOMATIQUE : 3000ms</span>
        <span className="text-[#C9A84C]">ÉLASTIQUE BEZIER</span>
      </div>
    </div>
  );
}

/* =========================================================================
   CARTE 2 — "Machine à Écrire Télémétrie"
   Un flux de texte monospace en direct qui tape des messages caractère
   par caractère avec un curseur clignotant accent champagne.
========================================================================= */
function TelemetryTypewriter() {
  const telemetryLogs = [
    '> [02:14:09] Connexion sécurisée au registre central de Genève...',
    '> [02:14:11] Dérive temporelle détectée : 0.000 ms. Tolérance parfaite.',
    '> [02:14:14] Coffre-fort numérique quantique synchronisé (AES-256-GCM).',
    '> [02:14:17] Authentification biométrique confirmée pour titulaire VIP.',
    '> [02:14:20] Déploiement du concierge prioritaire sur fuseau UTC+1.',
    '> [02:14:24] Archive immuable vérifiée. Zéro compromission enregistrée.',
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentFullText = telemetryLogs[currentLineIndex];

    if (charIndex < currentFullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentFullText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => {
        setDisplayedText('');
        setCharIndex(0);
        setCurrentLineIndex((prev) => (prev + 1) % telemetryLogs.length);
      }, 1800);
      return () => clearTimeout(pause);
    }
  }, [charIndex, currentLineIndex]);

  return (
    <div className="rounded-[2.5rem] bg-[#14141B] border border-[#C9A84C]/25 p-7 flex flex-col justify-between shadow-xl min-h-[460px] relative overflow-hidden group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] text-[#C9A84C] tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            FLUX EN DIRECT
          </span>
          <Radio className="w-4 h-4 text-[#C9A84C]" />
        </div>
        <h3 className="font-sans font-bold text-2xl text-[#FAF8F5]">Télémétrie en Direct</h3>
        <p className="text-xs text-[#FAF8F5]/60 mt-1 font-sans">
          Transmission cryptographique en temps réel des battements du club.
        </p>
      </div>

      {/* Terminal View */}
      <div className="my-6 rounded-2xl bg-[#0D0D12] border border-[#2A2A35] p-5 h-56 flex flex-col justify-between font-mono text-xs overflow-hidden relative shadow-inner">
        <div className="flex items-center justify-between border-b border-[#2A2A35] pb-2 text-[10px] text-[#FAF8F5]/40">
          <span>PORT // 443 TCP SECURE</span>
          <span className="text-[#C9A84C]">GENEVA_NODE_01</span>
        </div>

        <div className="flex-1 py-3 text-[#FAF8F5]/90 space-y-2 overflow-y-auto leading-relaxed">
          <div className="text-[#FAF8F5]/40 text-[11px]">
            &gt; Initialisation du flux temps réel... OK
          </div>
          <div className="text-[#C9A84C] font-mono">
            {displayedText}
            <span className="inline-block w-2 h-4 bg-[#C9A84C] ml-1 animate-pulse align-middle" />
          </div>
        </div>

        <div className="pt-2 border-t border-[#2A2A35] flex items-center justify-between text-[10px] text-[#FAF8F5]/40">
          <span>LATENCE : 1.2ms</span>
          <span className="text-emerald-400">CHIFFREMENT INTÈGRE</span>
        </div>
      </div>

      <div className="pt-4 border-t border-[#2A2A35] flex items-center justify-between font-mono text-[10px] text-[#FAF8F5]/40">
        <span>CURSEUR : ACTIF</span>
        <span className="text-[#C9A84C]">ASCII TÉLÉTYPE</span>
      </div>
    </div>
  );
}

/* =========================================================================
   CARTE 3 — "Planificateur Protocole Curseur"
   Grille hebdomadaire (L M M J V S D) où un curseur SVG animé entre,
   se déplace vers une cellule de jour, clique (scale 0.95), active le jour
   (surlignage accent), puis clique sur "Sauvegarder" avant de disparaître.
========================================================================= */
function ProtocolCursorPlanner() {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const [activeDay, setActiveDay] = useState(3); // 'J' (Jeudi) initially
  const [isClicking, setIsClicking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 30, y: 30, opacity: 0 });

  useEffect(() => {
    let timeoutId;
    const runAnimation = () => {
      // Step 1: Cursor appears and moves to day cell 'V' (index 4)
      setCursorPos({ x: 10, y: 80, opacity: 0 });
      setIsSaved(false);

      timeoutId = setTimeout(() => {
        // Move to Friday
        setCursorPos({ x: 195, y: 75, opacity: 1 });

        timeoutId = setTimeout(() => {
          // Click simulation
          setIsClicking(true);
          setActiveDay(4); // Select Friday

          timeoutId = setTimeout(() => {
            setIsClicking(false);

            timeoutId = setTimeout(() => {
              // Move cursor to "Sauvegarder" button
              setCursorPos({ x: 210, y: 145, opacity: 1 });

              timeoutId = setTimeout(() => {
                // Click save button
                setIsClicking(true);
                setIsSaved(true);

                timeoutId = setTimeout(() => {
                  setIsClicking(false);

                  timeoutId = setTimeout(() => {
                    // Fade out cursor and loop
                    setCursorPos({ x: 250, y: 170, opacity: 0 });
                  }, 800);
                }, 400);
              }, 600);
            }, 600);
          }, 350);
        }, 800);
      }, 500);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="rounded-[2.5rem] bg-[#14141B] border border-[#C9A84C]/25 p-7 flex flex-col justify-between shadow-xl min-h-[460px] relative overflow-hidden group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] text-[#C9A84C] tracking-widest uppercase">
            ARTEFACT 03 // PLANIFICATION
          </span>
          <Compass className="w-4 h-4 text-[#C9A84C]" />
        </div>
        <h3 className="font-sans font-bold text-2xl text-[#FAF8F5]">Planificateur Protocole</h3>
        <p className="text-xs text-[#FAF8F5]/60 mt-1 font-sans">
          Réservation autonome de créneaux horlogers prioritaires.
        </p>
      </div>

      {/* Interactive Planner Surface */}
      <div className="relative my-6 rounded-2xl bg-[#0D0D12] border border-[#2A2A35] p-5 h-56 flex flex-col justify-between overflow-hidden">
        <div>
          <span className="font-mono text-[10px] text-[#FAF8F5]/40 uppercase tracking-widest block mb-3">
            SÉLECTIONNER LE CRÉNEAU SEMAINE
          </span>

          {/* Days of week grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const isSelected = activeDay === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveDay(idx)}
                  className={`h-11 rounded-xl font-mono text-xs font-semibold flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#C9A84C] text-[#0D0D12] shadow-lg shadow-[#C9A84C]/30 scale-105'
                      : 'bg-[#181824] text-[#FAF8F5]/70 hover:bg-[#2A2A35] hover:text-white'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-3 border-t border-[#2A2A35]">
          <span className="font-mono text-[10px] text-[#FAF8F5]/50">
            {isSaved ? 'CRÉNEAU VALIDÉ' : 'EN ATTENTE'}
          </span>
          <div
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
              isSaved
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/40'
            }`}
          >
            {isSaved ? '✓ Enregistré' : 'Sauvegarder'}
          </div>
        </div>

        {/* Autonomous Animated SVG Cursor */}
        <div
          className="pointer-events-none absolute z-20 transition-all"
          style={{
            transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) scale(${isClicking ? 0.85 : 1})`,
            opacity: cursorPos.opacity,
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <svg className="w-6 h-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24">
            <path
              d="M3 3l7 18 3-7 7-3L3 3z"
              fill="#C9A84C"
              stroke="#FAF8F5"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="pt-4 border-t border-[#2A2A35] flex items-center justify-between font-mono text-[10px] text-[#FAF8F5]/40">
        <span>INTERACTION : VECTORIELLE</span>
        <span className="text-[#C9A84C]">AUTONOME</span>
      </div>
    </div>
  );
}
