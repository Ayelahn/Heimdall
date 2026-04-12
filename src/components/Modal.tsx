"use client";

type ModalProps = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Modal({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-[#0D131F] border border-[#1E293B] rounded-2xl p-8 max-w-sm w-full">
        <h2 className="font-display text-white text-sm tracking-widest mb-3">
          {title}
        </h2>
        <p className="text-[#64748B] text-sm mb-8">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-[#1E293B] text-[#64748B] hover:text-white text-xs font-display tracking-widest transition-colors"
          >
            {cancelLabel.toUpperCase()}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl text-xs font-display tracking-widest transition-all"
            style={{
              background: danger
                ? "rgba(239,68,68,0.1)"
                : "rgba(0,240,255,0.1)",
              border: danger
                ? "1px solid rgba(239,68,68,0.3)"
                : "1px solid rgba(0,240,255,0.3)",
              color: danger ? "#EF4444" : "#00F0FF",
            }}
          >
            {confirmLabel.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}
