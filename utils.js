function deepCopy(obj) {
    if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

    if (obj instanceof Date)
        var temp = new Date(obj);
    else
        var temp = obj.constructor();

    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = deepCopy(obj[key]);
            delete obj['isActiveClone'];
        }
    }
    return temp;
}

function sum(a) {
    let sum = 0.0;
    a.forEach(item => { sum += item });
    return sum;
}

function mean(a) {
    return sum(a) / a.length;
}

function std(a) {
    let average = mean(a);
    return Math.sqrt(mean(a.map(item => (item - average) * (item - average))));
}

function limitedHoursRangeToFullTime(hour1, hour2, startTime, stopTime) {
    let hour1FirstOption = new Date(startTime.toDateString() + ' ' + hour1);
    let hour1SecondOption = new Date(stopTime.toDateString() + ' ' + hour1);
    let hour2FirstOption = new Date(startTime.toDateString() + ' ' + hour2);
    let hour2SecondOption = new Date(stopTime.toDateString() + ' ' + hour2);
    let options = [[hour1FirstOption, hour2FirstOption],
    [hour1SecondOption, hour2FirstOption],
    [hour1FirstOption, hour2SecondOption],
    [hour1SecondOption, hour2SecondOption]];
    for (let i = 0; i < options.length; i++) {
        let optionStart = options[i][0];
        let optionStop = options[i][1];
        if (optionStart <= optionStop && optionStart >= startTime && optionStop <= stopTime) {
            return options[i];
        }
    }
    return null;
}