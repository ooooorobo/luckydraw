export const log = (...args) => {
  console.log(`[LOG] ${new Date().toLocaleDateString('ko')} ${new Date().toLocaleTimeString('ko')} | `, ...args);
};
