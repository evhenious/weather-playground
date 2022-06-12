export default function makeLogger(prefix = '', shouldLog = false) {
  const prefixed = withPrefix(prefix);

  return {
    log: shouldLog ? prefixed(console.log.bind(console)) : () => null,
    info: prefixed(console.info.bind(console)),
    warn: prefixed(console.warn.bind(console)),
    error: prefixed(console.error.bind(console)),
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
