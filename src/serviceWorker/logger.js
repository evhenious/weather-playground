export default function makeLogger(prefix = '', shouldLog = false) {
  const prefixed = withPrefix(prefix);

  return {
    log: shouldLog ? prefixed(console.log) : () => null,
    info: prefixed(console.info),
    warn: prefixed(console.warn),
    error: prefixed(console.error),
  };
}

/**
 * Returns wrapper for console method, which adds given prefix for any output
 *
 * @param {string} prefix
 */
function withPrefix(prefix = '') {
  return function prefixedWrapper(func) {
    return (...args) => {
      func(prefix, ...args);
    };
  };
}
