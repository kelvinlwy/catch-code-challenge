/**
 * Convert the currency cents value to dollars value
 * @param {string|number} num - The number to convert
 * @return {string} Formatted currency value in dollars
 */
const formatCentsToDollars = (num) => {
  let centsToDollars = num;

  if (typeof num === 'number') centsToDollars = num / 100;
  else if (typeof num === 'string') centsToDollars = parseInt(num, 10) / 100;
  else throw new TypeError('The argument must be a numeric string or a number');

  const currencyNumber = centsToDollars.toFixed(2);

  return `$${currencyNumber}`;
};

export {
  // eslint-disable-next-line import/prefer-default-export
  formatCentsToDollars,
};
