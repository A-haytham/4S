"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { subscribeToToasts, type ToastEvent } from "./toast";

export function AdminToast() {
  const [currentToast, setCurrentToast] = useState<ToastEvent | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToToasts((event) => {
      setCurrentToast(event);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentToast) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCurrentToast(null);
    }, 3500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [currentToast]);

  if (!currentToast) {
    return null;
  }

  const isSuccess = currentToast.type === "success";

  return (
    <div className="pointer-events-none fixed right-1/2  top-4 z-[120]">
      <div
        className={`pointer-events-auto flex max-w-sm items-start gap-3 rounded-lg border px-4 py-3 shadow-lg ${
          isSuccess
            ? "border-green-200 bg-green-50 text-green-800"
            : "border-red-200 bg-red-50 text-red-800"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
        ) : (
          <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
        )}
        <p className="text-sm font-medium">{currentToast.message}</p>
      </div>
    </div>
  );
}
