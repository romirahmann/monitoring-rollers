import { X } from "lucide-react";
import { useEffect } from "react";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "max-w-7xl",
  };

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/50
        backdrop-blur-sm
        p-4
        animate-in fade-in duration-200
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full
          ${sizeClasses[size]}
          rounded-3xl
          bg-white
          shadow-2xl
          border border-zinc-200
          overflow-hidden
          animate-in zoom-in-95 duration-200
        `}
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            px-6 py-5
            border-b border-zinc-100
          "
        >
          <h2 className="text-xl font-bold text-zinc-900">{title}</h2>

          {showCloseButton && (
            <button
              onClick={onClose}
              className="
                p-2
                rounded-xl
                transition
                hover:bg-zinc-100
              "
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
