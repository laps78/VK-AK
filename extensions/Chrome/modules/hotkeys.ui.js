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

    (this.#metaData.mainListener = window.addEventListener("keydown")),
      (event) => {
        if (event.key === "alt") {
          this.activateMainListener();
        }
      };
    this.#metaData.listeners = [];
  }

  activateMainListener() {
    this.metaData.listeners.push(
      window.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "h" || "H":
            app();
            break;
          default:
            console.info("Нет такой горячей клавиши или команды!");
        }
      })
    );
  }

  deactivateMainListener() {
    window.removeEventListener(this.#metaData.mainListener);
  }

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
    this.deactivateMainListener();
  }
}
