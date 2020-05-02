var hide;
var reveal;
var timer;

var updateDelay = 50;

function MediaHideRevealGrab() {
    hide = document.getElementsByClassName('media-hide');
    reveal = document.getElementsByClassName('media-reveal');
}

function MediaHideRevealExecute() {
    var pageWidth = window.innerWidth;

    for(var i = 0; i < hide.length; i++) {
        var element = hide[i];
        var value = element.dataset['mediaHide'];

        if(pageWidth < value) {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    }

    for(var i = 0; i < reveal.length; i++) {
        var element = reveal[i];
        var value = element.dataset['mediaReveal'];

        if(pageWidth < value) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }
}

function MediaHideRevealAutoUpdate(boolean) {
    if(boolean == true) {
        timer = setInterval( () => {
            MediaHideRevealExecute();
        }, updateDelay);
    } else if(boolean == false) {
        if(timer != null) {
            clearInterval(timer);
        }
    }
}

MediaHideRevealGrab();
MediaHideRevealAutoUpdate(true);