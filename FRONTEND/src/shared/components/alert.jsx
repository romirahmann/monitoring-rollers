import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useAlertStore } from "../store/alert-store.js";

const variants = {
  success: {
    icon: CheckCircle2,
    container: "border-emerald-500/20 bg-emerald-800 text-emerald-100",
    iconColor: "text-emerald-400",
  },

  error: {
    icon: XCircle,
    container: "border-red-500/20 bg-red-800 text-red-100",
    iconColor: "text-red-400",
  },

  warning: {
    icon: AlertTriangle,
    container: "border-yellow-500/20 bg-yellow-800 text-yellow-100",
    iconColor: "text-yellow-400",
  },

  info: {
    icon: Info,
    container: "border-blue-500/20 bg-blue-800 text-blue-100",
    iconColor: "text-blue-400",
  },
};

export function AlertMessage() {
  const { open, type, message, closeAlert } = useAlertStore();

  const current = variants[type] || variants.success;

  const Icon = current.icon;

  return (
    <AnimatePresence>
      {open && (
        <div
          className="
            fixed
            top-5
            left-0
            right-0
            z-50
            flex
            justify-center
            pointer-events-none
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              pointer-events-auto
            "
          >
            <div
              className={`
                flex items-start gap-3
                min-w-[340px]
                max-w-md
                rounded-2xl
                border
                px-4
                py-3
                shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                backdrop-blur-2xl
                ${current.container}
              `}
            >
              <div className="mt-0.5">
                <Icon size={20} className={current.iconColor} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium leading-relaxed">{message}</p>
              </div>
              {/* 
              <button
                onClick={closeAlert}
                className="
                  opacity-50
                  transition
                  hover:opacity-100
                "
              >
                <X size={16} />
              </button> */}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
