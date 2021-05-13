class Task {
    constructor(startTime, stopTime, assignee = null) {
        this.startTime = startTime;
        this.stopTime = stopTime;
        this.assignee = assignee;
        if (!this.assignee) {
            this.assignee = blankStringValue;
        }
    }
}