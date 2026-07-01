import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Shield, CheckCircle2, Briefcase, Globe2, Plane, Ship, Building2, Car,
  ShieldCheck, CreditCard, Ticket, Package, PartyPopper, ArrowRight, ChevronDown,
  Instagram, Phone, MapPin, Quote, Star, Plus, Minus,
} from "lucide-react";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const WA_BASE = "https://wa.me/5511991335192";
const wa = (text: string) => `${WA_BASE}?text=${encodeURIComponent(text)}`;

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ---------------- Reveal helper ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const } }),
};

/* ---------------- Scroll progress bar ---------------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-gold"
    />
  );
}

/* ---------------- Navbar ---------------- */
function Navbar({ onCta }: { onCta: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,30,63,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(245,184,65,0.15)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 md:h-[76px] md:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-2 md:gap-3">
          <span className="font-display truncate text-base font-bold text-gold sm:text-xl md:text-2xl">
            Viagem dos Sonhos
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Destinos", "#destinos"],
            ["Serviços", "#servicos"],
            ["Como Funciona", "#como-funciona"],
            ["Contato", "#contato"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-offwhite/85 transition hover:text-gold">
              {label}
            </a>
          ))}
        </nav>
        <button
          onClick={onCta}
          className="shrink-0 rounded-full bg-gold px-3 py-2 font-label text-[10px] font-semibold text-navy-deep transition hover:brightness-110 md:px-5 md:py-2.5 md:text-xs"
        >
          <span className="md:hidden">Cotação</span>
          <span className="hidden md:inline">Solicitar Cotação</span>
        </button>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ onCta }: { onCta: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.div
        style={{
          y,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80')",
        }}
        className="absolute inset-0 -top-20 -bottom-20 bg-navy-deep bg-cover bg-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(10,30,63,0.85) 0%, rgba(10,30,63,0.55) 60%, rgba(10,30,63,0.35) 100%)",
        }}
      />
      {/* Gold particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gold"
            style={{
              width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
              left: `${(i * 47) % 100}%`, top: `${(i * 83) % 100}%`,
              opacity: 0.3,
              animation: `pulse-ring 4s ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
      {/* Plane */}
      <div className="pointer-events-none absolute left-0 top-1/3 hidden md:block" style={{ animation: "fly-across 22s linear infinite" }}>
        <Plane size={38} className="text-gold/70" style={{ transform: "rotate(-12deg)" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-24">
        <motion.div
          initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-3xl text-center md:text-left"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/5 px-4 py-2 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-label text-[11px] text-offwhite">Agente Autorizado CVC</span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display mt-6 text-offwhite"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Sua próxima história começa <em className="text-gold">com uma viagem</em>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-[540px] text-lg text-offwhite/85 md:mx-0">
            Passagens, pacotes, cruzeiros e experiências inesquecíveis. Viaje com quem entende do assunto e realiza sonhos.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <button
              onClick={onCta}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-label text-sm font-semibold text-navy-deep transition hover:brightness-110"
            >
              Solicitar Cotação <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </button>
            <a
              href="#destinos"
              className="inline-flex items-center justify-center rounded-full border border-offwhite/70 px-8 py-4 font-label text-sm text-offwhite transition hover:bg-offwhite hover:text-navy-deep"
            >
              Ver Destinos
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-offwhite/70"
      >
        <span className="font-label text-[10px]">role para descobrir</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={20} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- Trust bar ---------------- */
function TrustBar() {
  const items = [
    { Icon: Shield, text: "Segurança em cada etapa da sua viagem" },
    { Icon: CheckCircle2, text: "Confiança de quem é líder em turismo" },
    { Icon: Briefcase, text: "Os melhores pacotes, passagens e hotéis" },
    { Icon: Globe2, text: "Atendimento especializado para realizar seu sonho" },
  ];
  return (
    <section className="bg-navy-deep py-10" style={{ borderTop: "1px solid rgba(245,184,65,0.15)", borderBottom: "1px solid rgba(245,184,65,0.15)" }}>
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-4"
      >
        {items.map(({ Icon, text }, i) => (
          <motion.div key={i} variants={fadeUp} custom={i} className="flex items-start gap-4">
            <div className="rounded-full border border-gold/40 bg-gold/10 p-3">
              <Icon size={22} className="text-gold" />
            </div>
            <p className="text-sm leading-relaxed text-offwhite/90">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------- Storytelling ---------------- */
function Storytelling() {
  return (
    <section className="bg-offwhite py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="font-label text-xs text-gold">
          Nossa filosofia
        </motion.p>
        <motion.h2
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}
          className="font-display mt-4 text-navy-deep"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.01em" }}
        >
          Não vendemos viagens. <em className="text-royal">Realizamos sonhos.</em>
        </motion.h2>
        <motion.p
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={2}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-navy/70"
        >
          Cada destino é uma nova história esperando para ser vivida. Cuidamos de cada detalhe, das passagens à hospedagem, para que você viva experiências que ficam para sempre.
        </motion.p>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2">
        {[
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80",
        ].map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  const items = [
    { Icon: Ticket, t: "Passagens Aéreas", d: "Nacionais e internacionais com as melhores condições" },
    { Icon: Package, t: "Pacotes de Viagens", d: "Roteiros completos para você só se preocupar em aproveitar" },
    { Icon: Ship, t: "Cruzeiros", d: "As melhores experiências a bordo pelos mares do mundo" },
    { Icon: Briefcase, t: "Viagens Corporativas", d: "Soluções completas para viagens empresariais" },
    { Icon: Building2, t: "Hospedagem", d: "Os melhores hotéis para a sua estadia perfeita" },
    { Icon: PartyPopper, t: "Excursões e Eventos", d: "Eventos esportivos e excursões inesquecíveis" },
    { Icon: Car, t: "Locação de Veículos", d: "Liberdade para explorar o seu destino" },
    { Icon: ShieldCheck, t: "Seguro Viagem", d: "Viaje com total tranquilidade e segurança" },
    { Icon: CreditCard, t: "Parcelamento Facilitado", d: "Realize sua viagem com condições que cabem no bolso" },
  ];
  return (
    <section id="servicos" className="bg-sand py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
          <p className="font-label text-xs text-gold">Serviços completos</p>
          <h2 className="font-display mt-3 text-navy-deep" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.01em" }}>
            O que oferecemos
          </h2>
        </motion.div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(({ Icon, t, d }, i) => (
            <motion.div
              key={t} variants={fadeUp} custom={i}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-navy/10 bg-white/70 p-7 backdrop-blur transition hover:shadow-2xl hover:shadow-navy/10"
              style={{ boxShadow: "0 2px 20px -8px rgba(10,30,63,0.08)" }}
            >
              <div className="mb-5 inline-flex rounded-xl bg-gold/15 p-3 text-gold ring-1 ring-gold/30">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-xl text-navy-deep">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">{d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Destinations ---------------- */
function Destinations({ onPick }: { onPick: (dest: string) => void }) {
  const items = [
    { name: "Maldivas", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80" },
    { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80" },
    { name: "Cancún", img: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=1400&q=80" },
    { name: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80" },
    { name: "Nordeste Brasileiro", img: "https://images.unsplash.com/photo-1518509562904-e7ef99cddc85?auto=format&fit=crop&w=1400&q=80" },
    { name: "Europa", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1400&q=80" },
  ];
  return (
    <section id="destinos" className="bg-navy-deep py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
          <p className="font-label text-xs text-gold">Para onde o mundo vai te levar?</p>
          <h2 className="font-display mt-3 text-offwhite" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.01em" }}>
            Destinos que inspiram
          </h2>
        </motion.div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(({ name, img }, i) => (
            <motion.div
              key={name} variants={fadeUp} custom={i}
              whileHover={{ y: -8 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <img
                src={img} alt={name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 transition"
                style={{ background: "linear-gradient(180deg, transparent 40%, rgba(10,30,63,0.85) 100%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-3xl text-offwhite" style={{ letterSpacing: "-0.01em" }}>{name}</h3>
                <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  <button
                    onClick={() => onPick(name)}
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-label text-xs font-semibold text-navy-deep"
                  >
                    Quero ir para cá <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Conte seu sonho", d: "Você nos diz para onde quer ir e o que imagina para a viagem" },
    { n: "02", t: "Montamos tudo", d: "Criamos um roteiro personalizado com as melhores condições" },
    { n: "03", t: "Boa viagem", d: "Você viaja tranquilo enquanto cuidamos de cada detalhe" },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="como-funciona" className="bg-offwhite py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
          <p className="font-label text-xs text-gold">Passo a passo</p>
          <h2 className="font-display mt-3 text-navy-deep" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.01em" }}>
            Como realizamos o seu sonho
          </h2>
        </motion.div>

        <div ref={ref} className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="absolute left-8 right-8 top-8 hidden h-px bg-navy/10 md:block" />
          <motion.div style={{ scaleX, transformOrigin: "0% 50%" }} className="absolute left-8 right-8 top-8 hidden h-px bg-gold md:block" />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative text-center md:text-left"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-deep font-display text-xl text-gold ring-8 ring-offwhite md:mx-0">
                {s.n}
              </div>
              <h3 className="font-display mt-6 text-2xl text-navy-deep">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */
function Gallery() {
  const imgs = [
    { src: "https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1400&q=80", span: "md:col-span-2 md:row-span-2 aspect-square" },
    { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80", span: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80", span: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1400&q=80", span: "md:col-span-2 aspect-[2/1]" },
    { src: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80", span: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1000&q=80", span: "aspect-square" },
  ];
  return (
    <section className="bg-sand py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12 text-center">
          <p className="font-label text-xs text-gold">Momentos</p>
          <h2 className="font-display mt-3 text-navy-deep" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.01em" }}>
            Viagens que viram memórias
          </h2>
        </motion.div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-4 md:grid-cols-4"
        >
          {imgs.map((img, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className={`overflow-hidden rounded-xl ${img.span}`}>
              <img src={img.src} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Quiz ---------------- */
type Cat = "praia" | "cultura" | "aventura" | "luxo";
const questions: { q: string; opts: { label: string; cat: Cat }[] }[] = [
  { q: "Qual tipo de cenário mais te atrai?", opts: [
    { label: "Praias paradisíacas", cat: "praia" }, { label: "Cidades históricas e cultura", cat: "cultura" },
    { label: "Aventura e natureza", cat: "aventura" }, { label: "Luxo e sofisticação", cat: "luxo" }] },
  { q: "Como você imagina a viagem dos sonhos?", opts: [
    { label: "Relaxando sem pressa", cat: "praia" }, { label: "Explorando cada detalhe", cat: "cultura" },
    { label: "Vivendo emoções fortes", cat: "aventura" }, { label: "Com todo o conforto possível", cat: "luxo" }] },
  { q: "Com quem você costuma viajar?", opts: [
    { label: "Em família", cat: "praia" }, { label: "Com meu par", cat: "luxo" },
    { label: "Com amigos", cat: "aventura" }, { label: "Sozinho ou a trabalho", cat: "cultura" }] },
  { q: "O que não pode faltar na sua viagem?", opts: [
    { label: "Sol e mar", cat: "praia" }, { label: "Museus e gastronomia", cat: "cultura" },
    { label: "Trilhas e adrenalina", cat: "aventura" }, { label: "Hotéis incríveis", cat: "luxo" }] },
  { q: "Qual clima combina mais com você?", opts: [
    { label: "Calor tropical", cat: "praia" }, { label: "Clima ameno de cidade", cat: "cultura" },
    { label: "Ar livre e natureza", cat: "aventura" }, { label: "Tanto faz, quero conforto", cat: "luxo" }] },
  { q: "Quanto tempo você quer que a viagem dure?", opts: [
    { label: "Uma semana relaxando", cat: "praia" }, { label: "Alguns dias explorando", cat: "cultura" },
    { label: "O máximo de aventura possível", cat: "aventura" }, { label: "O tempo do requinte", cat: "luxo" }] },
  { q: "O que faria essa viagem ser inesquecível?", opts: [
    { label: "Pôr do sol na praia", cat: "praia" }, { label: "Descobrir uma nova cultura", cat: "cultura" },
    { label: "Uma experiência radical", cat: "aventura" }, { label: "Ser tratado como realeza", cat: "luxo" }] },
];
const results: Record<Cat, { title: string; text: string; wa: string }> = {
  praia: {
    title: "Seu destino é o paraíso tropical",
    text: "Você merece sol, mar e descanso. Que tal Maldivas, Cancún ou o Nordeste brasileiro? Vamos montar isso para você!",
    wa: wa("Fiz o quiz e meu destino ideal é praia! Quero uma cotação."),
  },
  cultura: {
    title: "Seu destino é uma imersão cultural",
    text: "Cidades históricas, gastronomia e arte te esperam. Paris, Europa ou destinos cheios de história combinam com você!",
    wa: wa("Fiz o quiz e meu destino ideal é cultural! Quero uma cotação."),
  },
  aventura: {
    title: "Seu destino é pura adrenalina",
    text: "Trilhas, natureza e emoção são a sua praia. Vamos encontrar o destino de aventura perfeito para você!",
    wa: wa("Fiz o quiz e meu destino ideal é aventura! Quero uma cotação."),
  },
  luxo: {
    title: "Seu destino é o requinte absoluto",
    text: "Você merece o melhor. Dubai, resorts exclusivos e experiências de luxo esperam por você. Vamos realizar?",
    wa: wa("Fiz o quiz e meu destino ideal é luxo! Quero uma cotação."),
  },
};

function Quiz({ onLead }: { onLead: (url: string, title: string) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Cat[]>([]);
  const done = step >= questions.length;

  const winner: Cat = (() => {
    const counts = { praia: 0, cultura: 0, aventura: 0, luxo: 0 } as Record<Cat, number>;
    answers.forEach((a) => counts[a]++);
    return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] as Cat) ?? "praia";
  })();

  function pick(c: Cat) {
    setAnswers((prev) => [...prev, c]);
    setStep((s) => s + 1);
  }
  function reset() { setStep(0); setAnswers([]); }

  const progress = (step / questions.length) * 100;

  return (
    <section className="bg-navy-deep py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-10 text-center">
          <p className="font-label text-xs text-gold">Descubra sua viagem</p>
          <h2 className="font-display mt-3 text-offwhite" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.01em" }}>
            Qual é o seu próximo destino?
          </h2>
          <p className="mt-3 text-gold/90">Responda 7 perguntas e descubra a viagem perfeita para você.</p>
        </motion.div>

        <div
          className="relative rounded-3xl p-8 md:p-10"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(245,184,65,0.35)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6), 0 0 60px -30px rgba(245,184,65,0.3)",
          }}
        >
          {!done && (
            <>
              <div className="mb-2 flex items-center justify-between font-label text-[10px] text-offwhite/70">
                <span>Pergunta {step + 1} de {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full bg-gold" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
              </div>
            </>
          )}

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <h3 className="font-display text-2xl text-offwhite md:text-3xl">{questions[step].q}</h3>
                <div className="mt-6 grid gap-3">
                  {questions[step].opts.map((o) => (
                    <button
                      key={o.label}
                      onClick={() => pick(o.cat)}
                      className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-left text-offwhite transition hover:border-gold hover:bg-gold/10"
                    >
                      <span>{o.label}</span>
                      <ArrowRight size={16} className="text-gold opacity-0 transition group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 text-center"
              >
                <p className="font-label text-xs text-gold">Seu resultado</p>
                <h3 className="font-display mt-3 text-3xl text-offwhite md:text-4xl">{results[winner].title}</h3>
                <p className="mx-auto mt-4 max-w-xl text-offwhite/80">{results[winner].text}</p>
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => onLead(results[winner].wa, "Quero essa viagem")}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 font-label text-sm font-semibold text-navy-deep transition hover:brightness-110"
                  >
                    <WhatsAppIcon size={20} /> Quero Essa Viagem
                  </button>
                  <button
                    onClick={reset}
                    className="inline-flex w-full items-center justify-center rounded-full border border-offwhite/40 px-6 py-3 font-label text-xs text-offwhite transition hover:bg-white/10"
                  >
                    Refazer o quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials({ onCta }: { onCta: () => void }) {
  const items = [
    { t: "A Viagem dos Sonhos cuidou de absolutamente tudo na nossa lua de mel nas Maldivas. Foi impecável, do voo ao hotel. Recomendo de olhos fechados!", n: "Ana e Pedro", r: "Lua de mel, Maldivas" },
    { t: "Precisava organizar uma viagem corporativa para minha equipe e foi tudo resolvido com rapidez e profissionalismo. Melhor agência que já contratei.", n: "Ricardo M.", r: "Viagem corporativa" },
    { t: "Sempre sonhei em conhecer a Europa e eles montaram um roteiro perfeito, dentro do meu orçamento e parcelado. Experiência inesquecível!", n: "Juliana S.", r: "Pacote Europa" },
    { t: "Atendimento nota mil! Tiraram todas as minhas dúvidas e conseguiram passagens muito mais baratas do que eu tinha achado. Voltarei a viajar com eles com certeza.", n: "Carlos A.", r: "Passagens internacionais" },
  ];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  return (
    <section className="bg-offwhite py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12 text-center">
          <p className="font-label text-xs text-gold">Experiências</p>
          <h2 className="font-display mt-3 text-navy-deep" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.01em" }}>
            Quem viajou, recomenda
          </h2>
          <p className="mt-3 text-navy/60">Histórias reais de quem confiou seus sonhos a nós.</p>
        </motion.div>

        <div
          className="relative rounded-3xl p-8 md:p-10"
          style={{
            background: "rgba(10,30,63,0.03)",
            border: "1px solid rgba(245,184,65,0.4)",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="text-gold" size={36} />
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-display mt-4 text-xl italic leading-relaxed text-navy-deep md:text-2xl">
                {items[idx].t}
              </p>
              <div className="mt-6 h-px w-16 bg-gold" />
              <div className="mt-6 flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-navy-deep/10" />
                <div>
                  <p className="font-label text-sm text-gold">{items[idx].n}</p>
                  <p className="text-xs text-navy/60">{items[idx].r}</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i} onClick={() => setIdx(i)}
                className="h-1.5 rounded-full transition-all"
                style={{ width: i === idx ? 24 : 8, background: i === idx ? "var(--gold)" : "rgba(10,30,63,0.2)" }}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onCta}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-label text-sm font-semibold text-navy-deep transition hover:brightness-110"
          >
            Quero realizar meu sonho <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCta({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-32">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2400&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,30,63,0.85), rgba(10,30,63,0.95))" }} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-display text-offwhite"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          Sua viagem dos sonhos <em className="text-gold">começa aqui</em>
        </motion.h2>
        <p className="mt-6 text-gold/90">Solicite sua cotação agora, sem compromisso.</p>
        <button
          onClick={onCta}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-10 py-5 font-label text-sm font-semibold text-navy-deep transition hover:brightness-110"
        >
          Solicitar Minha Cotação <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    ["Como solicito uma cotação?", "É só clicar em \"Solicitar Cotação\", preencher seu nome e você será direcionado para o nosso WhatsApp, onde faremos um atendimento personalizado para a sua viagem."],
    ["Vocês são uma agência confiável?", "Sim! Somos agente autorizado CVC, líder em turismo no Brasil, oferecendo segurança e confiança em cada etapa da sua viagem."],
    ["Quais serviços vocês oferecem?", "Passagens aéreas nacionais e internacionais, pacotes de viagens, cruzeiros, viagens corporativas, hospedagem, excursões, eventos esportivos, locação de veículos e seguro viagem."],
    ["É possível parcelar a viagem?", "Sim, oferecemos parcelamento facilitado para que você realize a sua viagem com condições que cabem no seu bolso."],
    ["Vocês atendem viagens corporativas?", "Sim, temos soluções completas para viagens empresariais, com atendimento personalizado para você ou sua empresa."],
    ["O atendimento é presencial ou online?", "Atendemos todo o Brasil de forma online, pelo WhatsApp, com todo o cuidado e agilidade que a sua viagem merece."],
    ["Vocês ajudam a escolher o destino?", "Com certeza! Nossa equipe é especializada e te ajuda a escolher o destino perfeito de acordo com o seu perfil, orçamento e sonhos."],
    ["Como funciona o seguro viagem?", "Oferecemos seguro viagem para que você viaje com total tranquilidade e proteção. Informamos todos os detalhes na sua cotação."],
  ] as const;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-sand py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12 text-center">
          <p className="font-label text-xs text-gold">Dúvidas frequentes</p>
          <h2 className="font-display mt-3 text-navy-deep" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.01em" }}>
            Perguntas frequentes
          </h2>
        </motion.div>
        <div className="divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white/50 backdrop-blur">
          {items.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg text-navy-deep">{q}</span>
                  <span className="rounded-full bg-gold/20 p-2 text-gold">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-navy/70">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer id="contato" className="bg-navy-deep py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-3">
        <div>
          <img src="" alt="Viagem dos Sonhos" style={{ height: 60, objectFit: "contain" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          <p className="font-display text-2xl font-bold text-gold">Viagem dos Sonhos</p>
          <p className="mt-3 text-sm text-offwhite/70">Agência de Viagens, Agente Autorizado CVC</p>
          <p className="mt-1 text-sm text-offwhite/60 italic">Transformando sonhos em viagens inesquecíveis</p>
        </div>
        <div>
          <p className="font-label text-xs text-gold">Contato</p>
          <a href="https://wa.me/5511991335192" target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-2 text-sm text-offwhite/85 hover:text-gold">
            <Phone size={14} /> (11) 99133-5192
          </a>
          <a href="https://instagram.com/agenciaviagensdossonhos" target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-2 text-sm text-offwhite/85 hover:text-gold">
            <Instagram size={14} /> @agenciaviagensdossonhos
          </a>
          <p className="mt-2 flex items-center gap-2 text-sm text-offwhite/60">
            <MapPin size={14} /> Atendimento em todo o Brasil
          </p>
        </div>
        <div>
          <p className="font-label text-xs text-gold">Navegação</p>
          <ul className="mt-3 space-y-2 text-sm text-offwhite/85">
            <li><a href="#destinos" className="hover:text-gold">Destinos</a></li>
            <li><a href="#servicos" className="hover:text-gold">Serviços</a></li>
            <li><a href="#como-funciona" className="hover:text-gold">Como Funciona</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-6 pt-6 text-center text-xs text-offwhite/50">
        © 2026 Viagem dos Sonhos. Todos os direitos reservados.
      </div>
    </footer>
  );
}

/* ---------------- Floating WhatsApp ---------------- */
function FloatingWhatsApp({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition hover:scale-105"
      style={{ background: "#25D366", animation: "pulse-ring 2.4s infinite" }}
    >
      <WhatsAppIcon size={28} />
    </button>
  );
}

/* ---------------- Page ---------------- */
function HomePage() {
  const [modal, setModal] = useState<{ open: boolean; url: string; title?: string }>({
    open: false, url: wa("Quero uma cotação de viagem."),
  });

  const openLead = (url: string, title?: string) => setModal({ open: true, url, title });
  const closeLead = () => setModal((m) => ({ ...m, open: false }));

  return (
    <div className="min-h-screen bg-offwhite text-navy-deep">
      <ScrollProgress />
      <Navbar onCta={() => openLead(wa("Quero solicitar uma cotação de viagem."), "Solicitar cotação")} />
      <main>
        <Hero onCta={() => openLead(wa("Quero solicitar uma cotação de viagem."), "Solicitar cotação")} />
        <TrustBar />
        <Storytelling />
        <Services />
        <Destinations onPick={(dest) => openLead(wa(`Quero uma cotação para ${dest}!`), `Vamos para ${dest}?`)} />
        <HowItWorks />
        <Gallery />
        <Quiz onLead={(url, title) => openLead(url, title)} />
        <Testimonials onCta={() => openLead(wa("Vi os depoimentos e quero uma cotação de viagem."), "Realizar meu sonho")} />
        <FinalCta onCta={() => openLead(wa("Quero solicitar minha cotação de viagem."), "Solicitar cotação")} />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp onClick={() => openLead(wa("Olá! Gostaria de uma cotação de viagem."), "Falar no WhatsApp")} />
      <LeadCaptureModal open={modal.open} onClose={closeLead} whatsappUrl={modal.url} title={modal.title} />
    </div>
  );
}
