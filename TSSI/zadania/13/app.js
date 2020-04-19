const searchBarTopInput = document.getElementById('search-bar-top-input');
const searchBarTopButton = document.getElementById('search-bar-top-button');

function searchBarTopCheckIfNotEmpty() {
    console.log(searchBarTopInput.value.length);

    if(searchBarTopInput.value.length > 0) {
        searchBarTopButton.classList.remove('off');
        searchBarTopButton.classList.add('on');
    } else {
        searchBarTopButton.classList.remove('on');
        searchBarTopButton.classList.add('off');
    }
}