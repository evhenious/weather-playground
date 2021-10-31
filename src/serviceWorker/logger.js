export default function makeLogger (shouldLog = false) {
  return {
    log: shouldLog ? console.log : () => null,
    info: console.info,
    warn: console.warn,
    error: console.error,
  };
}
