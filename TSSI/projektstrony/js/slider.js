const slideContainer = document.querySelector('.slide-container');
const slideImages = document.querySelectorAll('.slide');
const bullets = document.querySelectorAll('.slider_bullet');

const prevB = document.querySelector('#prevB');
const nextB = document.querySelector('#nextB');

const size = slideImages[0].clientWidth;

var counter = 1;
var ignoreInput = false;
var timer;
const delay = 5000;

for(var i = 0; i < bullets.length; i++) {
    bullets[i].dataset.value = i + 1;
    bullets[i].addEventListener('click', (event) => {
        slideTo(event);
    })
}

slideContainer.style.transform = "translateX(" + (-size * counter) + "px)";

document.addEventListener('keypress', (event) => {
    slide(event);
});

slideContainer.addEventListener('transitionend', () => {
    slideContainer.style.transition = "";
    
    if(slideImages[counter].id == 'slide-last') {
        slideContainer.style.transform = "translateX(" + (-size * (slideImages.length - 2)) + "px)";
        counter = slideImages.length - 2;
    } else if(slideImages[counter].id == 'slide-first') {
        slideContainer.style.transform = "translateX(" + (-size) + "px)";
        counter = 1
    }

    ignoreInput = false;

    timer = setInterval(() => {
        slide('next', true)
    }, delay);
});

prevB.addEventListener('click', () => {
    slide('prev');
});

nextB.addEventListener('click', () => {
    slide('next');
});

timer = setInterval(() => {
    slide('next', true)
}, delay);

function slide(param, force) {
    force = force || false;

    var dir = 0;

    if(param != null && (ignoreInput == false || force == true)) {
        console.log(typeof param);
        if(param == 'prev') {dir = 1;}
        else if(param == 'next') {dir = -1;}
        else if (typeof param == 'number') {dir = -param;}
        else {return;}
    }

    counter -= dir;
    slideContainer.style.transition = "transform 0.5s ease-in-out";
    slideContainer.style.transform = "translateX(" + (-size * counter) + "px)";

    ignoreInput = true;

    clearInterval(timer);

    bullets.forEach((bullet) => {
        bullet.classList.remove('fas');
        bullet.classList.add('far');
    });

    var bullet_to_change = -1;

    if(counter == 0) {bullet_to_change = slideImages.length - 3;}
    else if(counter == slideImages.length - 1) {bullet_to_change = 0;}
    else {bullet_to_change = counter - 1;}

    bullets[bullet_to_change].classList.remove('far');
    bullets[bullet_to_change].classList.add('fas');
}

function slideTo(event) {
    if(event != null && ignoreInput == false) {
        var target = event.target.dataset['value'];
        var dif = target - counter;

        if(target == counter) {
            return;
        } else {
            slide(dif);
        }
    }
}