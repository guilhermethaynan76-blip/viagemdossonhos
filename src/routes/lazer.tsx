import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Shield, CheckCircle2, Briefcase, Globe, Plane, Ship, Building2, Car, Umbrella, CreditCard, Ticket, ArrowRight, Menu, X, Instagram, Star, ChevronDown } from "lucide-react";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";

export const Route = createFileRoute("/lazer")({
  head: () => ({
    meta: [
      { title: "Viagens dos Sonhos | Lazer, Pacotes, Cruzeiros e Destinos" },
      { name: "description", content: "Passagens, pacotes, cruzeiros e experiências inesquecíveis. Viaje com quem entende do assunto e realiza sonhos." },
      { property: "og:title", content: "Viagens dos Sonhos | Lazer" },
      { property: "og:description", content: "Passagens, pacotes, cruzeiros e experiências inesquecíveis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LazerPage,
});

const WA_BASE = "https://wa.me/5511932195053";
const WA_LAZER = `${WA_BASE}?text=Olá,+gostaria+de+uma+cotação+de+viagem+de+lazer.`;
const LOGO = "https://res.cloudinary.com/dkwpz87nw/image/upload/v1782936767/WhatsApp_Image_2026-07-01_at_17.08.32-removebg-preview_bjdwhz.png";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// Reusable helpers
const playfair = { fontFamily: '"Playfair Display", serif' } as const;

function LazerPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState(WA_LAZER);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openLead(url: string = WA_LAZER, title?: string) {
    setModalUrl(url);
    setModalTitle(title);
    setModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#0A2540] text-[#FAFCFF]">
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-[#F26722]" />

      {/* NAVBAR */}
      <nav className={`fixed left-0 right-0 top-0 z-50 h-[76px] transition-all ${scrolled ? "bg-[#0A2540]/95 backdrop-blur-xl border-b border-white/10" : "bg-[#0A2540] border-b border-white/10"}`}>
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img src={LOGO} alt="Viagens dos Sonhos" className="h-[52px] w-auto object-contain" />
            <span className="text-base italic text-white md:text-lg" style={playfair}>Viagens dos Sonhos</span>
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            <a href="#destinos" className="text-sm text-white/90 hover:text-white">Destinos</a>
            <a href="#servicos" className="text-sm text-white/90 hover:text-white">Serviços</a>
            <a href="#como" className="text-sm text-white/90 hover:text-white">Como Funciona</a>
            <a href="#contato" className="text-sm text-white/90 hover:text-white">Contato</a>
            <Link to="/" className="text-sm text-[#F26722] hover:text-[#F58B4E]">Corporativo</Link>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => openLead()} className="hidden rounded-full bg-[#F26722] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#F58B4E] md:inline-flex">
              Solicitar Cotação
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-md p-2 text-white lg:hidden" aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute left-0 right-0 top-[76px] border-b border-white/10 bg-[#0A2540] lg:hidden">
              <div className="flex flex-col gap-1 p-4">
                {[["Destinos","#destinos"],["Serviços","#servicos"],["Como Funciona","#como"],["Contato","#contato"]].map(([l,h]) => (
                  <a key={h} href={h} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-3 text-sm text-white hover:bg-white/10">{l}</a>
                ))}
                <Link to="/" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold text-[#F26722] hover:bg-white/10">Corporativo</Link>
                <button onClick={() => { setMobileOpen(false); openLead(); }} className="mt-2 rounded-full bg-[#F26722] px-5 py-3 text-sm font-semibold text-white">Solicitar Cotação</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="top">
        <Hero openLead={openLead} />
        <TrustBar />
        <Storytelling />
        <Services />
        <Destinations openLead={openLead} />
        <HowItWorks />
        <Gallery />
        <Quiz openLead={openLead} />
        <Testimonials openLead={openLead} />
        <FinalCTA openLead={openLead} />
        <FAQ />
        <Footer />
      </main>

      <button onClick={() => openLead()} aria-label="WhatsApp" className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl" style={{ animation: "pulse-ring 2s infinite" }}>
        <WhatsAppIcon className="h-7 w-7" />
      </button>

      <LeadCaptureModal open={modalOpen} onClose={() => setModalOpen(false)} whatsappUrl={modalUrl} title={modalTitle} />
    </div>
  );
}

/* HERO */
function Hero({ openLead }: { openLead: (u?: string, t?: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const parts = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5, vy: Math.random() * 0.4 + 0.1, vx: (Math.random() - 0.5) * 0.2,
    }));
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(242,103,34,0.35)";
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y > canvas.height) { p.y = 0; p.x = Math.random() * canvas.width; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-[100px] md:pt-[76px]">
      <div className="absolute inset-0">
        <video
          src="https://res.cloudinary.com/dkwpz87nw/video/upload/v1782926486/202607011336_xnjn4j.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&q=80"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,30,63,0.7), rgba(6,24,56,0.4))" }} />
      </div>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />


      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-3xl text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F26722]/60 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
            <Star className="h-3.5 w-3.5 text-[#F26722]" /> Agente Autorizado CVC
          </span>
          <h1 className="mt-6 text-white" style={{ ...playfair, fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}>
            Sua próxima <em className="text-[#F26722]">história</em> começa com uma viagem
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90">
            Passagens, pacotes, cruzeiros e experiências inesquecíveis. Viaje com quem entende do assunto e realiza sonhos.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <button onClick={() => openLead()} className="rounded-full bg-[#F26722] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#F58B4E]">
              Solicitar Cotação
            </button>
            <a href="#destinos" className="rounded-full border border-white/70 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Ver Destinos
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-white/70"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}

/* TRUST BAR */
function TrustBar() {
  const items = [
    { icon: Shield, text: "Segurança em cada etapa da sua viagem" },
    { icon: CheckCircle2, text: "Confiança de quem é líder em turismo" },
    { icon: Briefcase, text: "Os melhores pacotes, passagens e hotéis" },
    { icon: Globe, text: "Atendimento especializado para realizar seu sonho" },
  ];
  return (
    <section className="border-y border-white/5 bg-[#0A2540] py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-4 md:px-8">
        {items.map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
            <it.icon className="h-6 w-6 shrink-0 text-[#F26722]" />
            <span className="text-sm text-white/85">{it.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* STORYTELLING */
function Storytelling() {
  return (
    <section className="relative overflow-hidden bg-[#F0E9DA] py-28 text-[#0A2540]">
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0E86D4] opacity-[0.07] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full bg-[#F26722] opacity-[0.05] blur-3xl" />
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="60%" x2="100%" y2="60%" stroke="#0E86D4" strokeOpacity="0.08" strokeDasharray="6 10" /></svg>
      <div className="mx-auto max-w-5xl px-4 text-center md:px-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ ...playfair, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}>
          Não vendemos viagens. <em className="text-[#F26722]">Realizamos sonhos.</em>
        </motion.h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#64748B]">
          Cada destino é uma nova história esperando para ser vivida. Cuidamos de cada detalhe, das passagens à hospedagem, para que você viva experiências que ficam para sempre.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <img src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80" alt="Família feliz viajando junta" className="h-80 w-full rounded-2xl object-cover shadow-lg" />
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80" alt="Família curtindo viagem" className="h-80 w-full rounded-2xl object-cover shadow-lg" />
        </div>
      </div>
    </section>
  );
}

/* SERVICES */
function Services() {
  const items = [
    { icon: Plane, t: "Passagens Aéreas", d: "Nacionais e internacionais com as melhores condições" },
    { icon: Briefcase, t: "Pacotes de Viagens", d: "Roteiros completos para você só se preocupar em aproveitar" },
    { icon: Ship, t: "Cruzeiros", d: "As melhores experiências a bordo pelos mares do mundo" },
    { icon: Building2, t: "Viagens Corporativas", d: "Soluções completas para viagens empresariais" },
    { icon: Building2, t: "Hospedagem", d: "Os melhores hotéis para a sua estadia perfeita" },
    { icon: Ticket, t: "Excursões e Eventos", d: "Eventos esportivos e excursões inesquecíveis" },
    { icon: Car, t: "Locação de Veículos", d: "Liberdade para explorar o seu destino" },
    { icon: Umbrella, t: "Seguro Viagem", d: "Viaje com total tranquilidade e segurança" },
    { icon: CreditCard, t: "Parcelamento Facilitado", d: "Realize sua viagem com condições que cabem no bolso" },
  ];
  return (
    <section id="servicos" className="bg-[#F4EEE2] py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <p className="font-label text-xs font-semibold text-[#F26722]" style={{ letterSpacing: "0.14em" }}>SERVIÇOS</p>
          <h2 className="mt-3 text-[#0A2540]" style={{ ...playfair, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            <em>O que oferecemos</em>
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-white/60 bg-white/70 p-8 shadow-sm backdrop-blur transition-all hover:-translate-y-1.5 hover:shadow-xl"
            >
              <s.icon className="h-10 w-10 text-[#F26722]" strokeWidth={1.5} />
              <h3 className="mt-5 text-xl font-semibold text-[#0A2540]">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* DESTINATIONS */
function Destinations({ openLead }: { openLead: (u?: string, t?: string) => void }) {
  const dests = [
    { name: "Maldivas", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80" },
    { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80" },
    { name: "Cancún", img: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=1200&q=80" },
    { name: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80" },
    { name: "Nordeste Brasileiro", img: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=1200&q=80" },
    { name: "Europa", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80" },
  ];
  return (
    <section id="destinos" className="bg-[#0A2540] py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-white" style={{ ...playfair, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Destinos que <em className="text-[#F26722]">inspiram</em>
          </h2>
          <p className="mt-3 text-[#F26722]">Para onde o mundo vai te levar?</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dests.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl transition-transform hover:-translate-y-2"
            >
              <img src={d.img} alt={d.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,24,56,0.9), rgba(6,24,56,0.1) 60%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-2xl text-white" style={playfair}>{d.name}</h3>
                <button
                  onClick={() => openLead(`${WA_BASE}?text=Quero+conhecer+${encodeURIComponent(d.name)}!`, `Cotação para ${d.name}`)}
                  className="mt-4 w-full rounded-full bg-[#F26722] px-5 py-2.5 text-xs font-semibold text-white opacity-0 transition-all group-hover:opacity-100"
                >
                  Quero ir para cá
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* HOW IT WORKS */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Conte seu sonho", d: "Você nos diz para onde quer ir e o que imagina para a viagem" },
    { n: "02", t: "Montamos tudo", d: "Criamos um roteiro personalizado com as melhores condições" },
    { n: "03", t: "Boa viagem", d: "Você viaja tranquilo enquanto cuidamos de cada detalhe" },
  ];
  return (
    <section id="como" className="relative overflow-hidden bg-[#F7EFE0] py-28">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[#F26722] opacity-[0.06] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[#0E86D4] opacity-[0.06] blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-[#0A2540]" style={{ ...playfair, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Como realizamos o <em className="text-[#F26722]">seu sonho</em>
          </h2>
        </div>
        <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-[#F26722]/30 md:block" />
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F26722] text-lg font-bold text-white shadow-lg">
                {s.n}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#0A2540]">{s.t}</h3>
              <p className="mt-2 text-sm text-[#64748B]">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* GALLERY */
function Gallery() {
  const imgs = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&q=80",
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=800&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
  ];
  const sizes = ["md:col-span-2 md:row-span-2", "", "", "md:col-span-2", "", "md:row-span-2", "", ""];
  return (
    <section className="bg-[#F4EEE2] py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <p className="font-label text-xs font-semibold text-[#F26722]">MOMENTOS</p>
          <h2 className="mt-3 text-[#0A2540]" style={{ ...playfair, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Viagens que viram <em>memórias</em>
          </h2>
        </div>
        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
          {imgs.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`overflow-hidden rounded-xl ${sizes[i] ?? ""}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* QUIZ */
type Cat = "praia" | "cultura" | "aventura" | "luxo";
const QUESTIONS: { q: string; opts: { l: string; c: Cat }[] }[] = [
  { q: "Qual tipo de cenário mais te atrai?", opts: [
    { l: "Praias paradisíacas", c: "praia" }, { l: "Cidades históricas e cultura", c: "cultura" },
    { l: "Aventura e natureza", c: "aventura" }, { l: "Luxo e sofisticação", c: "luxo" } ] },
  { q: "Como você imagina a viagem dos sonhos?", opts: [
    { l: "Relaxando sem pressa", c: "praia" }, { l: "Explorando cada detalhe", c: "cultura" },
    { l: "Vivendo emoções fortes", c: "aventura" }, { l: "Com todo o conforto possível", c: "luxo" } ] },
  { q: "Com quem você costuma viajar?", opts: [
    { l: "Em família", c: "praia" }, { l: "Com meu par", c: "luxo" },
    { l: "Com amigos", c: "aventura" }, { l: "Sozinho ou a trabalho", c: "cultura" } ] },
  { q: "O que não pode faltar na sua viagem?", opts: [
    { l: "Sol e mar", c: "praia" }, { l: "Museus e gastronomia", c: "cultura" },
    { l: "Trilhas e adrenalina", c: "aventura" }, { l: "Hotéis incríveis", c: "luxo" } ] },
  { q: "Qual clima combina mais com você?", opts: [
    { l: "Calor tropical", c: "praia" }, { l: "Clima ameno de cidade", c: "cultura" },
    { l: "Ar livre e natureza", c: "aventura" }, { l: "Tanto faz, quero conforto", c: "luxo" } ] },
  { q: "Quanto tempo você quer que a viagem dure?", opts: [
    { l: "Uma semana relaxando", c: "praia" }, { l: "Alguns dias explorando", c: "cultura" },
    { l: "O máximo de aventura possível", c: "aventura" }, { l: "O tempo do requinte", c: "luxo" } ] },
  { q: "O que faria essa viagem ser inesquecível?", opts: [
    { l: "Pôr do sol na praia", c: "praia" }, { l: "Descobrir uma nova cultura", c: "cultura" },
    { l: "Uma experiência radical", c: "aventura" }, { l: "Ser tratado como realeza", c: "luxo" } ] },
];
const RESULTS: Record<Cat, { title: string; text: string; wa: string }> = {
  praia: { title: "Seu destino é o *paraíso tropical*", text: "Você merece sol, mar e descanso. Que tal Maldivas, Cancún ou o Nordeste brasileiro? Vamos montar isso para você!", wa: `${WA_BASE}?text=Fiz+o+quiz+e+meu+destino+ideal+é+praia!+Quero+uma+cotação.` },
  cultura: { title: "Seu destino é uma *imersão cultural*", text: "Cidades históricas, gastronomia e arte te esperam. Paris, Europa ou destinos cheios de história combinam com você!", wa: `${WA_BASE}?text=Fiz+o+quiz+e+meu+destino+ideal+é+cultural!+Quero+uma+cotação.` },
  aventura: { title: "Seu destino é pura *adrenalina*", text: "Trilhas, natureza e emoção são a sua praia. Vamos encontrar o destino de aventura perfeito para você!", wa: `${WA_BASE}?text=Fiz+o+quiz+e+meu+destino+ideal+é+aventura!+Quero+uma+cotação.` },
  luxo: { title: "Seu destino é o *requinte absoluto*", text: "Você merece o melhor. Dubai, resorts exclusivos e experiências de luxo esperam por você. Vamos realizar?", wa: `${WA_BASE}?text=Fiz+o+quiz+e+meu+destino+ideal+é+luxo!+Quero+uma+cotação.` },
};
function renderItalic(s: string) {
  const parts = s.split(/\*(.+?)\*/g);
  return parts.map((p, i) => i % 2 === 1 ? <em key={i} className="text-[#F26722]">{p}</em> : <span key={i}>{p}</span>);
}
function Quiz({ openLead }: { openLead: (u?: string, t?: string) => void }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<Cat, number>>({ praia: 0, cultura: 0, aventura: 0, luxo: 0 });
  const [done, setDone] = useState<Cat | null>(null);

  function answer(c: Cat) {
    const ns = { ...scores, [c]: scores[c] + 1 };
    setScores(ns);
    if (step + 1 >= QUESTIONS.length) {
      const winner = (Object.entries(ns) as [Cat, number][]).sort((a, b) => b[1] - a[1])[0][0];
      setDone(winner);
    } else {
      setStep(step + 1);
    }
  }
  function reset() {
    setStep(0); setScores({ praia: 0, cultura: 0, aventura: 0, luxo: 0 }); setDone(null);
  }
  const progress = ((step) / QUESTIONS.length) * 100;

  return (
    <section className="bg-[#0A2540] py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-white" style={{ ...playfair, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Qual é o seu <em className="text-[#F26722]">próximo destino</em>?
          </h2>
          <p className="mt-3 text-[#F26722]">Responda 7 perguntas e descubra a viagem perfeita para você.</p>
        </div>

        <div className="mt-12 rounded-3xl border border-[#F26722]/40 bg-white/5 p-8 backdrop-blur-xl">
          {!done && (
            <>
              <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full bg-[#F26722] transition-all" style={{ width: `${progress}%` }} />
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
                  <p className="text-xs text-white/60">Pergunta {step + 1} de {QUESTIONS.length}</p>
                  <h3 className="mt-2 text-2xl text-white" style={playfair}>{QUESTIONS[step].q}</h3>
                  <div className="mt-6 grid gap-3">
                    {QUESTIONS[step].opts.map(o => (
                      <button key={o.l} onClick={() => answer(o.c)} className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-left text-sm text-white transition hover:border-[#F26722] hover:bg-[#F26722]/10">
                        {o.l}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          )}
          {done && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h3 className="text-3xl text-white" style={playfair}>{renderItalic(RESULTS[done].title)}</h3>
              <p className="mt-4 text-white/85">{RESULTS[done].text}</p>
              <button onClick={() => openLead(RESULTS[done].wa, "Sua viagem dos sonhos")} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F26722] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#F58B4E]">
                <WhatsAppIcon className="h-5 w-5" /> Quero Essa Viagem
              </button>
              <button onClick={reset} className="mt-3 w-full rounded-full border border-white/30 px-6 py-3 text-sm text-white hover:bg-white/10">
                Refazer o quiz
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* TESTIMONIALS */
function Testimonials({ openLead }: { openLead: (u?: string, t?: string) => void }) {
  const items = [
    { t: "A Viagem dos Sonhos cuidou de absolutamente tudo na nossa lua de mel nas Maldivas. Foi impecável, do voo ao hotel. Recomendo de olhos fechados!", n: "Ana e Pedro", r: "Lua de mel, Maldivas" },
    { t: "Precisava organizar uma viagem em família para o Nordeste e foi tudo perfeito. Roteiro incrível, hotel excelente e um atendimento super atencioso. Recomendo demais!", n: "Ricardo M.", r: "Viagem em família" },
    { t: "Sempre sonhei em conhecer a Europa e eles montaram um roteiro perfeito, dentro do meu orçamento e parcelado. Experiência inesquecível!", n: "Juliana S.", r: "Pacote Europa" },
    { t: "Atendimento nota mil! Tiraram todas as minhas dúvidas e conseguiram passagens muito mais baratas do que eu tinha achado. Voltarei a viajar com eles com certeza.", n: "Carlos A.", r: "Passagens internacionais" },
  ];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % items.length), 4000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  return (
    <section className="relative overflow-hidden bg-[#F0E9DA] py-28">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#0E86D4] opacity-[0.05] blur-3xl" />
      <svg aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full" xmlns="http://www.w3.org/2000/svg"><line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#0A2540" strokeOpacity="0.08" /></svg>
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="text-center">
          <p className="font-label text-xs font-semibold text-[#F26722]">EXPERIÊNCIAS</p>
          <h2 className="mt-3 text-[#0A2540]" style={{ ...playfair, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Quem viajou, <em>recomenda</em>
          </h2>
          <p className="mt-3 text-[#64748B]">Histórias reais de quem confiou seus sonhos a nós.</p>
        </div>
        <div className="relative mt-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="rounded-3xl border border-[#F26722]/40 bg-white p-8 shadow-xl">
              <span className="text-5xl leading-none text-[#F26722]" style={playfair}>“</span>
              <p className="mt-2 italic text-[#0A2540]" style={{ ...playfair, fontSize: "1.05rem" }}>{items[idx].t}</p>
              <div className="mt-6 h-px bg-[#F26722]/50" />
              <div className="mt-4 flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-[#F26722]/20" />
                <div>
                  <p className="font-label text-xs font-semibold text-[#F26722]">{items[idx].n}</p>
                  <p className="text-xs text-[#64748B]">{items[idx].r}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#F26722] text-[#F26722]" />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-[#F26722]" : "w-2 bg-[#0A2540]/20"}`} aria-label={`Depoimento ${i + 1}`} />
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <button onClick={() => openLead(`${WA_BASE}?text=Vi+os+depoimentos+e+quero+uma+cotação+de+viagem.`)} className="rounded-full bg-[#F26722] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#F58B4E]">
            Quero realizar meu sonho
          </button>
        </div>
      </div>
    </section>
  );
}

/* FINAL CTA */
function FinalCTA({ openLead }: { openLead: (u?: string, t?: string) => void }) {
  return (
    <section id="contato" className="relative overflow-hidden bg-[#0A2540] py-32">
      <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=2000&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,30,63,0.85), rgba(6,24,56,0.7))" }} />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
        <h2 className="text-white" style={{ ...playfair, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.1 }}>
          Sua viagem dos sonhos <em className="text-[#F26722]">começa aqui</em>
        </h2>
        <p className="mt-5 text-lg text-[#F26722]">Solicite sua cotação agora, sem compromisso.</p>
        <button onClick={() => openLead()} className="mt-10 rounded-full bg-[#F26722] px-10 py-5 text-base font-semibold text-white transition hover:bg-[#F58B4E]">
          Solicitar Minha Cotação
        </button>
      </div>
    </section>
  );
}

/* FAQ */
function FAQ() {
  const items = [
    { q: "Como solicito uma cotação?", a: "É só clicar em Solicitar Cotação, preencher seu nome e você será direcionado para o nosso WhatsApp, onde faremos um atendimento personalizado para a sua viagem." },
    { q: "Vocês são uma agência confiável?", a: "Sim! Somos agente autorizado CVC, líder em turismo no Brasil, oferecendo segurança e confiança em cada etapa da sua viagem." },
    { q: "Quais serviços vocês oferecem?", a: "Passagens aéreas nacionais e internacionais, pacotes de viagens, cruzeiros, viagens corporativas, hospedagem, excursões, eventos esportivos, locação de veículos e seguro viagem." },
    { q: "É possível parcelar a viagem?", a: "Sim, oferecemos parcelamento facilitado para que você realize a sua viagem com condições que cabem no seu bolso." },
    { q: "Vocês atendem viagens em grupo ou família?", a: "Sim, cuidamos de todos os tipos de viagem, seja em família, casal, grupo de amigos ou viajantes solo, com roteiros personalizados." },
    { q: "O atendimento é presencial ou online?", a: "Atendemos todo o Brasil de forma online, pelo WhatsApp, com todo o cuidado e agilidade que a sua viagem merece." },
    { q: "Vocês ajudam a escolher o destino?", a: "Com certeza! Nossa equipe é especializada e te ajuda a escolher o destino perfeito de acordo com o seu perfil, orçamento e sonhos." },
    { q: "Como funciona o seguro viagem?", a: "Oferecemos seguro viagem para que você viaje com total tranquilidade e proteção. Informamos todos os detalhes na sua cotação." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-[#F4EEE2] py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-[#0A2540]" style={{ ...playfair, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Perguntas <em>frequentes</em>
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {items.map((it, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-[#0A2540]/10 bg-white">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="text-sm font-semibold text-[#0A2540]">{it.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-[#F26722] transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-[#64748B]">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FOOTER */
function Footer() {
  return (
    <footer className="bg-[#061838] py-16 text-[#CBD5E1]">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={LOGO} alt="Viagens dos Sonhos" className="h-[60px] w-auto object-contain" />
              <span className="italic text-[#F26722]" style={playfair}>Viagem dos Sonhos</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-[#94A3B8]">Agência de Viagens, Agente Autorizado CVC. Transformando sonhos em viagens inesquecíveis.</p>
          </div>
          <div>
            <p className="font-label text-[10px] font-semibold text-[#F26722]">Contato</p>
            <div className="mt-4 space-y-3 text-sm">
              <a href="https://wa.me/5511932195053" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#F26722]"><WhatsAppIcon className="h-4 w-4" /> (11) 93219-5053</a>
              <a href="https://instagram.com/agenciaviagensdossonhos" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#F26722]"><Instagram className="h-4 w-4" /> @agenciaviagensdossonhos</a>
              <p className="text-[#94A3B8]">Atendimento em todo o Brasil</p>
            </div>
          </div>
          <div>
            <p className="font-label text-[10px] font-semibold text-[#F26722]">Corporativo</p>
            <div className="mt-4 space-y-2 text-sm">
              <Link to="/" className="block hover:text-[#F26722]">Viagens Corporativas</Link>
            </div>
          </div>
          <div>
            <p className="font-label text-[10px] font-semibold text-[#F26722]">Lazer</p>
            <div className="mt-4 space-y-2 text-sm">
              <Link to="/lazer" className="block hover:text-[#F26722]">Viagens de Lazer</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-[#64748B]">© 2026 Viagens dos Sonhos. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
}
