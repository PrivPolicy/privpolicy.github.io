const username = document.getElementById('username');
const saveScoreButton = document.getElementById('saveScoreButton');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGHSCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreButton.disabled = !username.value;
});

window.scrollTo(0,0);

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score)
    highScores.splice(MAX_HIGHSCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("./highscores.html");
}