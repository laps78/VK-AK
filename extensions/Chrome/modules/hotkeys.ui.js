import app from "../vk-friends-clicker-ext";

const defaultConfig = {};

export default class HotkeysUI {
  #metaData = {};
  constructor(config) {
    if (this.config === undefined) {
      this.config = defaultConfig;
    } else {
      this.config = config;
    }

    this.#metaData.listeners = [];
    this.activateKeyboardListener();
  }

  activateKeyboardListener() {
    console.log("eListener add...");
    this.metaData.listeners.push(
      window.addEventListener("keydown", (event) => {
        if (event.altKey && (event.key === "˙" || event.key === "Ó")) {
          event.preventDefault();
          console.log("activate app");
          app();
        }
      })
    );
  }

  /**
   * удаляет все слушатели событий из #metadata.listeners
   */
  deactivateListeners() {
    if (this.#metaData.listeners && this.#metaData.listeners.length > 0) {
      this.#metaData.listeners.forEach((listener) => {
        window.removeEventListener(listener);
      });
    }
  }

  /**
   * удаляет все слушатели событий
   * потом будет удалять экземпляр класса
   */
  kill() {
    this.deactivateListeners();
  }
}
