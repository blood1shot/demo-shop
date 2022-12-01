export default function useDebounce(): {
  debounce: CallableFunction;
} {
  let timerId: number | null = null;
  function debounce(fn: VoidFunction, delay = 1000): void {
    return ((...args) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        timerId = null;
        fn(...args);
      }, delay);
    })();
  }

  return {
    debounce,
  };
}
