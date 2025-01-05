const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 *
 */

const chainMaker = {
  'chain': [],
  'divider': '~~',

  getLength() {
    return this.chain.length;
  },

  addLink( value ) {
    const chainNide = `( ${value} )`
    this.chain.push(chainNide)
    return this;
  },

  removeLink( position ) {
    const isValidPosition = Number.isInteger(position) && position > 0 && position <= this.getLength();

    if (!isValidPosition) {
      this.chain = [];
      throw new Error(`You can't remove incorrect link!`)
    }

    this.chain.splice( position - 1, 1)
    return this;
  },

  reverseChain() {
    if(this.getLength() === 0) return this;

    this.chain.reverse();
    return this;
  },

  finishChain() {
    const finalChain = this.chain.join(this.divider);
    this.chain = []
    return finalChain;
  }
};


module.exports = {
  chainMaker
};
