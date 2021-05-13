function setupMenu() {
    let selectedMenuItemClass = 'selectedMenuItem';
    let menuItems = { 'assignmentsButton': 'assignmentsInfo', 'guardsButton': 'guardsInfo', 'exemptionsButton': 'exemptionsInfo', 'postsButton': 'postsInfo' };
    let makeAllDissapear = () => { Object.values(menuItems).forEach(infoItem => { document.getElementById(infoItem).style.display = 'none' }) };
    let unselectAll = () => {
        for (let button in menuItems) {
            let buttonElement = document.getElementById(button);
            if (buttonElement.classList.contains(selectedMenuItemClass)) {
                buttonElement.classList.remove(selectedMenuItemClass);
            }
        };
    };
    for (let menuButton in menuItems) {
        let menuButtonElement = document.getElementById(menuButton);
        menuButtonElement.onclick = (button => (e => {
            makeAllDissapear();
            unselectAll();
            document.getElementById(menuItems[button]).style.display = 'block';
            document.getElementById(menuButton).classList.add(selectedMenuItemClass);
        }))(menuButton);
    }
}