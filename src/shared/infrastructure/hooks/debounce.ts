export type Func = (...args: any[]) => unknown;

export const debounce = function <T extends Func>(fn: T, delay: number) {
  let timeout: NodeJS.Timer;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
