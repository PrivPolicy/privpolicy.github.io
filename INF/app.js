var sections = document.getElementsByClassName("section");

for(var i = 0; i < sections.length; i++) {
    sections[i].addEventListener("click", () => HideRevealContent(event));
    sections[i].lastElementChild.style.display = "none";
}

function HideRevealContent(event) {
    var display = event.currentTarget.lastElementChild.style.display;

    if(display == "none") {
        for(var i = 0; i < sections.length; i++) {
            sections[i].lastElementChild.style.display = "none";
        }

        event.currentTarget.lastElementChild.style.display = "block";
    } else if(display == "block") {
        event.currentTarget.lastElementChild.style.display = "none";
    }
}