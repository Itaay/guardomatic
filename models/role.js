class Role {
    constructor(name, tasks) {
        this.tasks = tasks;
        if (!this.tasks) {
            this.tasks = [];
        }
        this.name = name
    }
}