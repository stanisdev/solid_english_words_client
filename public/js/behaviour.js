'use string'

class Behaviour {
  select(selector) {
    return document.querySelector(selector);
  }

  getUid() {
    return Math.random().toString().slice(2, 12);
  }

  handlers() {
    document.addEventListener('click', (e) => {
      const { target } = e;

      const { id } = target;
      this.handlerClasses.forEach(c => {
        if (target.classList.contains(c)) {
          this[Symbol.for(c)](id);
          e.preventDefault();
        }
      });
    }, false);
  }

  setVisibility(selector, state = {}) {
    const elements = document.querySelectorAll(selector);
    for (let a = 0; a < elements.length; a++) {
      const action = state.isHidden ? 'add' : 'remove';

      elements[a].classList[action]('d-none');
    }
  }

  error(message) {
    alert(message);
    throw new Error();
  }
}