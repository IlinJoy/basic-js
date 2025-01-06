const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor( direct = true ){
    this.direct = direct;
    this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  prepareStrings(message, key){
    const upperKey = key.toUpperCase();
    const upperMessage = message.toUpperCase();
    let repeatedKey = '';
    let offset = 0;

    for(let i = 0; i < upperMessage.length; i += 1){
      if(!this.letters.includes(upperMessage[i])){
        repeatedKey += ' '
        continue;
      }
      repeatedKey += upperKey[(offset) % key.length];
      offset += 1;
    }

    return {repeatedKey: repeatedKey, upperMessage: upperMessage};
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error ('Incorrect arguments!');

    const encryptedLetters = [];
    const {repeatedKey, upperMessage} = this.prepareStrings(message, key);

    for(let i = 0; i < upperMessage.length; i += 1) {
      let char = upperMessage[i];

      if(!this.letters.includes(char)){
        encryptedLetters.push(char)
      }else{
        const keyIndex = this.letters.indexOf(repeatedKey[i]);
        const charIndex = this.letters.indexOf(char);

        if(keyIndex === 0){
          encryptedLetters.push(char);
          continue;
        }
        const encryptIndex = (charIndex + keyIndex) % 26;
        encryptedLetters.push(this.letters[encryptIndex]);
      }
    }
    return this.direct ? encryptedLetters.join('') : encryptedLetters.reverse().join('');
  }

  decrypt( string, key) {
    if (!string || !key) throw new Error ('Incorrect arguments!');

    const decryptedMessage = [];
    const {repeatedKey, upperMessage} = this.prepareStrings(string, key);

    for(let i = 0; i < upperMessage.length; i += 1) {
      let char = upperMessage[i];

      if(!this.letters.includes(char)){
        decryptedMessage.push(char);
      }else{
        const keyIndex = this.letters.indexOf(repeatedKey[i]);
        const charIndex = this.letters.indexOf(char);

        if(keyIndex === 0){
          decryptedMessage.push(char);
          continue;
        }

        const encryptIndex = (charIndex - keyIndex + 26) % 26;
        decryptedMessage.push(this.letters[encryptIndex]);
      }
    }
    return this.direct ? decryptedMessage.join('') : decryptedMessage.reverse().join('');
  }
}



module.exports = {
  VigenereCipheringMachine
};
