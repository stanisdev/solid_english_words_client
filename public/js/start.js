'use string'

const word = new Word();
const methods = Object.getOwnPropertyNames(Word.prototype).filter(m => m !== 'constructor');
methods.forEach(method => {
  const [event, selector] = method.split(': ');
  document.querySelector(selector)['on' + event.toLowerCase()] = word[method].bind(word);
});