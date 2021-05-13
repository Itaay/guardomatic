let blankStringValue = 'Empty';
    
    class TasksTable {
        constructor(startTime, stopTime, interval, roles) {
            this.roles = roles;    // a list of roles, each role has a name and a list of tasks
            // each role represents a row
            this.startTime = startTime;
            this.stopTime = stopTime;
            this.interval = interval;   // number of hours an interval contains
            this.hourToMillisecondRatio = 3600000;
        }

        getTasksMatrix() {
            // currently handles only strings and list of strings for several rows.
            // in the future, each cell could be an object with a (cell-type) attribute to tell what kind of cell it is.
            // that way, an task cell will be able to have interactions different than the role type cell.
            let timeSegments = this.createIntervalTimes();
            let emptyCell = { type: 'empty', text: '' };
            let rows = []
            let firstRow = [Object.assign({}, emptyCell)];
            for (let i = 0; i < timeSegments.length - 1; i++) {
                let segmentStartTime = this.GetHourStringFromDate(timeSegments[i]);
                let segmentEndTime = this.GetHourStringFromDate(timeSegments[i + 1])
                firstRow.push({ type: 'time-segment', text: segmentStartTime + ' - ' + segmentEndTime, startLimit: timeSegments[i], stopLimit: timeSegments[i + 1] });
            }
            let colLength = firstRow.length;
            rows.push(firstRow);
            this.roles.forEach(role => {
                let row = new Array(colLength).fill(Object.assign(emptyCell, { type: 'empty-task' }));
                row[0] = { type: 'role', text: role.name };
                let columnIndex = 0;
                for (let i = 0; i < role.tasks.length; i++) {
                    let task = role.tasks[i];
                    while (task.startTime >= timeSegments[columnIndex + 1] && columnIndex < timeSegments.length - 1) {
                        columnIndex++;
                    }
                    let taskStartTime = this.GetHourStringFromDate(task.startTime);
                    let taskStopTime = this.GetHourStringFromDate(task.stopTime);
                    let person = task.assignee;
                    row[columnIndex + 1] = { type: 'task', text: [taskStartTime + ' - ' + taskStopTime, person], index: i, startTime: task.startTime, stopTime: task.stopTime };
                    columnIndex++;
                };
                rows.push(row);
            });

            // give every cell in the matrix info on it's location, so it could be traced by value.
            for (let y = 0; y < rows.length; y++) {
                for (let x = 0; x < rows[y].length; x++) {
                    rows[y][x] = Object.assign({ x: x, y: y, startLimit: rows[0][x].startLimit, stopLimit: rows[0][x].stopLimit }, rows[y][x]);
                }
            }
            return rows;
        }

        createIntervalTimes() {
            let totalTime = this.stopTime - this.startTime;
            let numberOfIntervals = Math.ceil((totalTime / this.interval) / this.hourToMillisecondRatio);
            let timeStamps = [];
            for (let i = 0; i < numberOfIntervals + 1; i++) {
                let timeFrame = new Date(this.startTime.getTime() + (this.interval * i * this.hourToMillisecondRatio));
                let clippedTime = new Date(Math.min(Math.max(timeFrame, this.startTime), this.stopTime));
                timeStamps.push(clippedTime);
            }
            return timeStamps;
        }

        GetHourStringFromDate(date) {
            // get the display string for a date's hour, in an hour:minute accuracy range
            let hours = String(date.getHours()).padStart(2, '0');
            let minutes = String(date.getMinutes()).padStart(2, '0');
            return hours + ':' + minutes;
        }


        saveToObj(obj) {
            let rolesObj = {};
            for (let i in this.roles) {
                let role = this.roles[i];
                rolesObj[role.name] = role.tasks.map(task => {
                    let taskObj = { 'start_time': task.startTime, 'end_time': task.stopTime };
                    if (task.assignee != blankStringValue && !task.assignee) {
                        taskObj['assignee'] = task.assignee;
                    }
                    return taskObj;

                });
            };
            obj.roles = rolesObj;
        }

        loadFromObj(obj) {
            let roles = obj.roles;
            this.roles = []
            for (let roleName in roles) {
                this.roles.push(new Role(roleName, roles[roleName].map(taskTime => new Task(new Date(taskTime['start_time']), new Date(taskTime['end_time']), taskTime.assignee))));
            }
        }

        optimize(assignees, lossFunction, optimizationStartTime = null, epochs = 1) {
            let rolesOrder = [];
            let flattenedRoles = [];
            this.roles.forEach(role => {
                rolesOrder.push(role.name)
                flattenedRoles = flattenedRoles.concat(role.tasks.map(task => Object.assign({ name: role.name }, task)));
            });
            let optimizedFlattenedRoles = optimizeAssignment(flattenedRoles, assignees, lossFunction, epochs, optimizationStartTime);
            if (optimizedFlattenedRoles !== null) {
                let roles = [];
                rolesOrder.forEach(roleName => {
                    roles.push(new Role(roleName, optimizedFlattenedRoles.filter(task => task.name == roleName).map(task => new Task(task.startTime, task.stopTime, task.assignee))));
                });
                this.roles = roles;
            }
            else {
                alert("Failed to optimize tasks. Arrangement is too hard, or might be impossible");
            }
        }
    }