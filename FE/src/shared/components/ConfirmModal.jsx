import React from "react";

export default function ConfirmModal({
  open,
  title = "Confirmation",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-zinc-900">{title}</h2>

        <p className="mt-3 text-sm text-zinc-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="
              rounded-xl
              border
              border-zinc-300
              px-4
              py-2
              text-sm
              font-medium
              hover:bg-zinc-50
              disabled:opacity-50
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              rounded-xl
              bg-red-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
