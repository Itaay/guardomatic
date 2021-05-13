function guardTimeStdLoss(roles, assignees){
    let guardTimes = {};
    assignees.forEach(assignee => { guardTimes[assignee] = 0.0 });
    roles.forEach(role => {
        if (!(role.assignee in guardTimes)) {
            guardTimes[role.assignee] = 0.0;
        }
        guardTimes[role.assignee] += role.stopTime - role.startTime;
    });
    return std(Object.values(guardTimes));
}

function maxConcurrentGuardTimeLoss(roles, assignees){
    let maximumConcurrentTime = 0.0;
    assignees.forEach(assignee=>{
        let relevantTasks = roles.filter(task=>task.assignee == assignee).sort((taskA, taskB) => {
            if (taskA.startTime < taskB.startTime) {
                return -1;
            }
            else if (taskA.startTime > taskB.startTime) {
                return 1;
            }
            return 0;
        });
        let currentConcurrentTime = 0.0
        let lastTime = null;
        relevantTasks.forEach(task=>{
            let duration = (task.stopTime - task.startTime) / 3600000;
            let concurrent = false;
            if(lastTime !== null){
                if(lastTime >= task.startTime){
                    currentConcurrentTime += duration
                    concurrent = true
                }
            }
            if(!concurrent){
                currentConcurrentTime = duration;
            }
            lastTime = task.stopTime;

            if(currentConcurrentTime >= maximumConcurrentTime){
                maximumConcurrentTime = currentConcurrentTime;
            }
        });
    });
    return maximumConcurrentTime;
}


function combineLosses(lossesList, weights){
    weights = weights.map(weight=>weight/sum(weights));
    return (roles, assignees)=>{
        let loss = 0.0;
        for(let i = 0; i<lossesList.length; i++){
            let currentLoss = lossesList[i](roles, assignees);
            loss += weights[i] * Math.tanh(currentLoss);
        }
        return loss;
    }
}