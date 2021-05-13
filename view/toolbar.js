class FocusedElement {
    constructor(element) {
        this.focusedElement = element;
        this.createFocusEffect();
        this.focusedTag = 'focusedItem'
    }

    createFocusEffect() {
        if (this.focusedElement) {
            if (!this.focusedElement.classList.contains(this.focusedTag)) {
                this.focusedElement.classList.add(this.focusedTag);
            }
        }
    }

    unfocus() {
        if (this.focusedElement) {
            if (this.focusedElement.classList.contains(this.focusedTag)) {
                this.focusedElement.classList.remove(this.focusedTag);
            }
        }
    }

    focus(element) {
        this.unfocus();
        this.focusedElement = element;
        this.createFocusEffect();
    }
}

let tableFocusedElement = new FocusedElement();



function updateToolbar(element) {
    tableFocusedElement.focus(assignementsTableElement.rows[element.y].cells[element.x]);
    // update the toolbar to contain relevant widgets and info about the clicked focused item
    let toolbarElements = { 'role': ['role-roleName', 'roleDeleteButton'], 'task': ['task-guardName', 'taskDeleteButton', 'startTimeSelect', 'stopTimeSelect'], 'empty-task': ['taskAdditionButton'] };
    let defaultElements = ['roleAdditionButton'];
    let isInFocus = element.type in toolbarElements;
    let defaultElementsDisplay = 'none';
    if (!isInFocus) {
        defaultElementsDisplay = 'block';
    }
    defaultElements.forEach(defaultElement => {
        document.getElementById(defaultElement).style.display = defaultElementsDisplay;
    });
    for (let focusedType in toolbarElements) {
        let displayType = 'none';
        if (element.type === focusedType) {
            displayType = 'block';
        }
        toolbarElements[focusedType].forEach(elementName => {
            document.getElementById(elementName).style.display = displayType;
        });
    }

    let roleName = document.getElementById('role-roleName');
    let guardName = document.getElementById('task-guardName');
    let taskDeleteButton = document.getElementById('taskDeleteButton');
    let roleDeleteButton = document.getElementById('roleDeleteButton');
    let taskAdditionButton = document.getElementById('taskAdditionButton');
    let roleAdditionButton = document.getElementById('roleAdditionButton');
    let startTimeSelector = document.getElementById('startTimeSelect');
    let stopTimeSelector = document.getElementById('stopTimeSelect');

    if (element.type === 'task') {
        let chosenGuardValue = tasksTable.roles[element.y - 1].tasks[element.index].assignee;
        guardName.selectedIndex = 0;
        for (let i = guardName.options.length - 1; i >= 0; i--) {
            if (guardName.options[i].value == chosenGuardValue) {
                guardName.selectedIndex = i;
            }
        }

        startTimeSelector.onchange = null;
        stopTimeSelector.onchange = null;

        startTimeSelector.value = element.startTime.toTimeString().split(' ')[0];
        stopTimeSelector.value = element.stopTime.toTimeString().split(' ')[0];

    }
    else if (element.type === 'role') {
        let chosenRoleValue = tasksTable.roles[element.y - 1].name;
        roleName.selectedIndex = 0;
        for (let i = roleName.options.length - 1; i >= 0; i--) {
            if (roleName.options[i].value == chosenRoleValue) {
                roleName.selectedIndex = i;
            }
        }
    }

    taskDeleteButton.onclick = () => {
        tasksTable.roles[element.y - 1].tasks.splice(element.index, 1);
        resetToolbar();
        displayOnTable(tasksTable, assignementsTableElement);
    };
    roleDeleteButton.onclick = () => {
        tasksTable.roles.splice(element.y - 1, 1);
        resetToolbar();
        displayOnTable(tasksTable, assignementsTableElement);
    };

    taskAdditionButton.onclick = () => {
        tasksTable.roles[element.y - 1].tasks.push(new Task(element.startLimit, element.stopLimit));
        tasksTable.roles[element.y - 1].tasks.sort((a, b) => a.startTime - b.startTime);
        resetToolbar();
        displayOnTable(tasksTable, assignementsTableElement);
    };

    roleAdditionButton.onclick = () => {
        tasksTable.roles.push(new Role('Nothing', []));
        resetToolbar();
        displayOnTable(tasksTable, assignementsTableElement);
    };

    roleName.onchange = (e) => {
        tasksTable.roles[element.y - 1].name = e.target.value;
        displayOnTable(tasksTable, assignementsTableElement);
    };
    guardName.onchange = (e) => {
        tasksTable.roles[element.y - 1].tasks[element.index].assignee = e.target.value;
        displayOnTable(tasksTable, assignementsTableElement);
    };
    let timeSelectorChangeHandler = (e) => {
        let task = tasksTable.roles[element.y - 1].tasks[element.index];
        let newTaskTimes = limitedHoursRangeToFullTime(startTimeSelector.value, stopTimeSelector.value, element.startLimit, element.stopLimit);
        task.startTime = newTaskTimes[0];
        task.stopTime = newTaskTimes[1];
        displayOnTable(tasksTable, assignementsTableElement);
    };
    startTimeSelector.onchange = timeSelectorChangeHandler;
    stopTimeSelector.onchange = timeSelectorChangeHandler;
}


function resetToolbar() {
    updateToolbar({ x: 0, y: 0, type: 'empty' });
}