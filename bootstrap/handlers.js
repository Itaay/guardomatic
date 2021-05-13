function updateOptions(options, elementName, defaultMessage) {
    guardOptionsElement = document.getElementById(elementName);
    guardOptionsElement.innerHTML = '';
    if (defaultMessage) {
        let optionElement = document.createElement('option');
        optionElement.selected = true;
        optionElement.disabled = 'disabled';
        optionElement.hidden = true;
        optionElement.text = defaultMessage;
        guardOptionsElement.appendChild(optionElement);
    }
    options.forEach(option => {
        let optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        guardOptionsElement.appendChild(optionElement);
    });
}

function optimizeAssignments() {
    let assignmentLoss = combineLosses([maxConcurrentGuardTimeLoss, guardTimeStdLoss], [1.0, 1.0]);
    tasksTable.optimize(guards.options, assignmentLoss, null, epochs = 100);
    displayOnTable(tasksTable, assignementsTableElement);
}