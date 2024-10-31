/**
 * == To Make Capitalise any Files name ==
 * @param {string} str
 * @returns string
 */
export const capitalize = (str) => {
  if (typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
