type ToastListener = (message: string) => void;

const listeners = new Set<ToastListener>();

export const toast = {
  success(message: string) {
    listeners.forEach((listener) => listener(message));
  },
};

export function subscribeToToasts(listener: ToastListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
