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
    const sep = whatsappUrl.includes("?") ? "&" : "?";
    const finalUrl = whatsappUrl.includes("text=")
      ? whatsappUrl.replace("text=", `text=Olá,+sou+${encodeURIComponent(name.trim())}.+`)
      : `${whatsappUrl}${sep}text=${encodeURIComponent(`Olá, sou ${name.trim()}. Gostaria de uma cotação.`)}`;
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
          style={{ background: "rgba(10,30,63,0.75)", backdropFilter: "blur(10px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(245,184,65,0.4)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 25px 80px -20px rgba(0,0,0,0.6), 0 0 60px -20px rgba(245,184,65,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-offwhite/70 transition hover:text-gold"
              aria-label="Fechar"
            >
              <X size={22} />
            </button>
            <p className="font-label text-xs text-gold">Cotação personalizada</p>
            <h3 className="font-display mt-2 text-3xl leading-tight text-offwhite">
              {title ?? "Vamos realizar sua viagem"}
            </h3>
            <p className="mt-3 text-sm text-offwhite/70">
              Deixe seu nome, você será direcionado ao nosso WhatsApp para um atendimento personalizado.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="font-label text-[10px] text-offwhite/60" htmlFor="lead-name">
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
                  className="mt-1 w-full rounded-xl border border-offwhite/20 bg-navy/40 px-4 py-3 text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-gold px-6 py-4 font-label text-sm font-semibold text-navy-deep transition hover:brightness-110"
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
