'use string'

class Base {
  select(selector) {
    return document.querySelector(selector);
  }

  getUid() {
    return Math.random().toString().slice(2, 12);
  }
}

class Word extends Base {
  constructor() {
    super();
    this.explanations = [];
    this.useCase = this.select('#useCase');
    this.examplesOfUseCase = this.select('#examplesOfUseCase');
    this.explanationsContainer = this.select('#explanationsContainer');
  }

  /**
   * Add explanation
   */
  ['CLICK: #addExplanation']() {
    const useCase = this.useCase.value.trim();
    const examples = this.examplesOfUseCase.value.trim();
    let errors = 0;
    
    if (useCase.length < 1) {
      this.useCase.classList.add('is-invalid');
      errors = 1;
    } else {
      this.useCase.classList.remove('is-invalid');
    }
    if (examples.length < 1) {
      this.examplesOfUseCase.classList.add('is-invalid');
      errors = 1;
    } else {
      this.examplesOfUseCase.classList.remove('is-invalid');
    }
    if (errors) {
      return;
    }
    
    const uid = this.getUid();
    const explanationsContent = this.explanationsContainer.innerHTML;
    const explanation = `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">${useCase}</h4>
        <h6 class="card-subtitle mb-2 text-muted">Examples</h6>
        <p class="card-text">${examples}</p>
        <a href="#" id="edit${uid}" class="card-link editExplanation">Edit</a>
        <a href="#" id="remove${uid}" class="card-link removeExplanation">Remove</a>
      </div>
    </div>
    <br>`;
  
    this.explanationsContainer.innerHTML = explanationsContent + explanation;
    this.useCase.value = '';
    this.examplesOfUseCase.value = '';
    this.explanations.push({ useCase, examples });

    this.select(`#edit${uid}`).onclick = this[Symbol.for('editExplanation')].bind(this, uid);
  }

  [Symbol.for('editExplanation')](uid) {
    console.log(this);
    console.log(uid);
    return false;
  }

  /**
   * Submit form anf save word
   */
  ['CLICK: #saveWord']() {}
}

const word = new Word();
const methods = Object.getOwnPropertyNames(Word.prototype).filter(m => m !== 'constructor');
methods.forEach(method => {
  const [event, selector] = method.split(': ');
  document.querySelector(selector)['on' + event.toLowerCase()] = word[method].bind(word);
});