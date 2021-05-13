let chairRole = new Role('chair', [new Task(new Date(2021, 3, 16, 12, 0, 0), new Date(2021, 3, 16, 14, 0, 0)), new Task(new Date(2021, 3, 16, 23, 0, 0), new Date(2021, 3, 16, 23, 30, 0))]);
tasksTable.roles.push(chairRole);
displayOnTable(tasksTable, assignementsTableElement);
roles.addOption('banana');
roles.addOption('pineapple');
guards.addOption('Itzik');
guards.addOption('Moshe');
guards.addOption('Itzik2');