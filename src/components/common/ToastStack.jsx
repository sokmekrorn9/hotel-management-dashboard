import "react";
import { Check } from "lucide-react";

export function ToastStack({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-100 flex flex-col gap-2 items-end">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-lg animate-[fadein_.2s_ease-out]"
        >
          <Check size={16} className="text-emerald-400" />
          {t.message}
        </div>
      ))}
    </div>
  );
}
