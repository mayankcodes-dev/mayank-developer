"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastProps extends ToastItem {
  onClose: (id: number) => void;
}

function ToastCard({ id, message, type, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onClose(id), 2500);
    return () => clearTimeout(t);
  }, [id, onClose]);

  const Icon =
    type === "success" ? CheckCircle :
    type === "error"   ? AlertCircle :
    Info;

  const iconColor =
    type === "success" ? "text-emerald-500" :
    type === "error"   ? "text-red-500" :
    "text-blue-500";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-lg min-w-[200px] max-w-xs"
    >
      <Icon className={`size-4 shrink-0 ${iconColor}`} />
      <p className="text-sm font-medium text-[#0a0a0a] flex-1">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="ml-1 text-neutral-400 hover:text-[#0a0a0a] transition-colors"
        aria-label="Dismiss"
      >
        <X className="size-3.5" />
      </button>
    </motion.div>
  );
}

/* ── Toast container rendered at root ── */
export function ToastContainer({ toasts, onClose }: { toasts: ToastItem[]; onClose: (id: number) => void }) {
  return (
    <div className="fixed bottom-20 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastCard {...t} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ── useToast hook ── */
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, show, remove };
}
