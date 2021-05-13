function createOptionAdder(optionsObject, items_type) {
    let optionsAdder = document.createElement('div');
    optionsAdder.className = 'optionsAdder';
    let prompt = document.createElement('input');
    prompt.type = 'text';
    prompt.placeholder = 'insert ' + items_type + " here:";
    let additionButton = document.createElement('button');
    additionButton.className = 'addButton optionsDisplayButton';
    additionButton.innerText = 'Add Option';
    let onAddition = () => {
        let value = prompt.value;
        prompt.value = '';
        if (value.length > 0) {
            optionsObject.addOption(value);
        }
    };
    additionButton.onclick = onAddition;
    prompt.onkeypress = (e) => { if (e.which == 13) { onAddition() } };

    optionsAdder.appendChild(prompt);
    optionsAdder.appendChild(additionButton);
    return optionsAdder;
}