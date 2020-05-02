var target = document.getElementById('current-date');
var months = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"]


setInterval( () => {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();

    if(day <= 9) {
        day = "0" + day;
    }

    if(hour <= 9) {
        hour = "0" + hour;
    }

    if(minute <= 9) {
        minute = "0" + minute;
    }

    target.innerText = "Dzisiaj jest " + day + " " + months[month] + " " + year + ", " + hour + ":" + minute;
}, 100);