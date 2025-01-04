const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason( date ) {
    if (!date) return 'Unable to determine the time of year!'

    const isValid = date instanceof Date || !isNaN(Date.parse(date))
    const isFake = Object.getOwnPropertyNames(date).length > 0;

    if (!isValid || isFake) {
      throw new Error('Invalid date!');
    }

    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    const month = date.getMonth()

    switch (true) {
      case month < 2 || month === 11:
        return seasons[0];
      case month < 5:
        return seasons[1];
      case month < 8:
        return seasons[2];
      case month < 11:
        return seasons[3];
      default:
        return 'Unable to determine the time of year!';
    }
}

module.exports = {
  getSeason
};
