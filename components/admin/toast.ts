export type ToastType = "success" | "error";

export type ToastEvent = {
  id: number;
  type: ToastType;
  message: string;
};

type ToastListener = (event: ToastEvent) => void;

const listeners = new Set<ToastListener>();
let toastCounter = 0;

const emit = (type: ToastType, message: string) => {
  const event: ToastEvent = {
    id: ++toastCounter,
    type,
    message,
  };

  listeners.forEach((listener) => listener(event));
};

export const toast = {
  success(message: string) {
    emit("success", message);
  },
  error(message: string) {
    emit("error", message);
  },
};

export function subscribeToToasts(listener: ToastListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
