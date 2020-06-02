const currentDate = document.getElementById("current-date");

months = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"]

var curDate = new Date();
var day = curDate.getDate();
var month = months[curDate.getMonth()];
var year = curDate.getFullYear();

currentDate.innerText = `${day} ${month} ${year}`;