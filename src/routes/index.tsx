import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import {
  Globe, Clock, Plane, Building2, Car, Shield,
  Heart, Award, BarChart3, User, CheckCircle2,
  ArrowRight, Menu, X, Instagram, TrendingUp, FileBarChart, Zap,
} from "lucide-react";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const WHATSAPP_BASE = "https://wa.me/5511932195053";
const WA_DEFAULT = `${WHATSAPP_BASE}?text=Olá,+gostaria+de+uma+cotação+de+viagens+corporativas.`;

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function useCounter(target: number, duration = 1500, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState(WA_DEFAULT);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openLead(url: string = WA_DEFAULT, title?: string) {
    setModalUrl(url);
    setModalTitle(title);
    setModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#FAFCFF]">
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-[#F26722]"
      />

      {/* Navbar */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 h-[72px] transition-all ${
          scrolled ? "border-b border-[#0E86D4]/15 bg-white/95 backdrop-blur-xl" : "bg-white/90 backdrop-blur-md border-b border-[#0E86D4]/10"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
          <a href="#top" className="flex items-center gap-3">
            <Plane className="h-6 w-6 -rotate-45 text-[#0E86D4]" strokeWidth={2} />
            <span className="font-display text-lg font-bold text-[#0A2540]">
              Viagens dos Sonhos
            </span>
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            <a href="#servicos" className="text-sm font-medium text-[#0A2540] hover:text-[#0E86D4]">Serviços</a>
            <a href="#diferenciais" className="text-sm font-medium text-[#0A2540] hover:text-[#0E86D4]">Diferenciais</a>
            <a href="#gestao" className="text-sm font-medium text-[#0A2540] hover:text-[#0E86D4]">Gestão</a>
            <a href="#contato" className="text-sm font-medium text-[#0A2540] hover:text-[#0E86D4]">Contato</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => openLead()}
              className="hidden rounded-lg bg-[#F26722] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#F58B4E] md:inline-flex"
            >
              Solicitar Cotação
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md p-2 text-[#0A2540] lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 top-[72px] border-b border-[#0E86D4]/15 bg-white lg:hidden"
            >
              <div className="flex flex-col gap-1 p-4">
                {[["Serviços","#servicos"],["Diferenciais","#diferenciais"],["Gestão","#gestao"],["Contato","#contato"]].map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium text-[#0A2540] hover:bg-[#F1F5F9]">{label}</a>
                ))}
                <button
                  onClick={() => { setMobileOpen(false); openLead(); }}
                  className="mt-2 rounded-lg bg-[#F26722] px-5 py-3 text-sm font-semibold text-white"
                >
                  Solicitar Cotação
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="top">
        <HeroSection openLead={openLead} />
        <TrustLogos />
        <ServicesSection />
        <WhyUsSection />
        <ManagementSection openLead={openLead} />
        <ProcessSection />
        <QuizSection openLead={openLead} />
        <TestimonialsSection openLead={openLead} />
        <FinalCTA openLead={openLead} />
        <FAQSection />
        <Footer />
      </main>

      {/* Floating WhatsApp */}
      <button
        onClick={() => openLead()}
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl"
        style={{ animation: "pulse-ring 2s infinite" }}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </button>

      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        whatsappUrl={modalUrl}
        title={modalTitle}
      />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function HeroSection({ openLead }: { openLead: (url?: string, title?: string) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const c1 = useCounter(30, 1500, inView);
  const c2 = useCounter(24, 1500, inView);
  const c3 = useCounter(5, 1500, inView);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-[72px]"
      style={{ background: "linear-gradient(180deg, #FAFCFF 0%, #E6F3FC 100%)" }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 md:px-8 lg:grid-cols-[55%_45%] lg:gap-8 lg:py-24">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-5"
        >
          <span className="rounded-full border border-[#0E86D4]/30 bg-[#0E86D4]/10 px-4 py-1.5 font-label text-[10px] font-semibold text-[#0E86D4]">
            Gestão inteligente de viagens corporativas
          </span>
          <h1 className="max-w-[560px] font-display text-4xl font-bold leading-[1.1] text-[#0A2540] md:text-5xl lg:text-6xl">
            Gestão inteligente para suas viagens corporativas
          </h1>
          <p className="max-w-[500px] text-[17px] leading-relaxed text-[#64748B]">
            A tecnologia mais avançada para viagens a trabalho, garantindo economia, controle e agilidade na gestão da sua empresa.
          </p>

          <div className="mt-4 grid w-full grid-cols-3 gap-4 border-y border-[#0E86D4]/15 py-5 md:max-w-md">
            {[
              { n: `${c1}%`, l: "Redução média de custos" },
              { n: `${c2}h`, l: "Atendimento contínuo" },
              { n: `${c3}+`, l: "Anos de experiência" },
            ].map((m) => (
              <div key={m.l}>
                <p className="font-display text-2xl font-bold text-[#0E86D4] md:text-3xl">{m.n}</p>
                <p className="mt-1 text-[11px] leading-tight text-[#64748B]">{m.l}</p>
              </div>
            ))}
          </div>

          <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
            <button
              onClick={() => openLead()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F26722] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#F58B4E]"
            >
              Solicitar Cotação <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => openLead(WA_DEFAULT, "Falar com Consultor")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#0E86D4] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#0E86D4] transition hover:bg-[#0E86D4]/5"
            >
              Falar com Consultor
            </button>
          </div>
        </motion.div>

        {/* Right column: Dashboard mockup */}
        <HeroDashboard />
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative mx-auto w-full max-w-[520px]"
    >
      {/* Main dashboard card */}
      <div
        className="relative rounded-2xl bg-white p-6"
        style={{
          border: "1px solid rgba(14,134,212,0.15)",
          boxShadow: "0 30px 60px -20px rgba(10,37,64,0.25), 0 10px 20px -10px rgba(14,134,212,0.15)",
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="font-label text-[9px] font-semibold text-[#64748B]">Dashboard</p>
            <p className="mt-1 font-display text-base font-bold text-[#0A2540]">Visão geral</p>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F1F5F9]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F1F5F9]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#0E86D4]" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { l: "Viagens", v: "47", i: <Plane className="h-3.5 w-3.5" /> },
            { l: "Compliance", v: "98%", i: <Shield className="h-3.5 w-3.5" /> },
            { l: "Saving", v: "R$ 12k", i: <TrendingUp className="h-3.5 w-3.5" /> },
          ].map((k) => (
            <div key={k.l} className="rounded-lg bg-[#F1F5F9] p-3">
              <div className="flex items-center gap-1.5 text-[#0E86D4]">{k.i}<span className="font-label text-[8px] font-semibold text-[#64748B]">{k.l}</span></div>
              <p className="mt-1 font-display text-lg font-bold text-[#0A2540]">{k.v}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mt-5 rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between">
            <p className="font-label text-[9px] font-semibold text-[#64748B]">Gastos mensais</p>
            <p className="text-[10px] font-medium text-[#F26722]">↓ 30%</p>
          </div>
          <svg viewBox="0 0 220 80" className="mt-2 h-20 w-full">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0E86D4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0E86D4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,60 L30,45 L60,55 L90,35 L120,40 L150,25 L180,30 L220,15 L220,80 L0,80 Z" fill="url(#chartGrad)" />
            <path d="M0,60 L30,45 L60,55 L90,35 L120,40 L150,25 L180,30 L220,15" fill="none" stroke="#0E86D4" strokeWidth="2" />
            {[[30,45],[60,55],[90,35],[120,40],[150,25],[180,30],[220,15]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="#F26722" />
            ))}
          </svg>
          <div className="mt-2 flex justify-between text-[9px] text-[#94A3B8]">
            {["Jan","Fev","Mar","Abr","Mai","Jun","Jul"].map(m => <span key={m}>{m}</span>)}
          </div>
        </div>
      </div>

      {/* Floating card 1 */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-24 hidden rounded-xl bg-white p-4 md:block"
        style={{
          border: "1px solid rgba(14,134,212,0.15)",
          boxShadow: "0 20px 40px -12px rgba(10,37,64,0.2)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F26722]/10 text-[#F26722]">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[9px] font-medium text-[#64748B]">Economia mensal</p>
            <p className="font-display text-sm font-bold text-[#0A2540]">R$ 12.400</p>
          </div>
        </div>
      </motion.div>

      {/* Floating card 2 */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-4 bottom-16 hidden rounded-xl bg-white p-4 md:block"
        style={{
          border: "1px solid rgba(14,134,212,0.15)",
          boxShadow: "0 20px 40px -12px rgba(10,37,64,0.2)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0E86D4]/10 text-[#0E86D4]">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[9px] font-medium text-[#64748B]">Compliance</p>
            <p className="font-display text-sm font-bold text-[#0A2540]">98%</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- TRUST LOGOS ---------------- */
function TrustLogos() {
  return (
    <section className="border-y border-[#E2E8F0] bg-[#FAFCFF] py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-center font-label text-[10px] font-semibold text-[#64748B]">
          Empresas que confiam em nós
        </p>
        <div className="mt-6 grid grid-cols-3 items-center gap-6 opacity-50 md:grid-cols-6">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="flex h-10 items-center justify-center">
              <div className="h-6 w-24 rounded bg-[#64748B]/40" style={{ filter: "grayscale(1)" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function ServicesSection() {
  const services = [
    { icon: Globe, title: "Sistema Online", desc: "Reservas com preços e disponibilidade em tempo real para maior agilidade." },
    { icon: Clock, title: "Atendimento 24h", desc: "Suporte completo a qualquer hora, 365 dias por ano." },
    { icon: Plane, title: "Aéreo Nacional e Internacional", desc: "Emissão de passagens para todos os destinos com as melhores tarifas." },
    { icon: Building2, title: "Rede Hoteleira", desc: "Reservas em toda rede de hotéis nacionais e internacionais." },
    { icon: Car, title: "Locação de Veículos", desc: "Parceria com as principais locadoras para sua mobilidade." },
    { icon: Shield, title: "Seguro Viagem", desc: "Garanta a melhor cobertura pelo melhor preço para a segurança da sua equipe." },
  ];

  return (
    <section id="servicos" className="bg-[#FAFCFF] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-label text-[10px] font-semibold text-[#F26722]">O que fazemos</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#0A2540] md:text-4xl">Nossos serviços</h2>
          <p className="mt-3 text-[#64748B]">
            Soluções completas para facilitar a gestão das viagens corporativas da sua empresa.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group rounded-xl border border-[#0E86D4]/15 bg-white p-7 transition-all hover:border-[#F26722] hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F26722]/10 text-[#F26722]">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-[#0A2540]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY US ---------------- */
function WhyUsSection() {
  const items = [
    { icon: Heart, title: "Paixão pelo Turismo", desc: "Experiência e expertise para atender sua empresa da melhor maneira." },
    { icon: Clock, title: "Horário Diferenciado", desc: "Atendimento 24h, inclusive em feriados, sem interrupções." },
    { icon: Award, title: "Qualidade", desc: "Preocupação com eficácia e qualidade em cada detalhe do atendimento." },
    { icon: BarChart3, title: "Controle e Gestão", desc: "Relatórios claros e transparentes para uma visão estratégica das despesas." },
    { icon: User, title: "Consultores Plenos", desc: "Consultores com mais de 5 anos de mercado, alinhados à sua necessidade." },
    { icon: CheckCircle2, title: "Compliance", desc: "Gestão da política de viagens da sua empresa em conformidade e controle." },
  ];

  return (
    <section id="diferenciais" className="bg-[#0A2540] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-label text-[10px] font-semibold text-[#F26722]">Por que nos escolher</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#FAFCFF] md:text-4xl">O que nos faz diferente</h2>
          <p className="mt-3 text-[#CBD5E1]">
            Nosso diferencial é estar próximo aos nossos clientes, entendendo suas necessidades e objetivos.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-xl p-7 transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(242,103,34,0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F26722]/15 text-[#F26722]">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-[#FAFCFF]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MANAGEMENT ---------------- */
function ManagementSection({ openLead }: { openLead: (url?: string, title?: string) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const big = useCounter(30, 1800, inView);

  return (
    <section id="gestao" ref={ref} className="bg-[#FAFCFF] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 md:px-8 lg:grid-cols-2">
        <div>
          <span className="rounded-full border border-[#0E86D4]/30 bg-[#0E86D4]/10 px-4 py-1.5 font-label text-[10px] font-semibold text-[#0E86D4]">
            Redução de gastos e controle total
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold text-[#0A2540] md:text-4xl">
            Economia de tempo e custo mensal
          </h2>
          <div className="mt-6 flex items-center gap-5">
            <p className="font-display text-7xl font-black leading-none text-[#F26722] md:text-8xl">{big}%</p>
            <p className="max-w-[200px] text-sm font-medium text-[#0A2540]">Redução média nos custos de viagens</p>
          </div>
          <p className="mt-6 text-[#64748B]">
            Gerenciamos a política de viagens da sua empresa através dos nossos sistemas para proporcionar controle e substancial economia nos gastos.
          </p>

          <div className="mt-8 space-y-5">
            {[
              { n: "01", t: "Relatórios Gerenciais", d: "Relatórios personalizados on-line: saving, antecedência, desvio de política e mais." },
              { n: "02", t: "Dashboard Inteligente", d: "Monitoramento de performance e gestão de metas em tempo real." },
              { n: "03", t: "Business Intelligence", d: "Vários relatórios e KPIs importantes para a gestão total da sua empresa." },
            ].map((f) => (
              <div key={f.n} className="flex gap-4">
                <span className="font-display text-2xl font-bold text-[#0E86D4]">{f.n}</span>
                <div>
                  <h4 className="font-display text-base font-bold text-[#0A2540]">{f.t}</h4>
                  <p className="mt-1 text-sm text-[#64748B]">{f.d}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => openLead()}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#F26722] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#F58B4E]"
          >
            Quero economizar <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <ManagementDashboard />
      </div>
    </section>
  );
}

function ManagementDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div
        className="rounded-2xl bg-white p-6"
        style={{
          border: "1px solid rgba(14,134,212,0.15)",
          boxShadow: "0 30px 60px -20px rgba(10,37,64,0.2)",
        }}
      >
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-2">
            <FileBarChart className="h-5 w-5 text-[#0E86D4]" />
            <p className="font-display text-base font-bold text-[#0A2540]">Relatório Mensal</p>
          </div>
          <span className="rounded-md bg-[#F26722]/10 px-2 py-1 text-[10px] font-semibold text-[#F26722]">Novembro</span>
        </div>

        {/* Bar chart */}
        <div className="mt-5">
          <p className="font-label text-[9px] font-semibold text-[#64748B]">Gastos por centro de custo</p>
          <div className="mt-4 flex items-end justify-between gap-2 h-32">
            {[65, 40, 80, 55, 90, 45, 70].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  className="w-full rounded-t bg-gradient-to-t from-[#0E86D4] to-[#0E86D4]/60"
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[9px] text-[#94A3B8]">
            {["TI","RH","Cml","Fin","Ops","Jur","Dir"].map(m => <span key={m} className="flex-1 text-center">{m}</span>)}
          </div>
        </div>

        {/* Fake table */}
        <div className="mt-6 rounded-lg border border-[#E2E8F0]">
          <div className="border-b border-[#E2E8F0] bg-[#F1F5F9] px-4 py-2">
            <p className="font-label text-[9px] font-semibold text-[#64748B]">Últimas viagens</p>
          </div>
          {[
            { d: "SAO → GIG", v: "R$ 890", s: "Compliance" },
            { d: "SAO → BSB", v: "R$ 1.240", s: "Compliance" },
            { d: "SAO → REC", v: "R$ 1.680", s: "Compliance" },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2.5 text-[11px]">
              <div className="flex items-center gap-2">
                <Plane className="h-3 w-3 text-[#0E86D4]" />
                <span className="font-medium text-[#0A2540]">{row.d}</span>
              </div>
              <span className="text-[#64748B]">{row.v}</span>
              <span className="rounded bg-[#0E86D4]/10 px-2 py-0.5 text-[9px] font-semibold text-[#0E86D4]">{row.s}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- PROCESS ---------------- */
function ProcessSection() {
  const steps = [
    { n: "01", t: "Consultoria Gratuita", d: "Análise completa do seu cenário atual e necessidades." },
    { n: "02", t: "Proposta Personalizada", d: "Soluções desenhadas para o perfil da sua empresa." },
    { n: "03", t: "Implementação", d: "Integração e treinamento da sua equipe no sistema." },
    { n: "04", t: "Economia Contínua", d: "Acompanhamento, relatórios e otimização mensal." },
  ];
  return (
    <section className="bg-[#F1F5F9] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-label text-[10px] font-semibold text-[#F26722]">Processo</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#0A2540] md:text-4xl">
            Como começamos a economizar juntos
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-[#F26722]/20 lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="absolute left-0 right-0 top-8 hidden h-0.5 origin-left bg-[#F26722] lg:block"
          />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#F26722] font-display text-lg font-bold text-white shadow-lg shadow-[#F26722]/30">
                  {s.n}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-[#0A2540]">{s.t}</h3>
                <p className="mt-2 max-w-[240px] text-sm text-[#64748B]">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- QUIZ ---------------- */
type QuizOption = { label: string; pts: number };
type QuizQuestion = { q: string; options: QuizOption[] };

const QUIZ: QuizQuestion[] = [
  { q: "Sua empresa realiza viagens corporativas com que frequência?", options: [
    { label: "Toda semana", pts: 3 }, { label: "Todo mês", pts: 2 }, { label: "Ocasionalmente", pts: 1 }, { label: "Raramente", pts: 0 }
  ]},
  { q: "Quem cuida da compra de passagens e reservas hoje?", options: [
    { label: "Um funcionário sem experiência", pts: 3 }, { label: "Uma agência que não gosto", pts: 3 }, { label: "Eu mesmo(a)", pts: 2 }, { label: "Uma agência confiável", pts: 0 }
  ]},
  { q: "Você tem visibilidade dos gastos totais com viagens da empresa?", options: [
    { label: "Não faço ideia", pts: 3 }, { label: "Tenho uma noção geral", pts: 2 }, { label: "Razoavelmente", pts: 1 }, { label: "Sim, controle total", pts: 0 }
  ]},
  { q: "Sua empresa tem uma política de viagens formal e aplicada?", options: [
    { label: "Não", pts: 3 }, { label: "Sim, mas ninguém segue", pts: 2 }, { label: "Em construção", pts: 1 }, { label: "Sim, aplicada e monitorada", pts: 0 }
  ]},
  { q: "Você recebe relatórios claros sobre despesas de viagem?", options: [
    { label: "Nunca", pts: 3 }, { label: "Raramente", pts: 2 }, { label: "Às vezes", pts: 1 }, { label: "Sempre", pts: 0 }
  ]},
  { q: "Quando surge uma urgência de viagem fora do horário comercial, o que acontece?", options: [
    { label: "É um caos", pts: 3 }, { label: "Perdemos tempo resolvendo", pts: 2 }, { label: "Nos viramos", pts: 1 }, { label: "Temos suporte 24h", pts: 0 }
  ]},
  { q: "Gostaria de reduzir os custos de viagem da sua empresa em até 30%?", options: [
    { label: "Sim, com urgência", pts: 3 }, { label: "Sim, seria ótimo", pts: 2 }, { label: "Talvez", pts: 1 }, { label: "Já reduzimos", pts: 0 }
  ]},
];

function QuizSection({ openLead }: { openLead: (url?: string, title?: string) => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function answer(pts: number) {
    const s = score + pts;
    if (step === QUIZ.length - 1) {
      setScore(s);
      setDone(true);
    } else {
      setScore(s);
      setStep(step + 1);
    }
  }

  function reset() { setStep(0); setScore(0); setDone(false); }

  const progress = done ? 100 : (step / QUIZ.length) * 100;

  const result = (() => {
    if (score >= 14) return {
      title: "Sua empresa pode economizar muito com gestão profissional",
      text: "Suas respostas indicam que há grande espaço para reduzir custos e ganhar controle sobre as viagens corporativas. Vamos conversar sobre como podemos ajudar.",
      cta: "Quero Uma Consultoria Gratuita",
      url: `${WHATSAPP_BASE}?text=${encodeURIComponent("Fiz o quiz e quero uma consultoria gratuita de viagens corporativas.")}`,
    };
    if (score >= 7) return {
      title: "Sua gestão está no caminho, mas dá para otimizar",
      text: "Você tem alguma estrutura, mas com a gestão certa é possível economizar ainda mais e ter total controle.",
      cta: "Quero Otimizar Minha Gestão",
      url: `${WHATSAPP_BASE}?text=${encodeURIComponent("Fiz o quiz e quero otimizar a gestão de viagens da minha empresa.")}`,
    };
    return {
      title: "Sua gestão já está bem estruturada",
      text: "Mesmo assim, uma consultoria pode revelar oportunidades adicionais de economia. Vamos conversar?",
      cta: "Quero Uma Análise",
      url: `${WHATSAPP_BASE}?text=${encodeURIComponent("Fiz o quiz e quero uma análise da gestão de viagens corporativas da minha empresa.")}`,
    };
  })();

  return (
    <section className="bg-[#FAFCFF] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="text-center">
          <p className="font-label text-[10px] font-semibold text-[#F26722]">Diagnóstico</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#0A2540] md:text-4xl">
            Sua empresa está pagando mais do que deveria em viagens?
          </h2>
          <p className="mt-3 text-[#64748B]">
            Responda 7 perguntas e descubra quanto pode economizar.
          </p>
        </div>

        <div
          className="mt-12 rounded-2xl bg-white p-8 md:p-10"
          style={{
            border: "1px solid rgba(14,134,212,0.2)",
            boxShadow: "0 20px 50px -20px rgba(10,37,64,0.15)",
          }}
        >
          {/* Progress */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
                className="h-full bg-[#F26722]"
              />
            </div>
            <span className="font-label text-[10px] font-semibold text-[#64748B]">
              {done ? "Concluído" : `${step + 1}/${QUIZ.length}`}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-xl font-bold text-[#0A2540] md:text-2xl">
                  {QUIZ[step].q}
                </h3>
                <div className="mt-6 grid gap-3">
                  {QUIZ[step].options.map((o) => (
                    <button
                      key={o.label}
                      onClick={() => answer(o.pts)}
                      className="rounded-lg border border-[#E2E8F0] bg-white px-5 py-4 text-left text-sm font-medium text-[#0A2540] transition hover:border-[#0E86D4] hover:bg-[#0E86D4]/5"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F26722]/10 text-[#F26722]">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-[#0A2540] md:text-3xl">
                  {result.title}
                </h3>
                <p className="mx-auto mt-4 max-w-lg text-[#64748B]">{result.text}</p>
                <button
                  onClick={() => openLead(result.url, result.cta)}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#F26722] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#F58B4E]"
                >
                  <WhatsAppIcon className="h-4 w-4" /> {result.cta}
                </button>
                <button
                  onClick={reset}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-lg border-2 border-[#0E86D4] px-6 py-3 text-sm font-semibold text-[#0E86D4] transition hover:bg-[#0E86D4]/5"
                >
                  Refazer o quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const TESTIMONIALS = [
  { q: "Reduzimos os custos de viagens da empresa em 32% no primeiro semestre. O atendimento 24h e os relatórios personalizados fizeram toda a diferença na nossa gestão.", n: "Ricardo Almeida", r: "Diretor Financeiro, Tech Solutions" },
  { q: "Precisávamos de uma agência que entendesse a dinâmica corporativa e agilizasse os processos. Encontramos exatamente isso na Viagens dos Sonhos. Recomendo.", n: "Fernanda Costa", r: "Gerente de Operações, Grupo Industrial" },
  { q: "O sistema online facilitou muito a rotina do nosso departamento. Reservas rápidas, política aplicada automaticamente e relatórios que ajudam nas decisões estratégicas.", n: "Marcos Vieira", r: "CFO, Consultoria Empresarial" },
  { q: "Atendimento consultivo de verdade. Não são só vendedores de passagens, são parceiros que entendem o negócio e propõem soluções que economizam tempo e dinheiro.", n: "Patrícia Souza", r: "Head de Compras, Multinacional" },
];

function TestimonialsSection({ openLead }: { openLead: (url?: string, title?: string) => void }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTIMONIALS[i];
  return (
    <section className="bg-[#FAFCFF] py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="text-center">
          <p className="font-label text-[10px] font-semibold text-[#F26722]">Cases de sucesso</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#0A2540] md:text-4xl">
            O que dizem os nossos clientes empresariais
          </h2>
          <p className="mt-3 text-[#64748B]">
            Empresas que confiaram sua gestão de viagens à Viagens dos Sonhos.
          </p>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl bg-white p-8 md:p-10"
              style={{
                border: "1px solid #E2E8F0",
                boxShadow: "0 15px 40px -15px rgba(10,37,64,0.12)",
              }}
            >
              <span className="font-display text-5xl leading-none text-[#F26722]">"</span>
              <p className="mt-2 text-[15px] leading-relaxed text-[#0A2540]">{t.q}</p>
              <div className="mt-6 border-t border-[#E2E8F0] pt-6 flex items-center gap-4">
                <div className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-[#0E86D4] to-[#0A2540]" />
                <div className="flex-1">
                  <p className="font-display text-sm font-bold text-[#0A2540]">{t.n}</p>
                  <p className="text-xs text-[#64748B]">{t.r}</p>
                </div>
                <div className="flex gap-0.5 text-[#F26722]">
                  {[0,1,2,3,4].map(s => (
                    <svg key={s} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Depoimento ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-[#0E86D4]" : "w-2 bg-[#0E86D4]/30"}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => openLead(`${WHATSAPP_BASE}?text=${encodeURIComponent("Vi os depoimentos e quero uma cotação de viagens corporativas.")}`)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#F26722] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#F58B4E]"
          >
            Quero esse resultado na minha empresa <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA({ openLead }: { openLead: (url?: string, title?: string) => void }) {
  return (
    <section
      id="contato"
      className="py-24 md:py-32"
      style={{ background: "linear-gradient(135deg, #061838 0%, #0A2540 100%)" }}
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl font-bold text-[#FAFCFF] md:text-5xl lg:text-6xl"
        >
          Pronto para transformar a gestão de viagens da sua empresa?
        </motion.h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-[#CBD5E1]">
          Passagens, hotéis e gestão completa para sua empresa. Atendimento imediato no WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Consultoria Gratuita", "Proposta Personalizada"].map(b => (
            <span key={b} className="inline-flex items-center gap-2 rounded-full border border-[#F26722]/40 bg-[#F26722]/10 px-4 py-2 text-xs font-semibold text-[#F58B4E]">
              <CheckCircle2 className="h-3.5 w-3.5" /> {b}
            </span>
          ))}
        </div>
        <button
          onClick={() => openLead()}
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-[#F26722] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#F26722]/30 transition hover:bg-[#F58B4E]"
        >
          <WhatsAppIcon className="h-5 w-5" /> Falar com um Consultor Agora
        </button>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  { q: "Como funciona a gestão de viagens corporativas?", a: "Cuidamos de todo o processo de viagens da sua empresa, desde a cotação e emissão de passagens até o suporte durante a viagem, com sistema online, relatórios gerenciais e atendimento 24h." },
  { q: "Vocês atendem empresas de todos os tamanhos?", a: "Sim, atendemos desde pequenas empresas até grandes corporações, adaptando nossas soluções ao perfil e volume de viagens do cliente." },
  { q: "Como é feito o atendimento 24h?", a: "Nossa equipe está disponível 24 horas por dia, 7 dias por semana, inclusive feriados, para atender urgências e imprevistos das viagens dos seus colaboradores." },
  { q: "A consultoria inicial tem custo?", a: "Não. Fazemos uma análise gratuita do cenário atual da sua empresa e apresentamos uma proposta personalizada sem compromisso." },
  { q: "Como funciona a redução de custos?", a: "Através da nossa política de gestão, negociações com fornecedores, monitoramento de saving e uso de relatórios estratégicos, é possível reduzir custos em média em 30%." },
  { q: "O sistema é integrado com o meu ERP ou sistema interno?", a: "Sim, temos possibilidade de integração com sistemas de gestão internos das empresas. Consulte-nos para verificar a viabilidade específica do seu caso." },
  { q: "Quais relatórios são disponibilizados?", a: "Relatórios de saving, compliance, gastos por centro de custo, antecedência de compra, desvios de política, KPIs personalizados e muito mais." },
  { q: "Como faço para começar?", a: "É só clicar em Solicitar Cotação, preencher seu nome, e um consultor entrará em contato pelo WhatsApp para uma análise gratuita do seu cenário." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-[#FAFCFF] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="text-center">
          <p className="font-label text-[10px] font-semibold text-[#F26722]">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#0A2540] md:text-4xl">
            Perguntas frequentes
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-white">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-display text-base font-semibold text-[#0A2540]">{f.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  className="ml-4 shrink-0 text-[#F26722]"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-[#64748B]">{f.a}</p>
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

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="bg-[#061838] py-16 text-[#CBD5E1]">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Plane className="h-7 w-7 -rotate-45 text-[#0E86D4]" strokeWidth={2} />
              <p className="font-display text-xl font-bold text-white">Viagens dos Sonhos</p>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#94A3B8]">
              Excelência em gestão de viagens corporativas, conectando sua empresa ao mundo com segurança e economia.
            </p>
          </div>
          <div>
            <p className="font-label text-[10px] font-semibold text-[#F26722]">Contato</p>
            <div className="mt-4 space-y-3 text-sm">
              <a href="https://wa.me/5511932195053" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#F26722]">
                <WhatsAppIcon className="h-4 w-4" /> (11) 93219-5053
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-[#F26722]">
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <p className="text-[#94A3B8]">Atendimento em todo o Brasil</p>
            </div>
          </div>
          <div>
            <p className="font-label text-[10px] font-semibold text-[#F26722]">Institucional</p>
            <div className="mt-4 space-y-2 text-sm">
              <a href="#" className="block hover:text-[#F26722]">Termos de Uso</a>
              <a href="#" className="block hover:text-[#F26722]">Política de Privacidade</a>
              <a href="#" className="block hover:text-[#F26722]">Compliance</a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-[#64748B]">
          © 2026 Viagens dos Sonhos. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
