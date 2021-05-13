function interactiveOptionsDisplay(optionsObject) {
    let optionsDisplay = document.createElement('div');
    optionsDisplay.className = 'optionsDisplay';
    let displayOptions = () => {
        optionsDisplay.innerHTML = '';
        optionsObject.options.forEach(option => {
            let optionElement = document.createElement('div');
            let optionText = document.createElement('p');
            let optionDelete = document.createElement('button');
            optionDelete.onclick = ((opt) => (() => optionsObject.removeOption(opt)))(option);
            optionDelete.innerText = 'delete';
            optionDelete.classList.add('deleteButton');
            optionDelete.classList.add('displayedOptionItem');
            optionDelete.classList.add('optionsDisplayButton');
            optionText.innerText = option;
            optionText.className = 'displayedOptionItem'
            optionElement.appendChild(optionText);
            optionElement.appendChild(optionDelete);
            optionElement.className = 'displayedOption';
            optionsDisplay.appendChild(optionElement);
        });
    };
    optionsObject.addEventHandler(displayOptions);
    return optionsDisplay;
}