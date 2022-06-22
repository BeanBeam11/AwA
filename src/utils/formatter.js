export const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
};

export const formatTime = (time) => {
    let t = new Date(time),
        hour = '' + t.getHours(),
        minute = '' + t.getMinutes();

    if (hour < 10) hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;

    return [hour, minute].join(':');
};

export const formatStayTime = (hour, minute) => {
    if (minute < 10) minute = '0' + minute;

    return [hour, minute].join(':');
};
