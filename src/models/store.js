export class Store {
  #username;
  #path;

  constructor({username, path}) {
    this.#username = username || this.#username;
    this.#path = new PathStore(path);
  }

  get username() {
    return this.#username;
  }

  get path() {
    return this.#path;
  }
}

class PathStore {
  #root;
  #current;

  constructor({ root, current }) {
    this.#root = root || this.#root;
    this.#current = current;
  }

  get root() {
    return this.#root;
  }

  get current() {
    return this.#current;
  }

  set current(current) {
    this.#current = current;
  }
}
