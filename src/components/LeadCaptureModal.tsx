import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
  whatsappUrl: string;
  title?: string;
}

export function LeadCaptureModal({ open, onClose, whatsappUrl, title }: LeadCaptureModalProps) {
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    // Track conversion event for Google Ads
    const w = window as any;
    if (typeof w.gtag === "function") {
      w.gtag('event', 'conversion', { 'send_to': 'AW-18314023988/Ud0yCOqq4tAcELSo55xE' });
    }

    const sep = whatsappUrl.includes("?") ? "&" : "?";
    const finalUrl = whatsappUrl.includes("text=")
      ? whatsappUrl.replace("text=", `text=Olá,+sou+${encodeURIComponent(name.trim())}.+`)
      : `${whatsappUrl}${sep}text=${encodeURIComponent(`Olá, sou ${name.trim()}. Gostaria de uma cotação corporativa.`)}`;

    if (typeof w.gtag_report_conversion === "function") {
      w.gtag_report_conversion(finalUrl);
    }

    window.open(finalUrl, "_blank");
    setName("");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(6,24,56,0.75)", backdropFilter: "blur(10px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-lg bg-white p-8"
            style={{
              border: "1px solid rgba(14,134,212,0.25)",
              boxShadow: "0 25px 80px -20px rgba(10,37,64,0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-[#64748B] transition hover:text-[#F26722]"
              aria-label="Fechar"
            >
              <X size={22} />
            </button>
            <p className="font-label text-[10px] font-semibold text-[#F26722]">Cotação corporativa</p>
            <h3 className="font-display mt-2 text-2xl font-bold leading-tight text-[#0A2540]">
              {title ?? "Fale com nossos consultores"}
            </h3>
            <p className="mt-3 text-sm text-[#64748B]">
              Informe seu nome para continuar. Você será direcionado ao WhatsApp para um atendimento personalizado.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="font-label text-[10px] font-semibold text-[#64748B]" htmlFor="lead-name">
                  Seu nome
                </label>
                <input
                  id="lead-name"
                  type="text"
                  autoFocus
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-[#0A2540] outline-none placeholder:text-[#94A3B8] focus:border-[#0E86D4]"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#F26722] px-6 py-4 font-label text-xs font-semibold text-white transition hover:bg-[#F58B4E]"
              >
                Continuar no WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
