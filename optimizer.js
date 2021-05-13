function createRandomSolution(roles, assignees, optimizationStart) {
    // roles is a list of role objects. role object contains:
    // name, startTime, stopTime

    // optimizationStart is the time from which the roles should be optimized
    // (to not change things that already happened)
    roles = roles.sort((roleA, roleB) => {
        if (roleA.startTime < roleB.startTime) {
            return -1;
        }
        else if (roleA.startTime > roleB.startTime) {
            return 1;
        }
        return 0;
    });
    let rolesToOptimize = roles;
    if (optimizationStart) {
        rolesToOptimize = roles.filter(role => role.startTime >= optimizationStart);
    }

    rolesToOptimize.forEach(role => {
        // find all tasks that their time overlaps currently checked task.
        let overlappingRoles = roles.filter(overlappingRole => !(overlappingRole === role || overlappingRole.stopTime <= role.startTime || overlappingRole.startTime >= role.stopTime));
        // find all assignees that are occupied, so can't be assigned now.
        let occupiedAssignees = overlappingRoles.map(overlappingRole => overlappingRole.assignee);
        // find all assignees that are not occupied, so are available now.
        let freeAssignees = assignees.filter(assignee => !occupiedAssignees.includes(assignee));

        let randomAssigneeIndex = Math.floor(Math.random() * freeAssignees.length);
        let chosenAssignee = freeAssignees[randomAssigneeIndex];

        role.assignee = chosenAssignee;
    });
    return roles;
}

function optimizeAssignment(roles, assignees, lossFunction, epochs, optimizationStart) {
    let bestSolution = null;
    let bestLoss = null; // trying to get to 0
    for (let i = 0; i < epochs; i++) {
        try {
            let solution = createRandomSolution(deepCopy(roles), assignees, optimizationStart);
            let solutionLoss = lossFunction(solution, assignees);
            if (bestLoss === null || solutionLoss < bestLoss) {
                bestSolution = solution;
                bestLoss = solutionLoss;
            }
        }
        catch (err) {
            console.log('failed attempt to solve');
            console.log(err);
        }
    }
    return bestSolution;
}