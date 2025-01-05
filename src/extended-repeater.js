const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater( str, options ) {
  if(str === undefined) return;
  const {repeatTimes, separator = '+', addition = '', additionRepeatTimes, additionSeparator = '|'} = options;

  const convertToString = (v) => `${v}`;

  const string = convertToString(str);
  const additionText = convertToString(addition);

  function repeatStr(str, divider, reps) {
    let acc = [str];

    for( let i = 1; i < reps; i += 1){
      acc.push(str)
    }

    return acc.join(divider);
  }

  const additionStr = repeatStr(additionText, additionSeparator, additionRepeatTimes);

  return repeatStr(string + additionStr, separator, repeatTimes)
}

console.log(repeater(null, { repeatTimes: 3, separator: '??? ', addition: null, additionRepeatTimes: 3, additionSeparator: '!!!' }))

module.exports = {
  repeater
};
