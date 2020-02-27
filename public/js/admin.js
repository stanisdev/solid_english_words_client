'use string'

class Word extends Behaviour {
  constructor() {
    super();
    this.explanations = [];
    this.useCase = this.select('#useCase');
    this.examplesOfUseCase = this.select('#examplesOfUseCase');
    this.explanationsContainer = this.select('#explanationsContainer');
    this.handlerClasses = [
      'editExplanation',
      'removeExplanation',
      'saveExplanation'
    ];
    this.handlers();
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
    <div id="card${uid}" class="card">
      <div class="card-body">
        <h4 id="useCaseCaption${uid}" class="card-title">${useCase}</h4>
        <input type="text" class="form-control d-none mb-3" id="useCaseInput${uid}" value="${useCase}" placeholder="Enter use case">

        <h6 class="card-subtitle mb-2 text-muted">Examples</h6>

        <p id="examplesHtml${uid}" class="card-text">${examples}</p>
        <textarea class="form-control d-none mb-4" id="examplesTextarea${uid}" rows="3">${examples}</textarea>

        <a href="#" id="edit${uid}" class="card-link editExplanation">Edit</a>
        <a href="#" id="remove${uid}" class="card-link removeExplanation">Remove</a>

        <button type="button" id="se${uid}" class="btn btn-primary d-none saveExplanation">Save</button>
        <button type="button" id="cn${uid}" class="btn btn-primary d-none cancelExplanation">Cancel</button>
      </div>
    </div>
    <br>`;
  
    this.explanationsContainer.innerHTML = explanationsContent + explanation;
    this.useCase.value = '';
    this.examplesOfUseCase.value = '';
    this.explanations.push({ useCase, examples, uid });
  }

  /**
   * Edit an explanation
   */
  [Symbol.for('editExplanation')](uid) {
    uid = uid.slice(4);
    this.setVisibility(`#useCaseCaption${uid}, #examplesHtml${uid}, #edit${uid}, #remove${uid}`, { isHidden: true });
    this.setVisibility(`#useCaseInput${uid}, #examplesTextarea${uid}, #se${uid}, #cn${uid}`, { isHidden: false });
  }

  /**
   * Save changed explanation
   */
  [Symbol.for('saveExplanation')](uid) {
    uid = uid.slice(2);
    const index = this.explanations.findIndex(e => e instanceof Object && e.uid === uid);
    const explanation = this.explanations[index];

    if (!(explanation instanceof Object)) {
      return this.error('Object of examples is broken');
    }
    const useCase = document.getElementById(`useCaseInput${uid}`).value;
    const examples = document.getElementById(`examplesTextarea${uid}`).value;

    explanation.useCase = useCase;
    explanation.examples = examples;
    this.setVisibility(`#useCaseCaption${uid}, #examplesHtml${uid}, #edit${uid}, #remove${uid}`, { isHidden: false });
    this.setVisibility(`#useCaseInput${uid}, #examplesTextarea${uid}, #se${uid}, #cn${uid}`, { isHidden: true });

    this.select(`#useCaseCaption${uid}`).innerHTML = useCase;
    this.select(`#examplesHtml${uid}`).innerHTML = examples;
  }

  /**
   * Remove explanation
   */
  [Symbol.for('removeExplanation')](uid) {
    const index = this.explanations.findIndex(e => e instanceof Object && e.uid === uid);
  }

  /**
   * Submit form anf save word
   */
  ['CLICK: #saveWord']() {}
}