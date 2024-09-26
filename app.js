document.addEventListener("DOMContentLoaded", () => {
    const PuzzleContainer = document.getElementById('puzzle')
    const puzzleSize = 3
    let cases = []

    function creationCasePuzzle() {
        for (let i = 1 ; i <= puzzleSize * puzzleSize ; i++) {
            
            const casePuzzle = document.createElement("div");
            casePuzzle.className = "casePuzzle"

            if (i == 9) {
                casePuzzle.classList.add("empty")
            }

            PuzzleContainer.appendChild(casePuzzle)
        }
    }

    creationCasePuzzle();
})