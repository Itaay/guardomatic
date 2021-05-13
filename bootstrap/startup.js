setupMenu();

document.getElementById('toolbar').onclick = (e) => { if (e.target === e.currentTarget) { resetToolbar() } };


let guards = new OptionsList();
guards.addEventHandler(options => updateOptions(options, 'task-guardName', 'Select guard'));
let guardsInfo = document.getElementById('guardsInfo');
guardsInfo.appendChild(createOptionAdder(guards, 'guard name'));
guardsInfo.appendChild(interactiveOptionsDisplay(guards));
let roles = new OptionsList();
roles.addEventHandler(options => updateOptions(options, 'role-roleName', 'Select role type'));
let postsInfo = document.getElementById('postsInfo');
postsInfo.appendChild(createOptionAdder(roles, 'post name'));
postsInfo.appendChild(interactiveOptionsDisplay(roles));


let shiftStart = new Date();
shiftStart.setMinutes(0);
shiftStart.setSeconds(0);
shiftStart.setMilliseconds(0);
shiftStart.setHours(shiftStart.getHours()+1);

let shiftEnd = new Date(shiftStart.getTime() + (24 * 60 * 60 * 1000))
let tasksTable = new TasksTable(shiftStart, shiftEnd, 4, []);

let assignementsTableElement = document.getElementById('assignmentsTable');

document.getElementById('optimizeButton').onclick = optimizeAssignments;

displayOnTable(tasksTable, assignementsTableElement);
resetToolbar();