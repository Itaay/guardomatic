class OptionsList {
    constructor(options) {
        this.eventHandlers = [];
        this.options = options;
        if (!this.options) {
            this.options = [];
        }
        this.options.onchange
    }

    addOption(option) {
        this.options.push(option);
        this.update();
    }

    removeOption(option) {
        this.options = this.options.filter(existing => existing !== option);
        this.update();
    }

    update() {
        this.eventHandlers.forEach(eventHandler => eventHandler(this.options));
    }

    addEventHandler(callback) {
        this.eventHandlers.push(callback);
    }


}